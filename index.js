'use strict'

const get = require('./src/request')
const { loadFile } = require('./src/utils')
const { url, goal, pointsMinute, startDate, endDate, config } = require('./src/configs')
const auth = require('./src/auth')
const parser = require('./src/parser')
const { 
    countIssuesByType,
    countIssuesByDifficulty,
    sumPontuation,
    sumTime,
    scoredIssues,
    minutesToPoints
} = require('./src/filters')

const printIssue = issue => console.log( `${issue.key} -> ${issue.difficulty} -> ${issue.pontuation}` )

const USER = ''

const print = data => {
    const issues = parser(data)

    issues.map( printIssue )

    const nc = countIssuesByDifficulty( issues, 'Não classificado') 
    const s = countIssuesByDifficulty( issues, 'Simples')
    const vs = countIssuesByDifficulty( issues, 'Muito simples')
    const m = countIssuesByDifficulty( issues, 'Média')
    const h = countIssuesByDifficulty( issues, 'Difícil')
    const vh = countIssuesByDifficulty( issues, 'Muito difícil')

    const cs = countIssuesByType( issues, 'Atendimento')
    const cst = sumTime( issues, 'Atendimento' )

    const tasks = countIssuesByType( issues, 'Tarefa')
    const taskstime = sumTime( issues, 'Tarefa' )

    const pontuation = sumPontuation( issues )
    const scored = scoredIssues( issues )

    const percentage = (pontuation * 100) / goal( USER );

    console.log(`\n\nTotal Not Classified Issues: ${nc}`)
    console.log(`Total Very Simple Issues: ${vs}`)
    console.log(`Total Simple Issues: ${s}`)
    console.log(`Total Medium Issues: ${m}`)
    console.log(`Total Hard Issues: ${h}`)
    console.log(`Total Very Hard Issues: ${vh}`)
    console.log(`\nTotal Customer Service: ${cs}`)
    console.log(`Total Customer Service Time: ${cst} minutes`)
    console.log(`\nTotal Tasks: ${tasks}`)
    console.log(`Total Tasks Time: ${taskstime} minutes -> ${minutesToPoints( taskstime, pointsMinute( USER ) )}`)
    console.log(`\nTotal issues: ${issues.length}`)
    console.log(`Scored issues: ${scored.length}`)
    console.log(`Total pontuation: ${pontuation} -> ${percentage.toFixed(2)}`)
    console.log(`Total to complete the goal: ${goal( USER ) - pontuation} -> ${100 - percentage.toFixed(2)}`)
    console.log(`Goal: ${goal( USER )}`)
}

const filterUrl = url( startDate() endDate(), USER )
const headers = { 'Authorization': `Basic ${auth( config.login, config.pass )}` }
const options = { headers }

get(filterUrl, options)
    .then( response => print(response.data) )
    .catch( response => console.log( `Error: ${response.message}` ) )
