const messages = require('../messages')
const emitter = require('../eventBus')

const { getWorkingDays } = require('../../src/utils')
const { sumPontuation, sumTime, minutesToPoints } = require('../../src/filters')

const myGoal = ( message, player ) => {
    // Must be improved, passing the month as parameter to goal function
    const monthNum = 8
    const month = 'aug'
    const { username } = player
    const { issues, pointsPerHour , workdays, goal } = player.months[month]
    const { channel } = message


    const costumerServiceTime = sumTime( issues, 'Atendimento' )
    const timeInPoints = minutesToPoints( costumerServiceTime, pointsPerHour )

    const objectiveMinusCostumerService = ( goal - timeInPoints )

    const pointsPerDay = ( Math.round( objectiveMinusCostumerService / workdays ) )
    
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), monthNum - 1, 1) // must subsctract 1
    const workingDays = getWorkingDays( startDate, currentDate )
    
    const issuesPontuation = sumPontuation( issues )
    const mypointsPerDay = Math.round( issuesPontuation / workingDays )
   
    const response = [
        `A pontuação diária desejada é de *${pointsPerDay}/dia* (já com abono de ${timeInPoints} pontos de atendimento)`,
        `Já passou *${workingDays} dias* e a sua pontuação diária está sendo de *${mypointsPerDay}/dia*.`
    ].join('\n')
    
    emitter.emit('SEND', response, channel )
}

console.log('on GOAL')
module.exports = myGoal