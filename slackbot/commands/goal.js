const messages = require('../messages')
const emitter = require('../eventBus')
const { getUser } = require('../auth')

const { goal: myGoal, workdays } = require('../../src/configs')
const { getWorkingDays } = require('../../src/utils')
const { sumPontuation } = require('../../src/filters')

const goal = ( message, issues ) => {
    // Must be improved, passing the month as parameter to goal function
    const { user, channel } = message
    const month = 8
    const username = getUser( user )
    const objective = myGoal( username )
    const pointsPerDay = Math.round( objective / workdays() )
    
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), month - 1, 1) // must subsctract 1
    const workingDays = getWorkingDays( startDate, currentDate )
    
    const issuesPontuation = sumPontuation( issues )
    const mypointsPerDay = Math.round( issuesPontuation / workingDays )
   
    const response = [
        `A pontuação diária desejada é de *${pointsPerDay}/dia*`,
        `Já passou *${workingDays} dias* e a sua pontuação diária está sendo de *${mypointsPerDay}/dia*.`
    ].join('\n')
    
    emitter.emit('SEND', response, channel )
}

console.log('on GOAL')
module.exports = goal