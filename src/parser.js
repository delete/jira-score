'use strict'

const pontuations = require('./pontuations')

const getIssueKey = ( element ) => element.key
const getIssueDificulty = ( element ) => element.fields.customfield_17132.value
const getIssueType = ( element ) => element.fields.customfield_21711
const getCustomerServiceTime = ( element ) => element.fields.timespent

const countIssuesByType = ( issues, type ) => issues.reduce( (total, issue ) => issue.type === type ? total + 1 : total, 0 )
const countIssuesByDifficulty = ( issues, difficulty ) => issues.reduce( (total, issue ) => issue.difficulty === difficulty && canClassify(issue.type) ? total + 1 : total, 0 )
const sumPontuation = ( issues ) => issues.reduce( (total, issue ) => canClassify(issue.type) ? total + pontuations(issue.difficulty).points : total, 0 )
const sumTime = ( issues, type ) => issues.reduce( (total, issue ) => issue.type === type ? total + issue.time : total, 0 )

const formatDificultyString = ( rawString ) => {
    const stringSplitted = rawString.split('-')
    return stringSplitted[ stringSplitted.length - 1 ].trim()
}

const getIssueInfo = ( obj ) =>  {
    const key = getIssueKey( obj )
    const type = getIssueType( obj )
    const customerServiceTime = getCustomerServiceTime( obj )
    const difficulty = getIssueDificulty( obj )
    return {
        key,
        type,
        time: customerServiceTime ? (customerServiceTime / 60) : 0,
        difficulty: formatDificultyString(difficulty)
    }
}

const canClassify = ( issueType ) => (issueType === 'Programação' || issueType === 'Teste')
const hasScore = ( issue ) => issue.pontuation > 0 && canClassify(issue.type)

const parser = ( body ) => {
    const issues = body.issues.map(function(issue) {
        const newIssue = getIssueInfo( issue )

        if ( newIssue.difficulty && canClassify(newIssue.type) ) {
            const issueScored = pontuations(newIssue.difficulty)
            newIssue.pontuation = issueScored.points
        } else {
            newIssue.pontuation = 0
        }

        return newIssue
    })
    
	const scoredIssues = issues.filter( issue => hasScore(issue) )
    const totalcustomerService = countIssuesByType( issues, 'Atendimento' )
    const totalPontuation = sumPontuation( issues )
    const totalCustomerServiceTime = sumTime( issues, 'Atendimento' ) 
    
	const totalIssuesByDifficulty = {
        notClassified: countIssuesByDifficulty( issues, 'Não classificado'),
        verySimple: countIssuesByDifficulty( issues, 'Muito simples'),
        simple: countIssuesByDifficulty( issues, 'Simples'),
        medium: countIssuesByDifficulty( issues, 'Média'),
        hard: countIssuesByDifficulty( issues, 'Difícil'),
        veryHard: countIssuesByDifficulty( issues, 'Muito difícil')
    }
    
    return {
        total: () => issues.length,
        pontuation: () => totalPontuation,
        issues: () => issues,
        scored: () => scoredIssues.length,
        scoredIssues: () => scoredIssues,
        customerService: () => totalcustomerService,
        customerServiceTime: () => totalCustomerServiceTime,
        totalIssuesByDifficulty: totalIssuesByDifficulty
    }
}

module.exports = parser
