import { GoogleSpreadsheet } from "google-spreadsheet"
import credentials from '../../credentials.json'

const doc = new GoogleSpreadsheet('1VBSCBiaryRYSIFHBrPOKoCHQyvtOU2V0IMedVjgl9ow')

export default async(req, res) => {

    try{
        await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()

        const sheet = doc.sheetsById['0']
        await sheet.loadCells('A2:B2')

        const showMessageSheet = sheet.getCell(1, 0)
        const messageSheet = sheet.getCell(1, 1)
        
        res.end(JSON.stringify({
            showMessage: showMessageSheet.value === 'VERDADEIRO',
            message: messageSheet.value
        }))
    } catch (err) {
        res.end(JSON.stringify({
            showMessage: false,
            message: ''
        }))
    }

}