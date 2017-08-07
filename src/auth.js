const { toBase64 } = require('./utils')
const to64 = ( login, pass ) => toBase64( `${login}:${pass}` )
const auth = (login, pass) => to64( login, pass )

module.exports = auth