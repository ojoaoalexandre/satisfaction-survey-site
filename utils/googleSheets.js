import { GoogleSpreadsheet } from 'google-spreadsheet'

const authenticate = async (spreadsheetId, sheetId) => {
    const doc = new GoogleSpreadsheet(spreadsheetId)

    await doc.useServiceAccountAuth({
        client_email: process.env.SHEET_CLIENT_EMAIL,
        private_key: process.env.SHEET_PRIVATE_KEY
    })

    await doc.loadInfo()

    // load sheet by id
    const sheet = doc.sheetsById[sheetId]

    return sheet
}

export async function read(spreadsheetId, sheetId, range, [...args]) {
    try {

        const data = {}
        const cells = [...args]

        // load sheet
        const sheet = await authenticate(spreadsheetId, sheetId)

        // load range in sheet
        await sheet.loadCells(range)

        cells.map(cell => {
            data[cell] = sheet.getCellByA1(cell).value
        })

        return {
            ...data
        }
    } catch (error) {
        return {
            message: error
        }
    }
}

export async function write(spreadsheetId, sheetId, args) {
    try {
        // load sheet
        const sheet = await authenticate(spreadsheetId, sheetId)

        const add = await sheet.addRow({ ...args })
        return {
            ...args
        }
    } catch (error) {
        return {
            message: error
        }
    }
}