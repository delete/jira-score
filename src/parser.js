'use strict'

const cheerio = require('cheerio')
const pontuations = require('./pontuations')
const { timeStringToMinutes } = require('./utils.js')

const filterElementDOM = ( element, toFilter ) => element.filter(toFilter).text().trim()
const getIssueKey = ( element ) => filterElementDOM(element, '.issuekey')
const getIssueDificulty = ( element ) => filterElementDOM(element, '.customfield_17132')
const getIssueType = ( element ) => filterElementDOM(element, '.customfield_21711')
const getCustomerServiceTime = ( element ) => filterElementDOM(element, '.timespent')

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
const hasScore = ( issue ) => issue.pontuation > 0

module.exports = ( body ) => {
    const $ = cheerio.load( body )
    const tableBody = $('#issuetable tbody tr')
    let totalPontuation = 0
    let totalcustomerService = 0
    let totalCustomerServiceTime = 0
    let totalNotClassified = 0
    let totalVerySimple = 0
    let totalSimple = 0
    let totalMedium = 0
    let totalHard = 0
    let totalVeryHard = 0
    const totalByDifficulty = ( slug ) => {
        const countIssue = {
                'NC': () => (totalNotClassified += 1),
                'VS': () => (totalVerySimple += 1),
                'S': () => (totalSimple += 1),
                'M': () => (totalMedium += 1),
                'H': () => (totalHard += 1),
                'VH': () => (totalVeryHard += 1)
            }
        return (countIssue[ slug ])()
    }
    const allIssues = []
    
    tableBody.each(function() {
        const issue = getIssueInfoFromRow( $(this) )

        if ( issue.type === 'Atendimento' ) {
            totalcustomerService += 1
            totalCustomerServiceTime += issue.time
        }

        if ( issue.difficulty && issue.type !== 'Atendimento' ) {
            let issueScored = pontuations(issue.difficulty)
            issue.pontuation = issueScored.points
            totalByDifficulty(issueScored.slug)
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
        scoredIssues: () => scoredIssues,
        customerService: () => totalcustomerService,
        customerServiceTime: () => totalCustomerServiceTime,
        notClassifiedIssues: () => totalNotClassified,
        verySimpleIssues: () => totalVerySimple,
        simpleIssues: () => totalSimple,
        mediumIssues: () => totalMedium,
        hardIssues: () => totalHard,
        veryHardIssues: () => totalVeryHard
    }
}
