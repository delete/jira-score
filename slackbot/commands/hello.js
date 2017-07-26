const messages = require('../messages')
const emitter = require('../eventBus');

const sayHello = messages('HELLO')
emitter.on(
    'HELLO', 
    message => emitter.emit('SEND', sayHello( message.user ), message.channel )
)
console.log('on HELLO')