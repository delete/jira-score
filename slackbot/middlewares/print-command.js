const emitter = require('../eventBus')
const { crud } = require('../../src/db')

const printCommand = (  message ) => {
    const { user , text } = message
    const player = { slackId: user }
    
    crud.findOne( player, (err, doc) => {
    	const username = doc ? doc.username : user
    	console.log(`${username} runs -> ${text}`)
    })
}

emitter.on( 'PRINT_COMMAND', printCommand )
console.log('middleware PRINT_COMMAND')