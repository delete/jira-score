'use strict'
const score = require('./score')
const users = {}

module.exports = ( message, user ) => {
    if ( message.endsWith('.dsn.cir') ) {
        const names = Object.values(users)
        if ( names.includes(message) ) {
            return 'Opa, opa! Esse usuário já existe meu chapa!'
        }

        users[user] = message
        console.log(users)
        return 'Ai sim!'
    }

    const getScore = user => {
        if  ( !users.hasOwnProperty(user) ) {
            return 'Ou! Preciso do seu login antes!'
        }
        return score( users[ user ] ).then( message => message )
    }
  
    const messages = {
        'Oi': () => `Eai <@${user}>!`,
        'pontos': () => getScore(user),
        'score': () => 'Ta tirando onda em inglês, é? Mas tenta **pontos** que funciona.',
        'pra fora': () => 'haha. Engraçadinho.',
        'default': () => 'Não entendi, fala pra fora.'
    }

    return ( messages[ message ] || messages[ 'default' ])()
}
