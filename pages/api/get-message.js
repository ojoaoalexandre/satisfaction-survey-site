export default async(req, res) => {
    res.end(JSON.stringify({
        Hello: 'World'
    }))
}