'use strict'

const cheerio = require('cheerio')
const pontuations = require('./pontuations')

const filterElementDOM = ( element, toFilter ) => element.filter(toFilter).text().trim()
const getIssueKey = ( element ) => filterElementDOM(element, '.issuekey')
const getIssueDificulty = ( element ) => filterElementDOM(element, '.customfield_17132')

const formatDificultyString = ( rawString ) => {
    const stringSplitted = rawString.split('-')
    return stringSplitted[ stringSplitted.length - 1 ].trim()
}

const getIssueInfoFromRow = ( row ) =>  {
    const children = row.children()
    const key = getIssueKey(children)
    const difficulty = getIssueDificulty(children)
    
    return {
        key,
        difficulty: formatDificultyString(difficulty)
    }
}
const hasScore = issue => issue.pontuation > 0

module.exports = ( body ) => {
    const $ = cheerio.load( body )
    const tableBody = $('#issuetable tbody tr')
    let totalPontuation = 0
    const allIssues = []
    
    tableBody.each(function() {
        const issue = getIssueInfoFromRow( $(this) )

        if (issue.difficulty ) {
            issue.pontuation = pontuations(issue.difficulty)
        } else {
            issue.pontuation = 0
        }
        totalPontuation += issue.pontuation

        allIssues.push( issue )
    }) 
    
    const scoredIssues = allIssues.filter( issue => hasScore(issue) )

    return {
        total: () => allIssues.length,
        pontuation: () => totalPontuation,
        issues: () => allIssues,
        scored: () => scoredIssues.length,
        scoredIssues: () => scoredIssues
    }
}
