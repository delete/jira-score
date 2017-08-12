const messages = require('../messages')
const emitter = require('../eventBus')
const { crud } = require('../../src/db')

const loginIsNeeded = ( channel ) => emitter.emit('SEND', messages('USER_NEEDED'), channel )

const loadIssues = (  message, event ) => {

    const { user , channel } = message
    const player = { slackId: user }
    const month = 'aug'
    
    // Must reload the database to get the new values
    crud.db.loadDatabase(function (err) {
    	if ( err ) throw err

	    crud.findOne( player, (err, doc) => 
	        doc ? emitter.emit(event, message, doc ) : loginIsNeeded( channel) )  
	});
}

emitter.on( 'LOAD_ISSUES', loadIssues )
console.log('middleware LOAD_ISSUES')