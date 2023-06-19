const form = document.querySelector('#automoveisForms')
const marcaInput = document.querySelector('#marcaInput')
const modeloInput = document.querySelector('#modeloInput')
const ano_fabricacaoInput = document.querySelector('#ano_fabricacaoInput')
const precoInput = document.querySelector('#precoInput')
const tableBody = document.querySelector('#automoveisTabela tbody')

const URL = "http://localhost:8080/automoveis.php"

function carregarAutomoveis() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
        mode: "cors"
    })

        .then(response => response.json())
        .then(automoveis => {
            tableBody.innerHTML = ''

            automoveis.forEach(automovel => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
        
        <td>${automovel.id}</td>
        <td>${automovel.marca}</td>
        <td>${automovel.modelo}</td>
        <td>${automovel.ano_fabricacao}</td>
        <td>${automovel.preco}</td>
        <td>
        <button data-id="${automovel.id}" onclick="atualizarAutomovel(${automovel.id})">Editar</button>
        <button onclick="excluirAutomovel(${automovel.id})">Excluir</button>
        </td>
        `
                tableBody.appendChild(tr)

            })
        })
}

function adicionarAutomoveis(event) {
    event.preventDefault()

    const marca = marcaInput.value
    const modelo = modeloInput.value
    const ano_fabricacao = ano_fabricacaoInput.value
    const preco = precoInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

        },
        body: `marca=${encodeURIComponent(marca)}&modelo=${encodeURIComponent(modelo)}&ano_fabricacao=${encodeURIComponent(ano_fabricacao)}&preco=${encodeURIComponent(preco)}`
    })

        .then(response => {
            if (response.ok) {
                carregarAutomoveis()
                marcaInput.value = ''
                modeloInput.value = ''
                ano_fabricacaoInput.value = ''
                precoInput.value = ''
            } else {
                console.error('erro ao add automovel')
                alert('error ao add ')
            }

        })
}
//excluir os registros das tabelas 

function excluirAutomovel(id) {
    if (confirm('Deseja excluir esse automovel?')) {
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })

            .then(response => {
                if (response.ok) {
                    carregarAutomoveis()
                } else {
                    console.error('Erro ao excluir')
                    alert('Error ao excluir ')
                }
            })
    }
}



function atualizarAutomovel(id){

    const novoMarca = prompt('Digite a marca')
    const novoModelo = prompt('Digite o modelo')
    const novoAno_fabricacao = prompt('Digite o ano de fabricação')
    const novoPreco = prompt('Digite o preço')

    if (novoMarca && novoModelo && novoAno_fabricacao && novoPreco) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'

            },
            body: `marca=${encodeURIComponent(novoMarca)}&modelo=${encodeURIComponent(novoModelo)}&ano_fabricacao=${encodeURIComponent(novoAno_fabricacao)}&preco=${encodeURIComponent(novoPreco)}`
        })
            .then(response => {
                if (response.ok){
                    carregarAutomoveis()
                }else{
                    console.error('Erro ao editar')
                    alert('Error ao editar')
                }
            })


    }

}

form.addEventListener('submit', adicionarAutomoveis)
carregarAutomoveis()