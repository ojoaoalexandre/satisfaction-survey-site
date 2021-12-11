import { write } from "../../utils/googleSheets"
import moment from "moment"

const spreadsheetId = process.env.SHEET_SPREADSHEET_ID

const generateCoupon = () => {
    const coupon = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
    return coupon.substring(0, 4) + '-' + coupon.substring(4, 8) + '-' + coupon.substring(8, 12)
}

export default async (req, res) => {

    const { form, data } = JSON.parse(req.body)

    // define the required fields
    const requiredFields = ['name', 'email', 'product', 'attendance']

    // verify if exists fields required empty
    const fieldsRequiredEmpty = []
    requiredFields.map(field => {
        if (!Object.keys(form).includes(field) || form[field] == '') {
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
            Nome: form.name,
            Email: form.email,
            Atendimento: form.attendance,
            Produto: form.product,
            "Comentário": form.message,
            "Promoção": data.showMessage ? data.message : '',
            Data: moment().format('DD/MM/YYYY'),
            Cupom: generateCoupon()
        }

        const response = await write(spreadsheetId, "377099043", sheetHeader)

        res.send({
            subscribe: { ...response },
            fieldsRequiredEmpty
        })
    }
}