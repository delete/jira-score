'use strict'

module.exports = ( dificulty ) => {
    const dificulties = {
        'Não Classificado': () => ({'points': 30, 'slug': 'NC'}),
        'Muito simples': () => ({'points': 30, 'slug': 'VS'}),
        'Simples': () => ({'points': 75, 'slug': 'S'}),
        'Média': () => ({'points': 160, 'slug': 'M'}),
        'Difícil': () => ({'points': 320, 'slug': 'H'}),
        'Muito difícil': () => ({'points': 560, 'slug': 'VH'}),
    }
    return (dificulties[ dificulty ] || dificulties['Não Classificado'])()
}
