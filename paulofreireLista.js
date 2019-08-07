const botao = document.querySelector('button');
const input = document.querySelector('input');


/* dontpad.com/paulofreirejs */

function getLista () {
    if (localStorage.getItem('lista') !== null) {
        return JSON.parse(localStorage.getItem('lista'));
    } else {
        return [];
    }
}

input.addEventListener('keypress', (evt) => {
  if (evt.charCode === 13) {
    adicionaItem();
    limpaInput();
  }
});

botao.addEventListener('click', () => {
  adicionaItem();
  limpaInput();
});

function adicionaItem() {
  const tarefa = {
    descricao: document.querySelector('input').value,
    riscado: false
  }

  if (tarefa.descricao.trim() !== '') {
    criarTarefaHTML(tarefa);
    const listaLocalStorage = getLista();
    listaLocalStorage.push(tarefa);
    localStorage.setItem('lista', JSON.stringify(listaLocalStorage));
  }
}

function criarTarefaHTML(tarefa) {
  const lista = document.querySelector('ul');
  const novoItem = document.createElement('li');
  novoItem.innerText = tarefa.descricao;
  if (tarefa.riscado) {
      novoItem.classList.add('riscado');
  }
  lista.appendChild(novoItem);

  novoItem.addEventListener('click', () => {
    novoItem.classList.toggle('riscado');
    const listaAtual = getLista();
    posicaoNaLista = listaAtual.findIndex(item => item.descricao === tarefa.descricao);

    listaAtual[posicaoNaLista].riscado = !listaAtual[posicaoNaLista].riscado;

    localStorage.setItem('lista', JSON.stringify(listaAtual));
  });
}

function limpaInput() {
  document.querySelector('input').value = '';
}

window.addEventListener('load', () => {
  const tarefasAtuais = getLista();
  tarefasAtuais.forEach((tarefa) => criarTarefaHTML(tarefa));
});
