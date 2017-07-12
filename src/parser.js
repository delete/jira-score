'use strict'

const pontuations = require('./pontuations')
const formatDificultyString = require('./utils').splitAndReturnLast
const { canClassify } = require('./filters')

const getIssueKey = ( element ) => element.key
const getIssueDificulty = ( element ) => element.fields.customfield_17132.value
const getIssueType = ( element ) => element.fields.customfield_21711
const getCustomerServiceTime = ( element ) => element.fields.timespent

const getIssueInfo = ( obj ) =>  {
    const customerServiceTime = getCustomerServiceTime( obj )
    const difficulty = getIssueDificulty( obj )
    return {
        key: getIssueKey( obj ),
        type: getIssueType( obj ),
        time: ( customerServiceTime / 60 ),
        difficulty: formatDificultyString( difficulty )
    }
}

module.exports = ( body ) => {
    return body.issues.map( issue => {
        const newIssue = getIssueInfo( issue )

        if ( newIssue.difficulty && canClassify( newIssue.type ) ) {
            const issueScored = pontuations( newIssue.difficulty )
            newIssue.pontuation = issueScored.points
        } else {
            newIssue.pontuation = 0
        }
        return newIssue
    })
}