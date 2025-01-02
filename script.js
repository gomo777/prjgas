// Seleção de elementos
const descricaoInput = document.getElementById('descricao');
const quantidadeInput = document.getElementById('quantidade');
const statusInput = document.getElementById('status');
const valorCompraInput = document.getElementById('valorCompra');
const porcentagemLucroInput = document.getElementById('porcentagemLucro');
const adicionarButton = document.getElementById('adicionar');
const cancelarEdicaoButton = document.getElementById('cancelarEdicao');
const tabelaBotijoes = document.getElementById('tabela-botijoes');
const totalSemLucro = document.getElementById('total-sem-lucro');
const totalGeral = document.getElementById('total-geral');
const lucroLiquido = document.getElementById('lucro-liquido');

// Lista para armazenar os botijões
let botijoes = JSON.parse(localStorage.getItem('botijoes')) || [];
let contadorCodigo = parseInt(localStorage.getItem('contadorCodigo')) || 1;
let indiceEdicao = null; // Armazena o índice do produto sendo editado

// Função para renderizar a tabela
function renderizarTabela() {
  tabelaBotijoes.innerHTML = '';
  let totalSemLucroValor = 0;
  let totalEstoque = 0;
  let lucroTotal = 0;

  botijoes.forEach((botijao, index) => {
    const precoVenda = botijao.valorCompra * (1 + botijao.porcentagemLucro / 100);
    const totalVenda = precoVenda * botijao.quantidade;
    const totalSemLucroProduto = botijao.valorCompra * botijao.quantidade;
    const lucroProduto = totalVenda - totalSemLucroProduto;

    totalSemLucroValor += totalSemLucroProduto;
    totalEstoque += totalVenda;
    lucroTotal += lucroProduto;

    const row = `
      <tr>
        <td>${botijao.codigo}</td>
        <td>${botijao.descricao}</td>
        <td>${botijao.quantidade}</td>
        <td>${botijao.status}</td>
        <td>R$ ${botijao.valorCompra.toFixed(2)}</td>
        <td>${botijao.porcentagemLucro}%</td>
        <td>R$ ${precoVenda.toFixed(2)}</td>
        <td>R$ ${totalSemLucroProduto.toFixed(2)}</td>
        <td>R$ ${totalVenda.toFixed(2)}</td>
        <td>
          <button onclick="editarBotijao(${index})">Editar</button>
          <button onclick="excluirBotijao(${index})">Excluir</button>
        </td>
      </tr>
    `;
    tabelaBotijoes.innerHTML += row;
  });

  // Atualiza os totais gerais
  totalSemLucro.textContent = `Total Sem Lucro: R$ ${totalSemLucroValor.toFixed(2)}`;
  totalGeral.textContent = `Total com Lucro: R$ ${totalEstoque.toFixed(2)}`;
  lucroLiquido.textContent = `Lucro Líquido: R$ ${lucroTotal.toFixed(2)}`;

  localStorage.setItem('botijoes', JSON.stringify(botijoes));
}

// Função para adicionar ou salvar edição
function adicionarBotijao() {
  const descricao = descricaoInput.value.trim();
  const quantidade = parseInt(quantidadeInput.value);
  const status = statusInput.value;
  const valorCompra = parseFloat(valorCompraInput.value);
  const porcentagemLucro = parseFloat(porcentagemLucroInput.value);

  if (descricao && quantidade > 0 && valorCompra > 0 && porcentagemLucro >= 0) {
    if (indiceEdicao === null) {
      const codigo = `P-${contadorCodigo++}`;
      botijoes.push({ codigo, descricao, quantidade, status, valorCompra, porcentagemLucro });
      localStorage.setItem('contadorCodigo', contadorCodigo);
    } else {
      botijoes[indiceEdicao] = { ...botijoes[indiceEdicao], descricao, quantidade, status, valorCompra, porcentagemLucro };
      indiceEdicao = null;
      adicionarButton.textContent = 'Adicionar';
      cancelarEdicaoButton.style.display = 'none';
    }

    limparFormulario();
    renderizarTabela();
  } else {
    alert('Preencha todos os campos corretamente!');
  }
}

// Função para editar um botijão
function editarBotijao(index) {
  const botijao = botijoes[index];
  descricaoInput.value = botijao.descricao;
  quantidadeInput.value = botijao.quantidade;
  statusInput.value = botijao.status;
  valorCompraInput.value = botijao.valorCompra;
  porcentagemLucroInput.value = botijao.porcentagemLucro;

  indiceEdicao = index;
  adicionarButton.textContent = 'Salvar';
  cancelarEdicaoButton.style.display = 'inline-block';
}

// Função para excluir um botijão
function excluirBotijao(index) {
  botijoes.splice(index, 1);
  renderizarTabela();
}

// Função para limpar o formulário
function limparFormulario() {
  descricaoInput.value = '';
  quantidadeInput.value = '';
  valorCompraInput.value = '';
  porcentagemLucroInput.value = '';
  statusInput.value = 'Cheio';
}

// Eventos
adicionarButton.addEventListener('click', adicionarBotijao);
cancelarEdicaoButton.addEventListener('click', limparFormulario);
document.addEventListener('DOMContentLoaded', renderizarTabela);

//---------------------------



let historico = JSON.parse(localStorage.getItem('historico')) || [];

// Adicionar histórico detalhado
function adicionarHistorico(acao, produto, detalhes) {
  const data = new Date().toLocaleString();
  historico.push({ data, acao, produto, detalhes });
  localStorage.setItem('historico', JSON.stringify(historico));
}

// Função para adicionar ou salvar edição
function adicionarBotijao() {
  const descricao = descricaoInput.value.trim();
  const quantidade = parseInt(quantidadeInput.value);
  const status = statusInput.value;
  const valorCompra = parseFloat(valorCompraInput.value);
  const porcentagemLucro = parseFloat(porcentagemLucroInput.value);

  if (descricao && quantidade > 0 && valorCompra > 0 && porcentagemLucro >= 0) {
    if (indiceEdicao === null) {
      const codigo = `P-${contadorCodigo++}`;
      botijoes.push({ codigo, descricao, quantidade, status, valorCompra, porcentagemLucro });
      adicionarHistorico(
        'Adicionado',
        descricao,
        `Código: ${codigo}, Quantidade: ${quantidade}, Status: ${status}, Compra: R$ ${valorCompra}, Lucro: ${porcentagemLucro}%`
      );
      localStorage.setItem('contadorCodigo', contadorCodigo);
    } else {
      const botijaoAntigo = botijoes[indiceEdicao];
      botijoes[indiceEdicao] = { ...botijaoAntigo, descricao, quantidade, status, valorCompra, porcentagemLucro };

      // Histórico detalhado de mudanças
      adicionarHistorico(
        'Editado',
        descricao,
        `Alterações:
        Código: ${botijaoAntigo.codigo}
        De (Quantidade: ${botijaoAntigo.quantidade}, Status: ${botijaoAntigo.status}, Compra: R$ ${botijaoAntigo.valorCompra}, Lucro: ${botijaoAntigo.porcentagemLucro}%)
        Para (Quantidade: ${quantidade}, Status: ${status}, Compra: R$ ${valorCompra}, Lucro: ${porcentagemLucro}%)`
      );

      indiceEdicao = null;
      adicionarButton.textContent = 'Adicionar';
      cancelarEdicaoButton.style.display = 'none';
    }

    limparFormulario();
    renderizarTabela();
  } else {
    alert('Preencha todos os campos corretamente!');
  }
}

// Função para excluir botijão
function excluirBotijao(index) {
  const botijao = botijoes[index];
  adicionarHistorico(
    'Excluído',
    botijao.descricao,
    `Código: ${botijao.codigo}, Quantidade: ${botijao.quantidade}, Status: ${botijao.status}, Compra: R$ ${botijao.valorCompra}, Lucro: ${botijao.porcentagemLucro}%`
  );
  botijoes.splice(index, 1);
  renderizarTabela();
}

//-------------------------




