import moment from "moment"

export default async (req, res) => {
    try {
        const { name, email, message, note } = JSON.parse(req.body)
        console.log(name, email, message, note)
    } catch (error) {
        res.end({
            error
        })
    }
}