import { google } from 'googleapis'

const authenticate = async () => {
    // credentials to Auth
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    // create a client instace
    const client = await auth.getClient()

    // get a instance of google sheets
    const googleSheets = google.sheets({ version: "v4", auth: client })

    // return the instances
    return { auth, googleSheets }
}

export async function readSheet(spreadsheetId, sheetId, sheetRange) {
    const { auth, googleSheets } = await authenticate()
    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })

    const sheet = metadata.data.sheets.filter(sheet => sheet.properties.sheetId == sheetId)

    const readSheet = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${sheet[0].properties.title}!${sheetRange}`
    })
    return readSheet.data.values
}