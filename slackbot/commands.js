'use strict'

const get = require('../src/request')
const { auth, url, goal, pointsMinute } = require('../src/configs')
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
            const objective = goal(user)
            let pontuation = sumPontuation( issues )

            const cst = sumTime( issues, 'Atendimento' )
            const totalTime = cst
            const timeInPoints = Math.round( totalTime * pointsMinute( user ) )

            pontuation = pontuation + timeInPoints

            const percentage = ( (pontuation * 100) / objective ).toFixed(2);
            const moreThanHalf = 'Tu ta o bichão memo, em?!'
            const lessThanHalf = 'Anda logo com isso ae!'
            const lessThanOneThird = 'Trabalha não?! É bom começar.'
            
            const response = [
                `Você fez *${totalTime} minutos* de atendimento, o que da *${timeInPoints}* pontos`,
                `Você tem no total *${pontuation}* pontos e completou *${percentage}%* da meta *${objective}* !`,
                `Faltam *${objective - pontuation}* pontos, *${(100 - percentage).toFixed(2)}%* para bater a meta!`,
                `\n${percentage < 33 ? lessThanOneThird : percentage < 50 ? lessThanHalf : moreThanHalf}`
            ]
            
            return response.join('\n')
        })
        .catch( response => `Error: ${response.message}` )
}

const issues = ( user ) => {
    return loadIssues( user )
        .then( issues => {
            const nc = countIssuesByDifficulty( issues, 'Não classificado') 
            const s = countIssuesByDifficulty( issues, 'Simples')
            const vs = countIssuesByDifficulty( issues, 'Muito simples')
            const m = countIssuesByDifficulty( issues, 'Média')
            const h = countIssuesByDifficulty( issues, 'Difícil')
            const vh = countIssuesByDifficulty( issues, 'Muito difícil')

            const pointsPerMinute = pointsMinute( user )

            const cs = countIssuesByType( issues, 'Atendimento')
            const cst = sumTime( issues, 'Atendimento' )
            const cstp = Math.round( cst * pointsPerMinute )

            const tasks = countIssuesByType( issues, 'Tarefa')

            const scored = scoredIssues( issues )

            const response = [
                `Issues Não Classificadas: *${nc}*`,
                `Issues Muito simples: *${vs}*`,
                `Issues Simples: *${s}*`,
                `Issues Médias: *${m}*`,
                `Issues Difíceis: *${h}*`,
                `Issues Muito díficeis: *${vh}*`,
                `\nIssues de Atendimento: *${cs}*`,
                `Total de tempo em issues de Atendimento: *${cst} minutos* - ${cstp} pontos`,
                `\nIssues de Tarefas: *${tasks}*`,
                `\nTotal de issues: *${issues.length}*`,
                `Total de issues pontuadas: *${scored.length}*`
            ]

            return response.join('\n')
        })
        .catch( response => `Error: ${response.message}` )   
}

module.exports = {
    score,
    issues
}