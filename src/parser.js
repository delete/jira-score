'use strict'

const { getDifficulty, isClassified } = require('./pontuations')
const formatDificultyString = require('./utils').splitStringAndReturnLast
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

        if ( newIssue.difficulty && isClassified( newIssue.type ) ) {
            const issueScored = getDifficulty( newIssue.difficulty )
            newIssue.pontuation = issueScored.points
        } else {
            newIssue.pontuation = 0
        }
        return newIssue
    })
}