'use strict'

const get = require('../src/request')
const { auth, url } = require('../src/configs')
const parser = require('../src/parser')
const { 
    countIssuesByType,
    countIssuesByDifficulty,
    sumPontuation,
    sumTime,
    scoredIssues
} = require('../src/filters')

const loadIssues = ( user ) => {
    const startDate = '2017-07-01'
    const endDate = '2017-07-31'

    const filterUrl = url( startDate, endDate, user )
    const headers = { 'Authorization': `Basic ${auth()}` }
    const options = { headers }

    return get(filterUrl, options)
        .then( response => parser(response.data) )
        .catch( response => `Error: ${response.message}` )
}

const score = ( user ) => {
    return loadIssues( user )
        .then( issues => {
            const pontuation = sumPontuation( issues )
            return `Wow... você tem ${pontuation} pontos!`
        })
        .catch( response => `Error: ${response.message}` )
}

const issues = ( user ) => {
    return loadIssues( user )
        .then( issues => {
            const nc = countIssuesByDifficulty( issues, 'Não Classificado') 
            const s = countIssuesByDifficulty( issues, 'Simples')
            const vs = countIssuesByDifficulty( issues, 'Muito simples')
            const m = countIssuesByDifficulty( issues, 'Média')
            const h = countIssuesByDifficulty( issues, 'Difícil')
            const vh = countIssuesByDifficulty( issues, 'Muito difícil')

            const cs = countIssuesByType( issues, 'Atendimento')
            const cst = sumTime( issues, 'Atendimento' )

            const tasks = countIssuesByType( issues, 'Tarefa')
            const taskstime = sumTime( issues, 'Tarefa' )

            const scored = scoredIssues( issues )

            const string = [
                `Issues Não Classificadas: ${nc}`,
                `Issues Muito simples: ${vs}`,
                `Issues Simples: ${s}`,
                `Issues Médias: ${m}`,
                `Issues Difíceis: ${h}`,
                `Issues Muito díficeis: ${vh}`,
                `\nIssues de Atendimento: ${cs}`,
                `Total de tempo em issues de Atendimento: ${cst} minutes`,
                `\nIssues de Tarefas: ${tasks}`,
                `Total de tempo em issues de Tarefas: ${taskstime} minutes`,
                `\nTotal de issues: ${issues.length}`,
                `Total de issues pontuadas: ${scored.length}`
            ]

            return string.join('\n')
        })
        .catch( response => `Error: ${response.message}` )   
}

module.exports = {
    score,
    issues
}