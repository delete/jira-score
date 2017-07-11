'use strict'
const score = require('./score')
const users = {}

module.exports = ( message, user ) => {
    if ( message.endsWith('.dsn.cir') ) {
        users[user] = message
        return 'Ai sim!'
    }
  
    const messages = {
        'Oi': () => `Hello <@${user}>!`,
        'score': () => score( users[ user ] ),
        'default': () => 'Não entendi.'
    }

    return ( messages[ message ] || messages[ 'default' ])()
}