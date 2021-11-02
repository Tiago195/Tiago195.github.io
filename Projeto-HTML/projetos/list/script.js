const ol = document.getElementById('lista-tarefas');
const textInput = document.getElementById('texto-tarefa');
const botaoInput = document.getElementById('criar-tarefa');
const botaoApaga = document.getElementById('apaga-tudo');
const botaoComplet = document.getElementById('remover-finalizados');
const botaoSalvar = document.getElementById('salvar-tarefas');
const moverCima = document.getElementById('mover-cima');
const moverBaixo = document.getElementById('mover-baixo');
const removeSelect = document.getElementById('remover-selecionado');
const farofa = [];

window.onload = () => {
  if (localStorage.length !== 0) {
    const sal = JSON.parse(localStorage.getItem('key'));
    for (let i = 0; i < sal.length; i += 1) {
      const li = document.createElement('li');
      li.innerHTML = sal[i].Text;
      li.className = sal[i].classList;
      ol.appendChild(li);
    }
  }
};

function add() {
  const li = document.createElement('li');
  li.innerHTML = textInput.value;
  li.className = 'item-list';
  ol.appendChild(li);
  textInput.value = '';
}

botaoInput.addEventListener('click', () => {
  add();
});

textInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && textInput.value !== '') {
    add();
  }
});

ol.addEventListener('click', (e) => {
  if (e.target.className === 'item-list') {
    for (let i = 0; i < ol.children.length; i += 1) {
      ol.children[i].classList.remove('selected');
    }
    e.target.classList.add('selected');
  }
});

ol.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('completed')) {
    e.target.classList.remove('completed');
  } else {
    e.target.classList.add('completed');
  }
});

botaoApaga.addEventListener('click', () => {
  const numero = 0;
  while (numero < ol.children.length) {
    ol.children[0].remove();
  }
});

botaoComplet.addEventListener('click', () => {
  for (let i = 0; i < ol.children.length;) {
    if (ol.children[i].classList.contains('completed')) {
      ol.children[i].remove();
    } else {
      i += 1;
    }
  }
});

botaoSalvar.addEventListener('click', () => {
  for (let i = 0; i < ol.children.length; i += 1) {
    farofa.push({ Text: ol.children[i].innerHTML, classList: ol.children[i].className });
    // localStorage.setItem(ol.children[i].innerHTML, ol.children[i].className);
  }
  localStorage.setItem('key', JSON.stringify(farofa));
});

moverCima.addEventListener('click', () => {
  if (document.querySelector('.selected') !== null) {
    const atual = document.querySelector('.selected');
    if (atual.previousElementSibling !== null) {
      const anterior = atual.previousElementSibling;
      const paralelo = atual.innerHTML;
      const tutu = atual.className;
      atual.innerHTML = anterior.innerHTML;
      atual.className = anterior.className;
      anterior.innerHTML = paralelo;
      anterior.className = tutu;
    }
  }
});

moverBaixo.addEventListener('click', () => {
  if (document.querySelector('.selected') !== null) {
    const atual = document.querySelector('.selected');
    if (atual.nextElementSibling !== null) {
      const prox = atual.nextElementSibling;
      const paralelo = atual.innerHTML;
      const tutu = atual.className;
      atual.innerHTML = prox.innerHTML;
      atual.className = prox.className;
      prox.innerHTML = paralelo;
      prox.className = tutu;
    }
  }
});

removeSelect.addEventListener('click', () => {
  for (let i = 0; i < ol.children.length; i += 1) {
    if (ol.children[i].classList.contains('selected')) {
      ol.children[i].remove();
    }
  }
});
