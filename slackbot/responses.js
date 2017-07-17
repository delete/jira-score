'use strict'
const { score, issues } = require('./commands')
const messages = require('./messages')
const users = {}

const isLogged = ( user ) => users.hasOwnProperty(user)

const getScore = user => {
        if  ( !isLogged(user) ) {
            return messages('USER_NEEDED')
        }
        return score( users[ user ] ).then( message => message )
    }

const getIssues = user => {
    if  ( !isLogged(user) ) {
        return messages('USER_NEEDED')
    }
    return issues( users[ user ] ).then( message => message )
}

module.exports = ( message, user ) => {
    if ( message.endsWith('.dsn.cir') || message.endsWith('.qld.cir') ) {
        const names = Object.values(users)
        if ( names.includes(message) ) {
            return messages('USER_FOUND')
        }

        users[user] = message
        console.log(users)
        return messages('WELCOME')
    }

    if (  /.*bom dia.*/i.test(message) ) {
        return messages('GOOD_MORNING')
    }
    
    const responses = {
        'Oi': () => `Eai <@${user}>!`,
        'oi': () => `Colé <@${user}>!`,
        'pontos': () => getScore( user ),
        'ponto': () => getScore( user ),
        'issues': () => getIssues( user ),
        'issue': () => getIssues( user ),
        'ajuda': () => '*pontos* para pegar seus pontos e *issues* para listar as quantidades.',
        'help': () => '*pontos* para pegar seus pontos e *issues* para listar as quantidades.',
        'score': () => 'Ta tirando onda em inglês, é? Mas tenta **pontos** que funciona.',
        'pra fora': () => 'haha. Engraçadinho.',
        'jira': () => messages('MY_SELF'),
        'default': () => messages('DONT_GET_IT')
    }

    return ( responses[ message ] || responses[ 'default' ])()
}
