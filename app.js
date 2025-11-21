import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.status(200).send({message: "Hello Docker!"})
})

app.listen(3000, () => {
    console.log("Servidor no ar!")
})