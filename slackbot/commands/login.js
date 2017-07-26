const messages = require('../messages')
const emitter = require('../eventBus');

const { login: logMe } = require('../auth')

const login = message => logMe( message )

emitter.on( 'LOGIN', login )
console.log( 'on LOGIN' )