const messages = require('../messages')
const emitter = require('../eventBus')
const { getUser } = require('../auth')

const { pointsMinute } = require('../../src/configs')
const { 
    countIssuesByType,
    countIssuesByDifficulty,
    sumTime,
    scoredIssues,
    minutesToPoints,
} = require('../../src/filters')

const issues = ( message, issues ) => {
    const user = message.user
    const username = getUser( user )
    const nc = countIssuesByDifficulty( issues, 'Não classificado') 
    const s = countIssuesByDifficulty( issues, 'Simples')
    const vs = countIssuesByDifficulty( issues, 'Muito simples')
    const m = countIssuesByDifficulty( issues, 'Média')
    const h = countIssuesByDifficulty( issues, 'Difícil')
    const vh = countIssuesByDifficulty( issues, 'Muito difícil')

    const pointsPerMinute = pointsMinute( username )

    const cs = countIssuesByType( issues, 'Atendimento')
    const cst = sumTime( issues, 'Atendimento' )

    const cstp = minutesToPoints( cst, pointsPerMinute )

    const tasks = countIssuesByType( issues, 'Tarefa')

    const response = [
        `Issues Não Classificadas: *${nc}*`,
        `Issues Muito simples: *${vs}*`,
        `Issues Simples: *${s}*`,
        `Issues Médias: *${m}*`,
        `Issues Difíceis: *${h}*`,
        `Issues Muito díficeis: *${vh}*`,
        `\nIssues de Atendimento: *${cs}*`,
        `Total de tempo em issues de Atendimento: *${cst} minutos* - ${cstp} pontos`,
        `\nIssues do tipo Tarefa: *${tasks}*`,
        `\n\nTotal de issues feitas: *${issues.length}*`,
    ].join('\n')
    
    emitter.emit('SEND', response, message.channel )
}

console.log('on ISSUES')
module.exports = issues