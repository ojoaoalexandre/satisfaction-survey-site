import { GoogleSpreadsheet } from "google-spreadsheet"
import moment from "moment"
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet('1VBSCBiaryRYSIFHBrPOKoCHQyvtOU2V0IMedVjgl9ow')

export default async (req, res) => {
    //res.end(req.body)
    try {
        await doc.useServiceAccountAuth(credentials)
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
            Cupom = 'Novo Cupom'
            Promoção = message.value
        }

        await sheetForm.addRow({
            Nome: form.Nome,
            Email: form.Email,
            Whatsapp: form.Whatsapp,
            Cupom,
            Promoção,
            'Data de Cadastro': moment().format('DD/MM/YYYY HH:mm:ss'),
            Nota: '10'
        })
        res.end(req.body)
    } catch (err) {
        res.end('error')
    }
}