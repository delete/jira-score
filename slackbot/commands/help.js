const messages = require('../messages')
const emitter = require('../eventBus')

const help = message => emitter.emit('SEND', messages('HELP'), message.channel )

console.log('on HELP')
module.exports = help