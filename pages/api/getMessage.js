import { read } from '../../utils/googleSheets'

const spreadsheetId = process.env.SHEET_SPREADSHEET_ID

export default async (req, res) => {
    const {
        B5: message,
        B8: showMessage
    } = await read(spreadsheetId, "0", "B4:B8", ['B5', 'B8'])

    res.send({
        message,
        showMessage
    })
}