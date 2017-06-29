'use strict'

module.exports = ( dificulty ) => {
    const dificulties = {
        'Muito simples': () => 30,
        'Simples': () => 75,
        'Média': () => 160,
        'Difícil': () => 320,
        'Muito difícil': () => 560,
    }
    return (dificulties[ dificulty ] || dificulties['Muito simples'])()
}
