const botao = document.getElementById('criar-carta');
const inputText = document.getElementById('carta-texto');
const cartaGerada = document.getElementById('carta-gerada');
const cartaContador = document.getElementById('carta-contador');
const grupo1 = ['newspaper', 'magazine1', 'magazine2'];
const grupo2 = ['medium', 'big', 'reallybig'];
const grupo3 = ['rotateleft', 'rotateright'];
const grupo4 = ['skewleft', 'skewright'];

function verificarDigito() {
  let tutu = true;
  if (inputText.value === '' || inputText.value.trim() === '') {
    cartaGerada.innerHTML = 'Por favor, digite o conteúdo da carta.';
    tutu = false;
    inputText.value = '';
  }
  return tutu;
}

function aleatorio(tamanho) {
  return Math.floor(Math.random() * tamanho);
}

botao.addEventListener('click', () => {
  if (verificarDigito()) {
    cartaGerada.innerText = '';
    const span = document.createElement('span');
    span.innerText = inputText.value;
    const tutu = span.innerText.split(' ');
    cartaContador.innerText = tutu.length;
    for (let i = 0; i < tutu.length; i += 1) {
      const spn = document.createElement('span');
      spn.innerText = tutu[i];
      spn.classList.add(grupo1[aleatorio(grupo1.length)]);
      spn.classList.add(grupo2[aleatorio(grupo2.length)]);
      spn.classList.add(grupo3[aleatorio(grupo3.length)]);
      spn.classList.add(grupo4[aleatorio(grupo4.length)]);
      cartaGerada.appendChild(spn);
    }
  }
});
