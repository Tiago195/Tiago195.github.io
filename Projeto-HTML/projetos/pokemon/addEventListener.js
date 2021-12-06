const geracao = document.querySelector('.geracao')
const btn = document.querySelector('#btn')
const tipos = document.querySelector('.tipos')
const inputText = document.querySelector('#text')

geracao.addEventListener('click', (e) => {
  if (e.target.classList.contains('label-checkbox')) {
    for (let i of geracao.children) {
      if (i !== e.target)
        i.classList.remove('geracao-active')
    }
    e.target.classList.toggle('geracao-active')
  }
})

geracao.addEventListener('change', (e) => {
  for (let i of geracao.children) {
    if (i !== e.target) {
      i.checked = false
    }
  }
})

tipos.addEventListener('click', (e) => {
  if (e.target.classList.contains('tipo')) {
    for (let i of tipos.children) {
      if (i !== e.target)
        i.classList.remove('tipo-active')
    }
    e.target.classList.toggle('tipo-active')
  }
})

btn.addEventListener('mousedown', (e) => {
  localStorage.setItem('busca', JSON.stringify(procurar()))
  location.reload()
  e.target.style.backgroundColor = '#027b52'
  procurar()
})

btn.addEventListener('mouseup', (e) => {
  e.target.style.backgroundColor = '#009d68'
})

inputText.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    localStorage.setItem('busca', JSON.stringify(procurar()))
    location.reload()
    procurar()
  }
})
