const texto = document.getElementById('rgb-color');
const paiCores = document.getElementById('pai');
const escolha = document.getElementById('answer');
const reset = document.getElementById('reset-game');
const score = document.getElementById('score');

function qualCor() {
  const n1 = Math.floor(Math.random() * 255);
  const n2 = Math.floor(Math.random() * 255);
  const n3 = Math.floor(Math.random() * 255);
  return `rgb(${n1}, ${n2}, ${n3})`;
}
texto.innerText = qualCor();

function ball() {
  for (let i = 1; i <= 6; i += 1) {
    const div = document.createElement('div');
    div.className = 'ball';
    div.style.backgroundColor = qualCor();
    paiCores.appendChild(div);
  }
}

ball();

function sortear() {
  const sorte = Math.floor(Math.random() * 6 + 1);
  console.log(sorte);
  for (let i = 1; i < paiCores.children.length; i += 1) {
    if (i === sorte) {
      paiCores.children[i].style.backgroundColor = texto.innerText;
      console.log(i);
    }
  }
}

sortear();

let caunt = 0;

function suporte() {
  if (escolha.innerText === 'Acertou!') {
    alert('Vc já acertou, PQ AINDA TA CLICANDO?');
  } else if (escolha.innerText === 'Errou! Tente novamente!') {
    alert('Vc so tem uma chance safadinho');
  }
}

paiCores.addEventListener('click', (e) => {
  suporte();
  if (e.target.classList.contains('ball') && escolha.innerText === 'Escolha uma cor') {
    if (e.target.style.backgroundColor === texto.innerText) {
      escolha.innerText = 'Acertou!';
      caunt += 3;
      score.innerText = `Score: ${caunt}`;
    } else {
      escolha.innerText = 'Errou! Tente novamente!';
    }
  }
});

reset.addEventListener('click', () => {
  texto.innerText = qualCor();
  for (let i = 1; i < paiCores.children.length;) {
    paiCores.children[i].remove();
  }
  escolha.innerText = 'Escolha uma cor';
  ball();
  sortear();
});
