const emitter = require('../eventBus')

const goodMorning = ( message ) => emitter.emit( 'GOOD_MORNING' , message )
const hello = ( message ) => emitter.emit( 'HELLO', message )
const help = ( message ) => emitter.emit( 'HELP', message )
const mySelf = ( message ) => emitter.emit( 'MY_SELF', message )
const requestIssues = ( message, event ) => emitter.emit( 'REQUEST_ISSUES', message, event )
const login = ( message ) => emitter.emit( 'LOGIN', message )

module.exports = {
    goodMorning,
    hello,
    help,
    mySelf,
    requestIssues,
    login
}