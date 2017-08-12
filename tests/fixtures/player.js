const mockIssues = require('./issues')

const player = {
        slackIid: '123465',
        username: 'fellipe.dsn.cir',
        channel: 'a1',
        updated: new Date(),
        isAdmin: false,
        months: {
            aug: {
                issues: mockIssues,
                goal: 3528,
                workdays: 21,
                pointsPerHour: 21
            }
        }        
}

module.exports = player