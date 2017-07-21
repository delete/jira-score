'use strict'

const messages = require('../messages')
const get = require('../../src/request')
const { auth, url } = require('../../src/configs')
const parser = require('../../src/parser')

// Commands
const score = require('./score')
const issues = require('./issues')
const goal = require('./goal')

const botErrorMessage = ( msg ) => ( response ) => {
    console.log( `Command ${msg} error: ${response}` )
    return messages('ERROR_BOT')
}

const jiraErrorMessage = ( response ) => {
    console.log( `Command loadIssues error: ${response}` )
    return messages('ERROR_JIRA')
}

const loadIssues = ( user ) => {
    const startDate = '2017-07-01'
    const endDate = '2017-07-31'

    const filterUrl = url( startDate, endDate, user )
    const headers = { 'Authorization': `Basic ${auth()}` }
    const options = { headers }

    return get(filterUrl, options)
        .then( response => parser(response.data) )
        .catch( jiraErrorMessage )
}

const issuesCommand = ( user ) => {
    return loadIssues( user )
        .then( data => issues( data, user ) )
        .catch( botErrorMessage( 'issues' ) ) 
}

const scoreCommand = ( user ) => {
    return loadIssues( user )
        .then( data => score( data, user ) )
        .catch( botErrorMessage( 'score' ) ) 
}

const goalCommand = ( user ) => {
    return loadIssues( user )
        .then( data => goal( data, user ) )
        .catch( botErrorMessage( 'goal' ) ) 
}

module.exports = {
    score: scoreCommand,
    issues: issuesCommand,
    goal: goalCommand
}