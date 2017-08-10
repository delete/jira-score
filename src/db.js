const Datastore = require('nedb')
const db = new Datastore({ filename: './datafile', autoload: true });


const save = ( object, callback ) => db.insert( object, callback )
const find = ( query, callback ) => db.find( query, callback )
const remove = ( query, callback ) => db.remove( query, {}, callback )
const update = ( query, update, options, callback ) => db.update( query, update, options, callback )
const count = ( query, callback ) => db.count( query, callback )

const monthField = ({ month, field, value }) => ({ $set: { [`months.${month}.${field}`]: value } })
const updateIssuesQuery = ( month, issues )=> monthField({ month, field: 'issues', value: issues })

const updatePlayer = player => {
    const updatemonthField = ( month, fieldValue, callback )=> 
        update( player, monthField({month, fieldValue }) , {}, callback )

    const updateIssuesOn = ( month, newIssues, callback ) => 
        update( player, updateIssuesQuery( month, newIssues ) , {}, callback )
    
    return {
        updatemonthField,
        updateIssuesOn
    }
}

module.exports = {
    crud: {
        save,
        find,
        remove,
        update,
        count
    },
    updatePlayer
}

// const player = {
//         slackIid: '123465',
//         username: 'fellipe.user', // username da empresa
//         channel: 'a1', // canal do slack 
//         updated: new Date(), //timestamp da ultima atualização no jira
//         isAdmin: true, // bool
//         months: {
//             ago: {
//                 issues: [ {
//                     key: '132',
//                     type: 'Atendimento',
//                     time: 60,
//                     difficulty: 'Simples'
//                 }], // objectos com informações das issues
//                 goal: 2000, // meta mensal
//                 workdays: 23, // dias de trabalho
//                 pointsPerHour: 21 // pontos por hora
//             } // os 12 meses ?
//         }        
// }

// const newIssues = [{
//         key: '132',
//         type: 'Atendimento',
//         time: 60,
//         difficulty: 'Simples'
//     },
//     {
//         key: '133',
//         type: 'Atendimento',
//         time: 60,
//         difficulty: 'Simples'
//     },
//     {
//         key: '134',
//         type: 'Atendimento',
//         time: 60,
//         difficulty: 'Simples'
//     }
// ]

// const msg = msg => console.log(`${msg} \n\n`)

// save( player, (err, newDoc) =>  msg('saved') )

// const myPlayer = { slackIid: '123465' }

// updateIssuesOn( myPlayer, 'ago', [], () => msg('updated') )

// find( myPlayer, (err, doc) => doc ? msg(doc.months.ago.issues.length)  : msg('not found') )

// updateIssuesOn( myPlayer, 'ago',  newIssues, () => msg('updated') )

// // remove( myPlayer, (err, numRemoved) => numRemoved ? msg(numRemoved)  : msg('not removed') )

// find( myPlayer, (err, doc) => doc ? msg(doc.months.ago.issues.length)  : msg('not found') )

