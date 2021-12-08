const pokemons = document.querySelector('.todos-pokemons')
const inputMnenu = document.querySelector('.input-container')

async function todosPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`
  return await (await fetch(url)).json()
}

function criaElemento(tag, tipoDeValue, value, className) {
  const criando = document.createElement(tag)
  criando[tipoDeValue] = value
  if (className) criando.className = className
  return criando
}

function qualId(parametro, div) {
  if (parametro.id < 10) {
    const id = criaElemento('span', 'innerText', `#00${parametro.id}`, 'id-pokemon')
    div.appendChild(id)
  } else if (parametro.id < 100) {
    const id = criaElemento('span', 'innerText', `#0${parametro.id}`, 'id-pokemon')
    div.appendChild(id)
  } else {
    const id = criaElemento('span', 'innerText', `#${parametro.id}`, 'id-pokemon')
    div.appendChild(id)
  }
}

function tipagem(parametro, paiDetodasDivs, tipo1, teste) {
  if (parametro.types.length === 1) {
    const imgFilho = criaElemento('img', 'src', icons[parametro.types[0].type.name])
    paiDetodasDivs.style.backgroundColor = colors[parametro.types[0].type.name]
    tipo1.classList.add(classPokemons[parametro.types[0].type.name])
    tipo1.appendChild(imgFilho)
  } else {
    const tipo2 = document.createElement('div')
    tipo2.className = 'icon'
    const imgFilho = criaElemento('img', 'src', icons[parametro.types[0].type.name])
    const imgFilho1 = criaElemento('img', 'src', icons[parametro.types[1].type.name])
    paiDetodasDivs.style.background = `linear-gradient(${colors[parametro.types[0].type.name]} 30%, ${colors[parametro.types[1].type.name]} 80%)`
    tipo1.classList.add(classPokemons[parametro.types[0].type.name])
    tipo2.classList.add(classPokemons[parametro.types[1].type.name])
    tipo1.appendChild(imgFilho)
    tipo2.appendChild(imgFilho1)
    teste.appendChild(tipo2)
  }
}

function appendTipagem(tag, parametroFunc, className) {
  const criando = document.createElement(tag)
  criando.className = className
  parametroFunc.forEach(e => criando.appendChild(e))
  return criando
}

function append(parametro) {
  const paiDetodasDivs = document.createElement('paiDetodasDivs')
  const namePokemon = criaElemento('span', 'innerText', parametro.name, 'name-pokemon')
  const img = criaElemento('img', 'src', parametro.sprites.front_default)
  const tipo1 = document.createElement('div')
  tipo1.className = 'icon'
  paiDetodasDivs.className = 'pokemon'
  qualId(parametro, paiDetodasDivs)
  paiDetodasDivs.appendChild(img)
  paiDetodasDivs.appendChild(namePokemon)
  const paiTipagem = appendTipagem('div', [tipo1], 'paiTipagem')
  tipagem(parametro, paiDetodasDivs, tipo1, paiTipagem)
  paiDetodasDivs.appendChild(paiTipagem)
  pokemons.appendChild(paiDetodasDivs)
}

async function teste({ nome, tipo, geracao }) {
  const data = (await todosPokemon()).results
  const arGeracao = geracao.split('-')
  const arTipo = tipo.split('-')

  if (nome && tipo && geracao) {
    const urls = data.filter(f => f.name.includes(nome.toLowerCase()))
    filtros.geracaoTipo(urls, arGeracao, arTipo[0])
  } else if (nome) {
    if (geracao || tipo) {
      const urls = data.filter(f => f.name.includes(nome.toLowerCase()))
      geracao ? filtros.geracao(urls, arGeracao)
        : filtros.tipo(urls, arTipo[0])
    } else {
      filtros.nomes(data, nome)
    }
  } else if (geracao || tipo) {
    if (geracao && tipo) {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${arGeracao[2]}&offset=${arGeracao[3]}`
      const data = (await (await fetch(url)).json()).results
      filtros.geracaoTipo(data, arGeracao, arTipo[0])
    } else if (geracao) {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${arGeracao[2]}&offset=${arGeracao[3]}`
      const data = (await (await fetch(url)).json()).results
      filtros.geracaoFiltrada(data)
    } else {
      const url = `https://pokeapi.co/api/v2/type/${arTipo[1]}`
      const data = (await (await fetch(url)).json()).pokemon
      filtros.tipoFiltrado(data)
    }

  } else {
    filtros.geracaoFiltrada(data)
  }
}

function procurar() {
  pokemons.innerHTML = ''
  const valores = { nome: inputText.value, tipo: '', geracao: '' }
  for (let i of inputMnenu.children[0].children[1].children) {
    if (i.checked)
      valores.geracao = i.value
  }
  for (let i of inputMnenu.children[1].children[1].children) {
    if (i.checked)
      valores.tipo = i.value
  }
  return valores
}

window.onload = localStorage.getItem('busca')
  ? teste(JSON.parse(localStorage.getItem('busca')))
  : teste({ nome: '', tipo: '', geracao: '151-0-151-0' });