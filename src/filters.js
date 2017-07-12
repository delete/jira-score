'use strict'

const countIssuesByType = ( issues, type ) => issues.reduce( (total, issue ) => issue.type === type ? total + 1 : total, 0 )
const countIssuesByDifficulty = ( issues, difficulty ) => issues.reduce( (total, issue ) => issue.difficulty === difficulty && canClassify(issue.type) ? total + 1 : total, 0 )
const sumPontuation = ( issues ) => issues.reduce( (total, issue ) => canClassify(issue.type) ? total + issue.pontuation : total, 0 )
const sumTime = ( issues, type ) => issues.reduce( (total, issue ) => issue.type === type ? total + issue.time : total, 0 )
const canClassify = ( issueType ) => (issueType === 'Programação' || issueType === 'Teste')
const hasScore = ( issue ) => issue.pontuation > 0 && canClassify(issue.type)
const scoredIssues = ( issues ) => issues.filter( issue => hasScore( issue ) )

module.exports = {
    countIssuesByType,
    countIssuesByDifficulty,
    sumPontuation,
    sumTime,
    canClassify,
    hasScore,
    scoredIssues
}