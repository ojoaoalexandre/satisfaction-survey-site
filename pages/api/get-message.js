import { GoogleSpreadsheet } from "google-spreadsheet"
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet('1VBSCBiaryRYSIFHBrPOKoCHQyvtOU2V0IMedVjgl9ow')

export default async(req, res) => {

    try{
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()

        const sheetMessage = doc.sheetsById['0']
        await sheetMessage.loadCells('A2:B2')

        const showMessage = sheetMessage.getCell(1, 0)
        const message = sheetMessage.getCell(1, 1)
        
        res.end(JSON.stringify({
            showMessage: showMessage.value === 'VERDADEIRO',
            message: message.value
        }))
    } catch (err) {
        res.end(JSON.stringify({
            showMessage: false,
            message: ''
        }))
    }

}