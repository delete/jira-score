const messages = require('../messages')
const emitter = require('../eventBus')

const { 
    countIssuesByType,
    countIssuesByDifficulty,
    sumTime,
    minutesToPoints,
} = require('../../src/filters')

const printIssue = issue => `${issue.key} -> ${issue.difficulty} -> ${issue.pontuation}`

const issues = ( message, player ) => {
    const month = 'aug'
    const { username } = player
    const { issues, pointsPerHour } = player.months[month]
    const { channel } = message

    const nc = countIssuesByDifficulty( issues, 'Não classificado') 
    const s = countIssuesByDifficulty( issues, 'Simples')
    const vs = countIssuesByDifficulty( issues, 'Muito simples')
    const m = countIssuesByDifficulty( issues, 'Média')
    const h = countIssuesByDifficulty( issues, 'Difícil')
    const vh = countIssuesByDifficulty( issues, 'Muito difícil')

    const cs = countIssuesByType( issues, 'Atendimento')
    const cst = sumTime( issues, 'Atendimento' )

    const cstp = minutesToPoints( cst, pointsPerHour )

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
    
    emitter.emit('SEND', response, channel )

    const allIssuesResponse = issues.map( printIssue ).join('\n')
    emitter.emit('SEND', allIssuesResponse, channel )
}

console.log('on ISSUES')
module.exports = issues