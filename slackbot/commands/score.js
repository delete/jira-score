const messages = require('../messages')
const emitter = require('../eventBus')

const { 
    sumPontuation,
    sumTime,
    minutesToPoints,
    pointsPercentage
} = require('../../src/filters')

const lessThanOneThird = ( value ) => value <= 33
const lessThanHalf = ( value ) => value <= 50
const lessThanHundred = ( value ) => value < 100
const trollMessage = ( percentage ) => 
    lessThanOneThird( percentage ) 
    ? messages('ONE_THIRD') 
    : lessThanHalf( percentage ) 
        ? messages('LESS_HALF') 
            : lessThanHundred( percentage)
                ? messages('MORE_HALF')
                : messages('COMPLETED')

const score = (  message, player ) => {
    const month = 'aug'
    const { username } = player
    const { issues, pointsPerHour, goal } = player.months[month]
    
    const issuesPontuation = sumPontuation( issues )
    const costumerServiceTime = sumTime( issues, 'Atendimento' )

    const timeInPoints = minutesToPoints( costumerServiceTime, pointsPerHour )
    const actualPercentage = pointsPercentage( goal, issuesPontuation )
    const restPercentage = ( 100 - actualPercentage ).toFixed( 2 )

    const rest = ( goal - issuesPontuation )
    const restToGoal = rest < 0 ? 0 : rest
       
    const response = [
        `Você fez *${costumerServiceTime} minutos* de atendimento, o que da *${timeInPoints}* pontos`,
        `Você tem *${issuesPontuation}* pontos e completou *${actualPercentage}%* da meta *${goal}* !`,
        `Faltam *${restToGoal}* pontos, *${restPercentage < 0 ? 0 : restPercentage}%* para bater a meta!`,
        `\n${trollMessage( actualPercentage )}`
    ].join('\n')
    
    emitter.emit( 'SEND', response, message.channel )
}
console.log( 'on SCORE' )
module.exports = score