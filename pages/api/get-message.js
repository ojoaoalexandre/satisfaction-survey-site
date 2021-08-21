export default async(req, res) => {
    res.end(JSON.stringify({
        showMessage: true,
        message: 'Essa é a mensagem'
    }))
}