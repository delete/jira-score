const messages = require('../messages')
const emitter = require('../eventBus')

const mySelf = message => emitter.emit('SEND', messages('MY_SELF'), message.channel )

console.log('on MY_SELF')
module.exports = mySelf