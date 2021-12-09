
import { readSheet } from '../../utils/googleSheet'

export default async (req, res) => {
    const spreadsheetId = process.env.SHEET_SPREADSHEET_ID
    const data = await readSheet(spreadsheetId, 0, "C4:C6")

    const message = data[0]
    const showMessage = data[2]

    res.send({
        message,
        showMessage: showMessage == "TRUE" ? true : false
    })
}