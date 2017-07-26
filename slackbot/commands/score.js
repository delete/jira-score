const messages = require('../messages')
const emitter = require('../eventBus')
const { getUser } = require('../auth')

const { goal, pointsMinute } = require('../../src/configs')
const { 
    sumPontuation,
    sumTime,
    minutesToPoints,
    pointsPercentage
} = require('../../src/filters')

const lessThanOneThird = ( value ) => value <= 33
const lessThanHalf = ( value ) => value <= 50
const lessThanHundred = ( value ) => value < 100
const completed = ( value ) => value >= 100
const trollMessage = ( percentage ) => 
    lessThanOneThird( percentage ) 
    ? messages('ONE_THIRD') 
    : lessThanHalf( percentage ) 
        ? messages('LESS_HALF') 
            : lessThanHundred( percentage)
                ? messages('MORE_HALF')
                : messages('COMPLETED')

const score = (  message, issues ) => {
    const user = message.user
    const username = getUser( user )
    const objective = goal( username )
    const pointsPerMinute = pointsMinute( username )
    
    const issuesPontuation = sumPontuation( issues )
    const customServiceTime = sumTime( issues, 'Atendimento' )
    const totalTime = customServiceTime

    const timeInPoints = minutesToPoints( totalTime, pointsPerMinute )
    const actualPercentage = pointsPercentage(objective, issuesPontuation)
    const restPercentage = ( 100 - actualPercentage ).toFixed(2)

    const rest = ( objective - issuesPontuation )
    const restToGoal = rest < 0 ? 0 : rest
   
    const response = [
        `Você fez *${totalTime} minutos* de atendimento, o que da *${timeInPoints}* pontos`,
        `Você tem *${issuesPontuation}* pontos e completou *${actualPercentage}%* da meta *${objective}* !`,
        `Faltam *${restToGoal}* pontos, *${restPercentage < 0 ? 0 : restPercentage}%* para bater a meta!`,
        `\n${trollMessage( actualPercentage )}`
    ].join('\n')
    
    emitter.emit('SEND', response, message.channel )
}

emitter.on( 'SCORE', score )
console.log('on SCORE')