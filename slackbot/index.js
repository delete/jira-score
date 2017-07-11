const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const messages = require('./messages')

const bot_token = process.env.SLACK_BOT_TOKEN || ''
const rtm = new RtmClient(bot_token);

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    const msg = messages(message.text, message.user)
    if ( typeof(msg) != 'string' ) {
        msg.then((m) => rtm.sendMessage(m, message.channel) )
    } else {
        rtm.sendMessage(msg, message.channel)
    }
});

rtm.start()
