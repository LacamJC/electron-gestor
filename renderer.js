const carregarGastos = () => {
    const gastos = window.gastosAPI.obter();
    const corpo = document.querySelector('#tabelaGastos tbody');
    corpo.innerHTML = '';
    let total = 0;


    gastos.forEach((gasto, i) => {
        total += gasto.valor;

        const linha = `
            <tr>
                <td>${gasto.descricao}</td>
                <td>R$:${gasto.valor.toFixed(2)}</td>
                <td>${gasto.data}</td>
                <td><button onclick="removerGasto(${i})">Excluir</button></td>
            </tr>
        `;

        corpo.innerHTML += linha;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

const adicionarGasto = () => {

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;
    console.log('ele acessa')
    if (!descricao || isNaN(valor) || !data) return alert('Preencha todos os campos');

    console.log('ele verifica os campos')

    const gastos = window.gastosAPI.obter();
    gastos.push({ descricao, valor, data });
    window.gastosAPI.salvarGastos(gastos);
    carregarGastos();
    console.log('gastos salvos')
}

function removerGasto(indice) {
    const gastos = window.gastosAPI.obter();
    gastos.splice(indice, 1);
    window.gastosAPI.salvar(gastos);
    carregarGastos();
}

window.onload = carregarGastos;