const emitter = require('../../../slackbot/eventBus')
const player = require('../../fixtures/player')
const goal = require('../../../slackbot/commands/goal')

describe('Score command Must emit an event and data object', () => {
  
    describe('goal command', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            const message = {}
            goal( message, player )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some message and channel', ( ) => {
            // Must be improved, passing the month as parameter to goal function
            const message = {
                text: 'help me',
                channel: 'aaa',
                user: '1234'
            }
            const expectedResponse = [
                /.*\*158\/dia.*/,
                /.*já com abono de 210 pontos de atendimento.*/
            ]

            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            goal( message, player )

            expect(eventSpy).toBeCalled()

            // Both params are passing as only one, the first
            const [ actualResponse, channel ] = eventSpy.mock.calls[0]

            expectedResponse.map( (response) => expect( actualResponse ).toMatch( response ) )
            expect( channel ).toBe( message.channel );
        })
    })
})