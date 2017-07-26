const messages = require('../messages')
const emitter = require('../eventBus');

emitter.on(
    'MY_SELF', 
    message => emitter.emit('SEND', messages('MY_SELF'), message.channel )
)
console.log('on MY_SELF')