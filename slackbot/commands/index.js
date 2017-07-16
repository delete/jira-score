'use strict'

const messages = require('../messages')
const get = require('../../src/request')
const { auth, url } = require('../../src/configs')
const parser = require('../../src/parser')

// Commands
const score = require('./score')
const issues = require('./issues')

const botErrorMessage = response => {
    console.log( `Command BOT error: ${response}` )
    return messages('ERROR_BOT')
}

const jiraErrorMessage = response => {
    console.log( `Command JIRA error: ${response}` )
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
        .catch( botErrorMessage ) 
}

const scoreCommand = ( user ) => {
    return loadIssues( user )
        .then( data => score( data, user ) )
        .catch( botErrorMessage ) 
}

module.exports = {
    score: scoreCommand,
    issues: issuesCommand
}