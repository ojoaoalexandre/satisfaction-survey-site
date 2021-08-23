import { GoogleSpreadsheet } from "google-spreadsheet"
import moment from "moment"

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const fromBase64 = value => {
    const buffer = new Buffer.from(value, 'base64')
    return buffer.toString('ascii')
}

const generateCoupon = () => {
    const code = parseInt(moment().format('YYMMDDHHmmssSSS'))
                .toString(16)
                .toUpperCase()
    return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {

    try {
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
        })
        await doc.loadInfo()

        // Receive the data form
        const sheetForm = doc.sheetsById['204668653']
        const form = JSON.parse(req.body)

        // Receive the data sheet message
        const sheetMessage = doc.sheetsById['0']
        await sheetMessage.loadCells('A2:B2')

        const showMessage = sheetMessage.getCell(1, 0)
        const message = sheetMessage.getCell(1, 1)

        // Define Coupon
        let Cupom = ''
        let Promoção = ''

        if(showMessage.value === 'VERDADEIRO') {
            Cupom = generateCoupon()
            Promoção = message.value
        }

        await sheetForm.addRow({
            Nome: form.Nome,
            Email: form.Email,
            Whatsapp: form.Whatsapp,
            Cupom,
            Promoção,
            'Data de Cadastro': moment().format('DD/MM/YYYY HH:mm:ss'),
            Nota: parseInt(form.Nota)
        })

        res.end(JSON.stringify({
            showCoupon: Cupom !== '',
            Cupom,
            Promoção
        }))

    } catch (err) {
        res.end('error')
    }
}