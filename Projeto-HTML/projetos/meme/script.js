const inputText = document.getElementById('text-input');
const tutu = document.getElementById('meme-image-container');
const texto = document.getElementById('meme-text');
const memeInsert = document.getElementById('meme-insert');
const memeImg = document.getElementById('meme-image');
const fireBtn = document.getElementById('fire');
const waterBtn = document.getElementById('water');
const earthBtn = document.getElementById('earth');
const telas = document.getElementById('telinhas');

tutu.style.border = '1px solid black';

inputText.addEventListener('keyup', () => {
  inputText.value = inputText.value.substring(0, 60);
  texto.innerHTML = inputText.value;
});

memeInsert.addEventListener('change', (e) => {
  memeImg.src = URL.createObjectURL(e.target.files[0]);
});

fireBtn.addEventListener('click', () => {
  tutu.style.border = '3px dashed red';
});

waterBtn.addEventListener('click', () => {
  tutu.style.border = '5px double blue';
});

earthBtn.addEventListener('click', () => {
  tutu.style.border = '6px groove green';
});

telas.addEventListener('click', (e) => {
  memeImg.setAttribute('src', e.target.src);
});
