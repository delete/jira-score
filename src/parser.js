'use strict'

const cheerio = require('cheerio')
const pontuations = require('./pontuations')
const { timeStringToMinutes } = require('./utils.js')

const filterElementDOM = ( element, toFilter ) => element.filter(toFilter).text().trim()
const getIssueKey = ( element ) => filterElementDOM(element, '.issuekey')
const getIssueDificulty = ( element ) => filterElementDOM(element, '.customfield_17132')
const getIssueType = ( element ) => filterElementDOM(element, '.customfield_21711')
const getCustomerServiceTime = ( element ) => filterElementDOM(element, '.timespent')

const countIssuesByType = ( issues, type ) => issues.reduce( (total, issue ) => issue.type === type ? total + 1 : total, 0 )
const countIssuesByDifficulty = ( issues, difficulty ) => issues.reduce( (total, issue ) => issue.difficulty === difficulty && canClassify(issue.type) ? total + 1 : total, 0 )
const sumPontuation = ( issues ) => issues.reduce( (total, issue ) => canClassify(issue.type) ? total + pontuations(issue.difficulty).points : total, 0 )
const sumTime = ( issues, type ) => issues.reduce( (total, issue ) => issue.type === type ? total + issue.time : total, 0 )

const formatDificultyString = ( rawString ) => {
    const stringSplitted = rawString.split('-')
    return stringSplitted[ stringSplitted.length - 1 ].trim()
}

const getIssueInfoFromRow = ( row ) =>  {
    const children = row.children()
    const key = getIssueKey(children)
    const type = getIssueType(children)
    const customerServiceTime = getCustomerServiceTime(children)
    const difficulty = getIssueDificulty(children)
    
    return {
        key,
        type,
        time: timeStringToMinutes(customerServiceTime),
        difficulty: formatDificultyString(difficulty)
    }
}

const canClassify = ( issueType ) => (issueType === 'Programação' || issueType === 'Teste')
const hasScore = ( issue ) => issue.pontuation > 0 && canClassify(issue.type)

const parser = ( body ) => {
    const $ = cheerio.load( body )
    const tableBody = $('#issuetable tbody tr')

    const allIssues = tableBody.map(function() {
        const issue = getIssueInfoFromRow( $(this) )

        if ( issue.difficulty && canClassify(issue.type) ) {
            const issueScored = pontuations(issue.difficulty)
            issue.pontuation = issueScored.points
        } else {
            issue.pontuation = 0
        }
        
        return issue
    }).get()
    
    const scoredIssues = allIssues.filter( issue => hasScore(issue) )
    
    const totalcustomerService = countIssuesByType(allIssues, 'Atendimento')

    const totalPontuation = sumPontuation( allIssues )
    const totalCustomerServiceTime = sumTime( allIssues, 'Atendimento' ) 
    const issuesFromPagination = parseInt($('.results-count-total').first().text())

    const totalIssuesByDifficulty = {
        notClassified: countIssuesByDifficulty( allIssues, 'Não classificado'),
        verySimple: countIssuesByDifficulty( allIssues, 'Muito simples'),
        simple: countIssuesByDifficulty( allIssues, 'Simples'),
        medium: countIssuesByDifficulty( allIssues, 'Média'),
        hard: countIssuesByDifficulty( allIssues, 'Difícil'),
        veryHard: countIssuesByDifficulty( allIssues, 'Muito difícil')
    }

    return {
        total: () => allIssues.length,
        pontuation: () => totalPontuation,
        issues: () => allIssues,
        scored: () => scoredIssues.length,
        scoredIssues: () => scoredIssues,
        customerService: () => totalcustomerService,
        customerServiceTime: () => totalCustomerServiceTime,
        pagination: () => issuesFromPagination,
        totalIssuesByDifficulty: totalIssuesByDifficulty
    }
}

module.exports = parser
