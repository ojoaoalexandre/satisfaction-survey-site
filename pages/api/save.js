import moment from "moment"
import { write } from "../../utils/googleSheets"

const spreadsheetId = process.env.SHEET_SPREADSHEET_ID

export default async (req, res) => {
    const { name, email, message, note } = JSON.parse(req.body)
    if (!name || !email || !message || !note) {

        res.send({
            name,
            email,
            message,
            note
        })
    } else {
        const subscribe = {
            Nome: name,
            Email: email,
            Nota: note,
            "Comentário": message,
        }
        const response = await write(spreadsheetId, "377099043", subscribe)
        res.send({
            message: "ok"
        })
    }

}