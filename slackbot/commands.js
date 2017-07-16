'use strict'

const get = require('../src/request')
const { auth, url, goal, pointsMinute } = require('../src/configs')
const parser = require('../src/parser')
const { 
    countIssuesByType,
    countIssuesByDifficulty,
    sumPontuation,
    sumTime,
    scoredIssues,
    minutesToPoints,
    pointsPercentage
} = require('../src/filters')

const loadIssues = ( user ) => {
    const startDate = '2017-07-01'
    const endDate = '2017-07-31'

    // const filterUrl = url( startDate, endDate, user )
    const filterUrl = 'http://127.0.0.1:8080/issues.json'
    const headers = { 'Authorization': `Basic ${auth()}` }
    const options = { headers }

    return get(filterUrl, options)
        .then( response => parser(response.data) )
        .catch( response => { 
            console.log( `Command loadIssues error: ${response.message}`  )
            return 'Maẽẽẽẽẽ, foi o Jira!'
        })
}

const score = ( user ) => {
    return loadIssues( user )
        .then( issues => {
            const objective = goal( user )
            const pointsPerMinute = pointsMinute( user )
            
            const issuesPontuation = sumPontuation( issues )
            const customServiceTime = sumTime( issues, 'Atendimento' )
            const totalTime = customServiceTime

            const timeInPoints = minutesToPoints( totalTime, pointsPerMinute )
            const totalPontuation = issuesPontuation + timeInPoints
            const actualPercentage = pointsPercentage(objective, totalPontuation)
            const restPercentage = ( 100 - actualPercentage ).toFixed(2)

            const moreThanHalf = 'Tu ta o bichão memo, em?!'
            const lessThanHalf = 'Anda logo com isso ae!'
            const lessThanOneThird = 'Trabalha não?! É bom começar.'
            const trollMessage = () => 
                actualPercentage < 33 ? lessThanOneThird : actualPercentage < 50 ? lessThanHalf : moreThanHalf
            
            const response = [
                `Você fez *${totalTime} minutos* de atendimento, o que da *${timeInPoints}* pontos`,
                `Você tem no total *${totalPontuation}* pontos e completou *${actualPercentage}%* da meta *${objective}* !`,
                `Faltam *${objective - totalPontuation}* pontos, *${restPercentage}%* para bater a meta!`,
                `\n${trollMessage()}`
            ]
            
            return response.join('\n')
        })
        .catch( response => {
            console.error( `Command score error: ${response}` )
            return 'Tô a fim de responder, não! Tente novamente...'
        })
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

            const cstp = minutesToPoints( cst, pointsPerMinute )

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
        .catch( response => {
            console.log( `Command issues error: ${response}` )  
            return 'Me obrigue...'
        }) 
}

module.exports = {
    score,
    issues
}