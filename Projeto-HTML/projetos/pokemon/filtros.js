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
      if (i.name.includes(nome.toLowerCase())) {
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
