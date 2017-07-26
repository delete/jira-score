const messages = require('../messages')
const emitter = require('../eventBus')

const goodMorning = message => emitter.emit('SEND', messages('GOOD_MORNING'), message.channel )

console.log('on GOOD_MORNING')
module.exports = goodMorning