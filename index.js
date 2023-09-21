const pesquisaEl = document.querySelector('#pesquisa')
const anteriorBtn = document.querySelector('#previus')
const proximaBtn = document.querySelector('#next')
const containerEl = document.querySelector('.container')

let currentPage = 1
let totalPages = 1

anteriorBtn.addEventListener('click', () => pages('anterior'))
proximaBtn.addEventListener('click', () => pages('proxima'))

async function fetchTasks(userId, page) {
    try {
        const response = await api.get(`/listTasks/${userId}/${page}`)
        const dados = response.data.tasks
        console.log(dados)

        containerEl.innerHTML = '';

        dados.forEach(mensagem => {
           
            const mensagemDiv = document.createElement('div')
            mensagemDiv.innerHTML = `
                <div>tarefas do usuario: ${mensagem.userId} são ${mensagem.description}</div>
            `;
            containerEl.appendChild(mensagemDiv) 
        });

    } catch (error) {
        console.error('Erro ao fazer a solicitação:', error)
    }
}

async function buscar() {
    const id = pesquisaEl.value;

    currentPage = 1
    await fetchTasks(id, currentPage)
}

async function pages(option) {
    option === 'proxima' ? currentPage++ : currentPage--

    if (currentPage < 1) {
        currentPage = 1
    }

    await fetchTasks(pesquisaEl.value, currentPage)
}
