'use strict'

const { isClassified } = require('./pontuations')

const countIssuesByType = ( issues, type ) => 
    issues.reduce( (total, issue ) => issue.type === type ? total + 1 : total, 0 )

const countIssuesByDifficulty = ( issues, difficulty ) => 
    issues.reduce( (total, issue ) => issue.difficulty === difficulty && isClassified(issue.type) ? total + 1 : total, 0 )

const sumPontuation = ( issues ) => 
    issues.reduce( (total, issue ) => isClassified(issue.type) ? total + issue.pontuation : total, 0 )

const sumTime = ( issues, type ) => 
    issues.reduce( (total, issue ) => issue.type === type ? total + issue.time : total, 0 )

const minutesToPoints = ( minutes, pointsPerHour ) => Math.round( ( minutes * (pointsPerHour / 60) ) )
const pointsPercentage = ( goal, points ) => ( (points * 100) / goal ).toFixed(2);
const hasScore = ( issue ) => issue.pontuation > 0 && isClassified(issue.type)
const scoredIssues = ( issues ) => issues.filter( issue => hasScore( issue ) )

module.exports = {
    countIssuesByType,
    countIssuesByDifficulty,
    sumPontuation,
    sumTime,
    hasScore,
    scoredIssues,
    minutesToPoints,
    pointsPercentage
}