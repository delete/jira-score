'use strict'
const { score, issues } = require('./commands')
const users = {}

const isLogged = ( user ) => users.hasOwnProperty(user)

const getScore = user => {
        if  ( !isLogged(user) ) {
            return 'Ou! Preciso do seu login antes!'
        }
        return score( users[ user ] ).then( message => message )
    }

const getIssues = user => {
    if  ( !isLogged(user) ) {
        return 'Ou! Preciso do seu login antes!'
    }
    return issues( users[ user ] ).then( message => message )
}

module.exports = ( message, user ) => {
    if ( message.endsWith('.dsn.cir') || message.endsWith('.qld.cir') ) {
        const names = Object.values(users)
        if ( names.includes(message) ) {
            return 'Opa, opa! Esse usuário já existe meu chapa!'
        }

        users[user] = message
        console.log(users)
        return 'Ai sim!'
    }

    if (  /.*bom dia.*/i.test(message) ) {
        return 'Só se for para você!'
    }
    
    const messages = {
        'Oi': () => `Eai <@${user}>!`,
        'pontos': () => getScore( user ),
        'issues': () => getIssues( user ),
        'ajuda': () => '*pontos* para pegar seus pontos e *issues* para listar as quantidades.',
        'help': () => '*pontos* para pegar seus pontos e *issues* para listar as quantidades.',
        'score': () => 'Ta tirando onda em inglês, é? Mas tenta **pontos** que funciona.',
        'pra fora': () => 'haha. Engraçadinho.',
        'default': () => 'Não entendi, fala pra fora.'
    }

    return ( messages[ message ] || messages[ 'default' ])()
}
