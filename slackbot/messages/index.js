const types = require('./types')

const random = ( array ) => array[ Math.floor( Math.random() * array.length ) ]

const messages = ( t ) => {
    const ts = {
        DONT_GET_IT: () => random( types[t] ),
        ERROR_BOT: () => random( types[t] ),
        ERROR_JIRA: () => random( types[t] ),
        GOOD_MORNING: () => random( types[t] ),
        USER_FOUND: () => random( types[t] ),
        WELCOME: () => random( types[t] ),
        USER_NEEDED: () => random( types[t] ),
        default: () => new Error('Message not found')
    }
     return (ts[ t ] || ts[ 'default' ])()
}

module.exports = messages