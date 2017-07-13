'use strict'

const getDifficulty = ( difficulty ) => {
    const dificulties = {
        'Não classificado': () => ({'points': 30, 'slug': 'NC'}),
        'Muito simples': () => ({'points': 30, 'slug': 'VS'}),
        'Simples': () => ({'points': 75, 'slug': 'S'}),
        'Média': () => ({'points': 160, 'slug': 'M'}),
        'Difícil': () => ({'points': 320, 'slug': 'H'}),
        'Muito difícil': () => ({'points': 560, 'slug': 'VH'}),
    }
    return (dificulties[ difficulty ] || dificulties['Não classificado'])()
}

const isClassified = ( type ) => {
    const types = {
        'Programação': () => true,
        'Teste': () => true,
        'Manual / Documentação': () => true,
        'Liberação de Versão Web': () => true,
        'Liberação de Versão': () => true,
        'default': () => false
    }
    return (types[ type ] || types[ 'default' ])()
}

module.exports = {
    getDifficulty,
    isClassified
}