const express = require('express')
const app = express()
const PORT = 3000

// Servir arquivos da pasta public
app.use(express.static('public'))

class HardwareEngine {
    gerarDados() {
        return {
            cpu: Math.floor(Math.random() * 101),
            memoria: Number((Math.random() * 16).toFixed(2)),
            temperatura: Math.floor(Math.random() * (90 - 30 + 1)) + 30
        }
    }
}

const hardware = new HardwareEngine()

app.get('/api/status', (req, res) => {
    const dados = hardware.gerarDados()
    res.json(dados)
})

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`)
})