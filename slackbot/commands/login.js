const messages = require('../messages')
const { login: logMe } = require('../auth')

const login = message => logMe( message )

console.log( 'on LOGIN' )
module.exports = login