const messages = require('../messages')
const emitter = require('../eventBus')

emitter.on(
    'GOOD_MORNING', 
    message => emitter.emit('SEND', messages('GOOD_MORNING'), message.channel )
)
console.log('on GOOD_MORNING')