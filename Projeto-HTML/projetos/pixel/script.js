const paleta = document.querySelector('#color-palette');
const board = document.querySelector('#pixel-board');
const clear = document.querySelector('#clear-board');
const pixelInput = document.querySelector('#board-size');
const butonInput = document.querySelector('#generate-board');

function aleatorio() {
  const n1 = Math.trunc(Math.random() * 255);
  const n2 = Math.trunc(Math.random() * 255);
  const n3 = Math.trunc(Math.random() * 255);
  const result = `rgb(${n1}, ${n2}, ${n3})`;
  return result;
}

console.log(Math.random());
const palhetaDeCores = [
  { cor: 'black' },
  { cor: aleatorio() },
  { cor: aleatorio() },
  { cor: aleatorio() },
];

function cDiv() {
  for (let i = 0; i < palhetaDeCores.length; i += 1) {
    const cores = document.createElement('div');
    if (palhetaDeCores[i].cor === 'black') {
      cores.className = 'color selected';
      cores.style.backgroundColor = palhetaDeCores[i].cor;
      paleta.appendChild(cores);
    } else {
      cores.className = 'color';
      cores.style.backgroundColor = palhetaDeCores[i].cor;
      paleta.appendChild(cores);
    }
  }
}
cDiv();

aleatorio();
paleta.addEventListener('click', (e) => {
  for (let i = 0; i < paleta.children.length; i += 1) {
    paleta.children[i].classList.remove('selected');
  }
  e.target.classList.add('selected');
});

function cBoard(numero) {
  for (let i = 1; i <= numero; i += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    board.appendChild(pixel);
  }
}
cBoard(25);

board.addEventListener('click', (e) => {
  const cores = document.querySelector('.selected');
  e.target.style.backgroundColor = cores.style.backgroundColor;
});

clear.addEventListener('click', () => {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
});

function criarPixels(valor) {
  board.style.width = `${40 * valor}px`;
  board.style.height = `${40 * valor}px`;
}

function remove() {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].remove('div');
  }
}

function tamanho() {
  let tutu = Number(pixelInput.value);
  if (Number(pixelInput.value) < 5) {
    tutu = Number((pixelInput.value = 5));
  }
  if (Number(pixelInput.value) > 50) {
    tutu = Number((pixelInput.value = 50));
  }
  return tutu;
}

pixelInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    if (pixelInput.value === '') {
      alert('Board inválido!');
    } else {
      const numero = tamanho();
      remove();
      cBoard(numero * numero);
      criarPixels(numero);
    }
  }
});

butonInput.addEventListener('click', (e) => {
  if (e.target) {
    if (pixelInput.value === '') {
      alert('Board inválido!');
    } else {
      const numero = tamanho();
      remove();
      cBoard(numero * numero);
      criarPixels(numero);
    }
  }
});
