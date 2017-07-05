'use strict'

const get = require('./src/request')
const { loadFile } = require('./src/utils')
const { auth, url, goal } = require('./src/configs')
const parser = require('./src/parser')

const printIssue = issue => console.log( `${issue.key} -> ${issue.difficulty} -> ${issue.pontuation}` )

const print = data => {
    const jira = parser(data)
    const issues = jira.scoredIssues()

    issues.map( printIssue )

    console.log(`\n\nTotal Not Classified Issues: ${jira.notClassifiedIssues()}`)
    console.log(`Total Very Simple Issues: ${jira.verySimpleIssues()}`)
    console.log(`Total Simple Issues: ${jira.simpleIssues()}`)
    console.log(`Total Medium Issues: ${jira.mediumIssues()}`)
    console.log(`Total Hard Issues: ${jira.hardIssues()}`)
    console.log(`Total Very Hard Issues: ${jira.veryHardIssues()}`)
    console.log(`Total Customer Service: ${jira.customerService()}`)
    console.log(`Total Customer Service Time: ${jira.customerServiceTime()} minutes`)
    console.log(`Total issues: ${jira.scored()}`)
    console.log(`Total pontuation: ${jira.pontuation()}`)
    console.log(`Goal: ${goal()}`)
}

const startDate = '2017-06-01'
const endDate = '2017-06-30'

const filterUrl = url( startDate, endDate )
const headers = { 'Authorization': `Basic ${auth()}` }
const options = { headers }

get(filterUrl, options)
    .then( response => print(response.data) )
    .catch( response => console.log( `Error: ${response.message}` ) )
