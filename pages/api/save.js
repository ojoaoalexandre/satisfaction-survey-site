import { write } from "../../utils/googleSheets"
import moment from "moment"

const spreadsheetId = process.env.SHEET_SPREADSHEET_ID

export default async (req, res) => {

    const data = JSON.parse(req.body)

    // define the required fields
    const requiredFields = ['name', 'email', 'note']

    // verify if exists fields required empty
    const fieldsRequiredEmpty = []
    requiredFields.map(field => {
        if (!Object.keys(data).includes(field) || data[field] == '') {
            fieldsRequiredEmpty.push(field)
        }
    })

    if (fieldsRequiredEmpty != '') {
        res.send({
            fieldsRequiredEmpty
        })
    } else {

        // translate the fields forms to header in google sheet
        const sheetHeader = {
            Nome: data.name,
            Email: data.email,
            Nota: data.note,
            "Comentário": data.message
        }

        const response = await write(spreadsheetId, "377099043", sheetHeader)

        res.send({
            subscribe: { ...response },
            fieldsRequiredEmpty
        })
    }
}