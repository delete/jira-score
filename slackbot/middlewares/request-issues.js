const messages = require('../messages')
const emitter = require('../eventBus')
const { isLogged, login, getUser } = require('../auth')

const get = require('../../src/request')
const { auth, url } = require('../../src/configs')
const parser = require('../../src/parser')

const loginIsNeeded = ( channel ) => emitter.emit('SEND', messages('USER_NEEDED'), channel )

const requestIssue = (  message, event ) => {
    const { user , channel} = message

    if ( !isLogged( user ) ) {
        loginIsNeeded( channel )
        return
    }

    emitter.emit('SEND', messages('LOADING'), channel )
    
    const username = getUser( user )    
    const startDate = '2017-07-01'
    const endDate = '2017-07-31'

    const filterUrl = url( startDate, endDate, username )
    const headers = { 'Authorization': `Basic ${auth()}` }
    const options = { headers }

    get(filterUrl, options)
        .then( ( response ) => {
            const issues = parser(response.data)
            emitter.emit(event, message, issues )
        } )
        .catch( jiraErrorMessage )
}

const jiraErrorMessage = ( response ) => {
    console.log( `Command loadIssues error: ${response}` )
    return messages('ERROR_JIRA')
}

emitter.on( 'REQUEST_ISSUES', requestIssue )
console.log('middleware REQUEST_ISSUES')