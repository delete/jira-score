'use strict'

const get = require('./src/request')
const { loadFile } = require('./src/utils')
const { auth, url, goal } = require('./src/configs')
const parser = require('./src/parser')

const printIssue = issue => console.log( `${issue.key} -> ${issue.difficulty} -> ${issue.pontuation}` )

const print = data => {
    const jira = parser(data)
    const issues = jira.scoredIssues()
    const issuesByDifficulty = jira.totalIssuesByDifficulty

    issues.map( printIssue )

    console.log(`\n\nTotal Not Classified Issues: ${issuesByDifficulty.notClassified}`)
    console.log(`Total Very Simple Issues: ${issuesByDifficulty.verySimple}`)
    console.log(`Total Simple Issues: ${issuesByDifficulty.simple}`)
    console.log(`Total Medium Issues: ${issuesByDifficulty.medium}`)
    console.log(`Total Hard Issues: ${issuesByDifficulty.hard}`)
    console.log(`Total Very Hard Issues: ${issuesByDifficulty.veryHard}`)
    console.log(`Total Customer Service: ${jira.customerService()}`)
    console.log(`Total Customer Service Time: ${jira.customerServiceTime()} minutes`)
    console.log(`Total issues: ${jira.scored()}`)
    console.log(`Total pontuation: ${jira.pontuation()}`)
    console.log(`Goal: ${goal()}`)
}

const startDate = '2017-07-01'
const endDate = '2017-07-31'

const filterUrl = url( startDate, endDate )
const headers = { 'Authorization': `Basic ${auth()}` }
const options = { headers }

get(filterUrl, options)
    .then( response => print(response.data) )
    .catch( response => console.log( `Error: ${response.message}` ) )
