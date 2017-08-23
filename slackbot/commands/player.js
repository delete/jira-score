const messages = require('../messages')
const emitter = require('../eventBus')
const { crud } = require('../../src/db')
const { isAdmin } = require('../auth')

const notAlowed = ( channel ) => emitter.emit('SEND', messages('NOT_ADMIN'), channel )
const userNotFound = ( channel ) => emitter.emit('SEND', messages('USER_NOT_FOUND'), channel )
const extractRegexPattern = ( text, pattern ) => text.match( pattern )

const userPattern = /\s.*(dsn|qld).cir/i

const getParam = text => {
    const paramText = extractRegexPattern( text, userPattern )

    return {
        player: paramText ? paramText[0].trim() : null
    }
}

const emitters = ( message, player ) => {
    emitter.emit( 'SCORE', message, player )
    emitter.emit( 'ISSUES', message, player )
    emitter.emit( 'GOAL', message, player )
}

const playerDetails = message => {
    const { user , channel, text } = message
    const month = 'aug'

    if ( !isAdmin( user ) ) {
       notAlowed( channel )
       return 
    }

    const { player } = getParam( text )
    
    // Must reload the database to get the new values
    crud.db.loadDatabase(function (err) {
        if ( err ) throw err

        crud.findOne( { username: player }, (err, doc) => 
            doc ?emitters( message, doc ) : userNotFound( channel) ) 
    });
}

console.log('on PLAYER')
module.exports = playerDetails