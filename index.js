'use strict'

const get = require('./src/request')
const { loadFile } = require('./src/utils')
const { auth, url, meta } = require('./src/configs')
const parser = require('./src/parser')

const printIssue = issue => console.log( `${issue.key} -> ${issue.difficulty} -> ${issue.pontuation}` )

const print = data => {
    const jira = parser(data)
    const issues = jira.scoredIssues()

    issues.map( printIssue )

    console.log(`\n\nTotal atendimento: ${jira.customerService()}`)
    console.log(`Total tempo: ${jira.customerServiceTime()} minutos`)
    console.log(`Total issues: ${jira.scored()}`)
    console.log(`Total pontuation: ${jira.pontuation()}`)
    console.log(`Meta: ${meta()}`)
}

const filterUrl = url()
const headers = { 'Authorization': `Basic ${auth()}` }
const options = { headers }

get(filterUrl, options)
    .then( response => print(response.data) )
    .catch( response => console.log( `Error: ${response.message}` ) )
