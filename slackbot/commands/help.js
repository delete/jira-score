const messages = require('../messages')
const emitter = require('../eventBus');

emitter.on(
    'HELP', 
    message => emitter.emit('SEND', messages('HELP'), message.channel )
)
console.log('on HELP')