const messages = require('../messages')
const emitter = require('../eventBus')

const { crud } = require('../../src/db')
const { goal: myGoal, workdays, pointsMinute } = require('../../src/configs')
const { getWorkingDays } = require('../../src/utils')
const { sumPontuation, sumTime, minutesToPoints } = require('../../src/filters')

const goal = ( message, issues ) => {
    // Must be improved, passing the month as parameter to goal function
    const { user, channel } = message
    const player = { slackId: user }
    
    crud.findOne(player, (err, doc) => {
        const month = 8
        const username = doc.username
        const objective = myGoal( username )

        const costumerServiceTime = sumTime( issues, 'Atendimento' )
        const pointsPerMinute = pointsMinute( username )
        const timeInPoints = minutesToPoints( costumerServiceTime, pointsPerMinute )

        const objectiveMinusCostumerService = ( objective - timeInPoints )

        const pointsPerDay = ( Math.round( objectiveMinusCostumerService / workdays() ) )
        
        const currentDate = new Date()
        const startDate = new Date(currentDate.getFullYear(), month - 1, 1) // must subsctract 1
        const workingDays = getWorkingDays( startDate, currentDate )
        
        const issuesPontuation = sumPontuation( issues )
        const mypointsPerDay = Math.round( issuesPontuation / workingDays )
       
        const response = [
            `A pontuação diária desejada é de *${pointsPerDay}/dia* (já com abono de ${timeInPoints} pontos de atendimento)`,
            `Já passou *${workingDays} dias* e a sua pontuação diária está sendo de *${mypointsPerDay}/dia*.`
        ].join('\n')
        
        emitter.emit('SEND', response, channel )
    })
}

console.log('on GOAL')
module.exports = goal