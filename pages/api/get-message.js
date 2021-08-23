import { GoogleSpreadsheet } from "google-spreadsheet"

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export default async(req, res) => {
    try{
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: process.env.SHEET_PRIVATE_KEY
        })
        await doc.loadInfo()

        const sheetMessage = doc.sheetsById['0']
        await sheetMessage.loadCells('A2:B2')

        const showMessage = sheetMessage.getCell(1, 0)
        const message = sheetMessage.getCell(1, 1)
        
        res.end(JSON.stringify({
            showMessage: showMessage.value === 'VERDADEIRO',
            message: message.value
        }))
    } catch (err) {
        res.end(JSON.stringify({
            showMessage: false,
            message: ''
        }))
    }

}