import { read } from '../../utils/googleSheets'

const spreadsheetId = process.env.SHEET_SPREADSHEET_ID

export default async (req, res) => {
    const { C4: message, C6: showMessage } = await read(spreadsheetId, "0", "C4:C6", ['C4', 'C6'])

    res.send({
        message,
        showMessage
    })
}