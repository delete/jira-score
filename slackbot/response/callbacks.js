const emitter = require('../eventBus')

const goodMorning = ( message ) => emitter.emit( 'GOOD_MORNING' , message )
const hello = ( message ) => emitter.emit( 'HELLO', message )
const help = ( message ) => emitter.emit( 'HELP', message )
const mySelf = ( message ) => emitter.emit( 'MY_SELF', message )
const loadIssues = ( message, event ) => emitter.emit( 'LOAD_ISSUES', message, event )
const login = ( message ) => emitter.emit( 'LOGIN', message )
const top10 = ( message ) => emitter.emit( 'TOP10', message )

module.exports = {
    goodMorning,
    hello,
    help,
    mySelf,
    loadIssues,
    login,
    top10
}