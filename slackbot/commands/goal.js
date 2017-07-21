const { goal, workdays } = require('../../src/configs')
const { getWorkingDays } = require('../../src/utils')
const { sumPontuation } = require('../../src/filters')

module.exports = ( issues, user, month ) => {
    const objective = goal( user )
    const pointsPerDay = Math.round( objective / workdays() )
    
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), month - 1, 1) // must subsctract 1
    const workingDays = getWorkingDays( startDate, currentDate )
    
    const issuesPontuation = sumPontuation( issues )
    const mypointsPerDay = Math.round( issuesPontuation / workingDays )
   
    const response = [
        `A pontuação diária desejada é de *${pointsPerDay}/dia*`,
        `Já passou *${workingDays} dias* e a sua pontuação diária está sendo de *${mypointsPerDay}/dia*.`
    ]
    
    return response.join('\n')
}