const messages = require('./messages')
const emitter = require('./eventBus')

// Weak login
let users = {}
const isLogged = ( user ) => users.hasOwnProperty(user)
const sendMessage = ( message, channel ) => emitter.emit('SEND', message, channel )
const userFound = ( channel ) => sendMessage( messages('USER_FOUND'),  channel)
const welcome = ( channel ) => sendMessage( messages('WELCOME'),  channel)
const getUsername = string => string.split(' ')[1]
const getUser = ( userId ) => users[ userId ]
const logout = () => users = {}

const login = ( message ) => {
    const { text, channel, user} = message 
    const username = getUsername( text )
    
    const names = Object.values( users )
    if ( names.includes( username ) ) {
        userFound( channel )
        return
    }

    users[user] = username
    welcome( channel )
    console.log('users', users)
}

module.exports = {
    isLogged,
    login,
    getUser,
    logout
}