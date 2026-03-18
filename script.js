console.log("Iniciando monitor...")

class Monitor {
    atualizar(dados) {
        document.getElementById('cpu').innerText = dados.cpu
        document.getElementById('ram').innerText = dados.memoria
        document.getElementById('temp').innerText = dados.temperatura

        this.verificar('cpu-card', dados.cpu, 80)
        this.verificar('ram-card', dados.memoria, 12)
        this.verificar('temp-card', dados.temperatura, 75)
    }

    verificar(id, valor, limite) {
        const card = document.getElementById(id)

        if (!card) return

        if (valor > limite) {
            card.classList.add('alerta-critico')
        } else {
            card.classList.remove('alerta-critico')
        }
    }
}

const monitor = new Monitor()

async function buscarDados() {
    try {
        const resposta = await fetch('/api/status')
        const dados = await resposta.json()

        monitor.atualizar(dados)
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro)
    }
}

async function loop() {
    await buscarDados()
    setTimeout(loop, 2000)
}

loop()