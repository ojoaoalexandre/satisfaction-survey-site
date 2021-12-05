import { google } from 'googleapis'

const authenticate = async () => {
    // Credentials to Auth
    const auth = new google.auth.GoogleAuth({
        // credentials: {
        //     client_email: process.env.SHEET_CLIENT_EMAIL,
        //     private_key: process.env.SHEET_PRIVATE_KEY
        // },
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    // create a client instace
    const client = await auth.getClient()

    // Get a instance of google sheets
    const googleSheets = google.sheets({ version: "v4", auth: client })

    return { auth, googleSheets }
}

const sheetById = async (id, spreadsheetId, googleSheets, auth) => {
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })

    const sheet = metaData.data.sheets.filter(sheet => sheet.properties.sheetId == id)
    return sheet[0]
}

export default async (req, res) => {

    const { auth, googleSheets } = await authenticate()
    const spreadsheetId = process.env.SHEET_SPREADSHEET_ID

    const sheet = await sheetById(0, spreadsheetId, googleSheets, auth)
    const readSheet = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${sheet.properties.title}!C4:C6`
    })

    const message = readSheet.data.values[0][0]
    const showMessage = readSheet.data.values[2][0]

    res.send({
        message,
        showMessage: showMessage == "TRUE" ? true : false
    })
}