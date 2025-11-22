import express from 'express'

const app = express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).send({
        message: "🐳 Hello Docker! 🚀",
        status: "success",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} do container`)
})