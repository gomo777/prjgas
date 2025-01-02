// Carregar o histórico do localStorage
const historico = JSON.parse(localStorage.getItem('historico')) || [];
const tabelaHistorico = document.getElementById('tabela-historico');

historico.forEach(item => {
  const row = `
    <tr>
      <td>${item.data}</td>
      <td>${item.acao}</td>
      <td>${item.produto}</td>
      <td>${item.detalhes}</td>
    </tr>
  `;
  tabelaHistorico.innerHTML += row;
});
