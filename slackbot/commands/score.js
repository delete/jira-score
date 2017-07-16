const { goal, pointsMinute } = require('../../src/configs')
const messages = require('../messages')
const { 
    sumPontuation,
    sumTime,
    minutesToPoints,
    pointsPercentage
} = require('../../src/filters')

const lessThanOneThird = ( value ) => value <= 33
const lessThanHalf = ( value ) => value <= 50
const trollMessage = ( percentage ) => 
    lessThanOneThird( percentage ) 
    ? messages('ONE_THIRD') 
    : lessThanHalf( percentage ) 
        ? messages('LESS_HALF') 
        : messages('MORE_HALF')

module.exports = ( issues, user ) => {
    const objective = goal( user )
    const pointsPerMinute = pointsMinute( user )
    
    const issuesPontuation = sumPontuation( issues )
    const customServiceTime = sumTime( issues, 'Atendimento' )
    const totalTime = customServiceTime

    const timeInPoints = minutesToPoints( totalTime, pointsPerMinute )
    const totalPontuation = issuesPontuation + timeInPoints
    const actualPercentage = pointsPercentage(objective, totalPontuation)
    const restPercentage = ( 100 - actualPercentage ).toFixed(2)
   
    const response = [
        `Você fez *${totalTime} minutos* de atendimento, o que da *${timeInPoints}* pontos`,
        `Você tem no total *${totalPontuation}* pontos e completou *${actualPercentage}%* da meta *${objective}* !`,
        `Faltam *${objective - totalPontuation}* pontos, *${restPercentage}%* para bater a meta!`,
        `\n${trollMessage( actualPercentage )}`
    ]
    
    return response.join('\n')
}