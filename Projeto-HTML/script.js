const label = document.querySelector('.control');

document.querySelector('.list').addEventListener('click', () => {
  window.open('./projetos/list');
});

document.querySelector('.pixel').addEventListener('click', () => {
  window.open('./projetos/pixel');
});

document.querySelector('.memes').addEventListener('click', () => {
  window.open('./projetos/meme');
});

document.querySelector('.color').addEventListener('click', () => {
  window.open('./projetos/color');
});

document.querySelector('.carta').addEventListener('click', () => {
  window.open('./projetos/carta');
});

document.querySelector('.pokemon').addEventListener('click', () => {
  window.open('./projetos/pokemon')
})

label.addEventListener('click', (e) => {
  if (e.target.tagName === 'LABEL') {
    for (let i of label.children) {
      i.style.backgroundColor = ''
    }
    e.target.style.backgroundColor = '#edeef0'
  }
});
