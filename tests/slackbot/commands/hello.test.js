const emitter = require('../../../slackbot/eventBus')
const { HELLO } = require('../../../slackbot/messages/types')

const hello = require('../../../slackbot/commands/hello')

describe('Hello command Must emit an event and data object', () => {
  
    describe('Hello command', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            hello( {} )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some message and data', ( ) => {
            const data = {
                text: 'olar',
                channel: 'aaa',
                user: '1234'
            }
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            hello( data )

            expect(eventSpy).toBeCalled()

            // Both params are passing as only one, the first
            const [ actualMessage, channel ] = eventSpy.mock.calls[0]

            // Mock mensagens with the same user as data object
            const helloMessages = HELLO.map( (h) => h( data.user ) )

            expect( helloMessages ).toContain( actualMessage );
            expect( channel ).toBe( data.channel );
        })
    })
})