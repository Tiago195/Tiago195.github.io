const geracao = document.querySelector('#geração')
const pokemons = document.querySelector('.todos-pokemons')
const inputUsuario = document.querySelector('#text')
const tipo = document.querySelector('#tipo')
const btn = document.querySelector('#btn')
const carregando = document.querySelector('.carregando')

async function todosPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`
  return await (await fetch(url)).json()
}

const filtros = {
  async geracaoTipo(e, geracao, tipo) {
    for (let i of e) {
      const data = await (await fetch(i.url)).json()
      if ((data.id > geracao[1] && data.id <= geracao[0]) && data.types.some(e => e.type.name === tipo))
        append(data)
    }
  },
  async nomes(e, nome) {
    for (let i of e) {
      if (i.name.includes(nome)) {
        const data = await (await fetch(i.url)).json()
        append(data)
      }
    }
  },
  async geracao(e, comparador) {
    for (let i of e) {
      const data = await (await fetch(i.url)).json()
      if (data.id > comparador[1] && data.id <= comparador[0]) {
        append(data)
      }
    }
  },
  async geracaoFiltrada(e) {
    for (let i of e) {
      const data = await (await (fetch(i.url))).json()
      append(data)
    }
  },
  async tipo(e, comparador) {
    for (let i of e) {
      const data = await (await fetch(i.url)).json()
      if (data.types.some(f => f.type.name === comparador)) {
        append(data)
      }
    }
  },
  async tipoFiltrado(e) {
    for (let i of e) {
      const data = await (await (fetch(i.pokemon.url))).json()
      append(data)
    }
  },
}

const colors = {
  normal: '#c6c6a7',
  fire: '#f5ac78',
  water: '#9db7f5',
  electric: '#fae078',
  grass: '#a7db8d',
  ice: '#bce6e6',
  fighting: '#d67873',
  poison: '#c183c1',
  ground: '#ebd69d',
  flying: '#c6b7f5',
  psychic: '#fa92b2',
  bug: '#c6d16e',
  rock: '#d1c17d',
  ghost: '#a292bc',
  dragon: '#a27dfa',
  dark: '#a19288',
  steel: '#d1d1e0',
  fairy: '#f4bdc9',
  unknown: '#9dc1b7',
}

const icons = {
  normal: 'icons/normal.svg',
  fire: 'icons/fire.svg',
  water: 'icons/water.svg',
  electric: 'icons/electric.svg',
  grass: 'icons/grass.svg',
  ice: 'icons/ice.svg',
  fighting: 'icons/fighting.svg',
  poison: 'icons/poison.svg',
  ground: 'icons/ground.svg',
  flying: 'icons/flying.svg',
  psychic: 'icons/psychic.svg',
  bug: 'icons/bug.svg',
  rock: 'icons/rock.svg',
  ghost: 'icons/ghost.svg',
  dragon: 'icons/dragon.svg',
  dark: 'icons/dark.svg',
  steel: 'icons/steel.svg',
  fairy: 'icons/fairy.svg',
  unknown: 'icons/unknown.svg',
}

const classPokemons = {
  normal: 'normal',
  fire: 'fire',
  water: 'water',
  electric: 'electric',
  grass: 'grass',
  ice: 'ice',
  fighting: 'fighting',
  poison: 'poison',
  ground: 'ground',
  flying: 'flying',
  psychic: 'psychic',
  bug: 'bug',
  rock: 'rock',
  ghost: 'ghost',
  dragon: 'dragon',
  dark: 'dark',
  steel: 'steel',
  fairy: 'fairy',
  unknown: 'unknown',
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
    const  // const teste = geracao.split('-')
      tipo2 = document.createElement('div')
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

async function separaUrls(array) {
  const tutu = []
  for (let i of array) {
    const data = await (await (fetch(i.url))).json()
    tutu.push(data)
  }
  return tutu
}

async function teste({ nome, tipo, geracao }) {
  const data = (await todosPokemon()).results
  const arGeracao = geracao.split('-')
  const arTipo = tipo.split('-')

  if (nome && tipo && geracao) {
    const urls = data.filter(f => f.name.includes(nome))
    filtros.geracaoTipo(urls, arGeracao, arTipo[0])
  } else if (nome) {
    if (geracao || tipo) {
      const urls = data.filter(f => f.name.includes(nome))
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
  const valores = { nome: inputUsuario.value, tipo: tipo.value, geracao: geracao.value }
  teste(valores)
  inputUsuario.value = ''
}

btn.addEventListener('click', procurar)

inputUsuario.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    procurar()
  }
})
