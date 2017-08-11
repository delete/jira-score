const messages = require('./messages')
const emitter = require('./eventBus')
const { crud } = require('./../src/db')
const { admins } = require('./../src/configs')

const isAdmin = ( user ) => admins.includes( user )
const sendMessage = ( message, channel ) => emitter.emit('SEND', message, channel )
const userFound = ( channel ) => sendMessage( messages('USER_FOUND'),  channel)
const welcome = ( channel ) => sendMessage( messages('WELCOME'),  channel)
const getUsername = string => string.split(' ')[1]
const getUser = ( userId ) => crud.findOne( { slackId: userId }, (err, doc) => doc.username )

const login = ( message ) => {
    const { text, channel, user} = message
    const username = getUsername( text )
    const playerbyId = { slackId: user }
    
    crud.findOne( playerbyId, (err, doc) => {
        if ( err ) throw err
        
        if ( doc ) {
            userFound( channel )
            return
        }

        const player = { username: username }
        crud.findOne( player, (err, doc) => {
            if ( doc ) {
                crud.update(player, { $set: { slackId: user } }, {} )
                crud.update(player, { $set: { channel: channel } }, {} )
                crud.update(player, { $set: { isAdmin: isAdmin( user ) } }, {} )
                welcome( channel )
                console.log(`${doc.username} logged!`)
            }
        })
    })
}

module.exports = {
    isAdmin,
    login,
    getUser
}