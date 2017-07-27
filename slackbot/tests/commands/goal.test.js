const emitter = require('../../eventBus')
const mockIssues = require('../fixtures/issues')
const goal = require('../../commands/goal')

describe('Score command Must emit an event and data object', () => {
  
    describe('goal command', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            const message = {}
            const issues = []
            goal( message, issues )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some message and channel', ( ) => {
            const message = {
                text: 'help me',
                channel: 'aaa',
                user: '1234'
            }
            const expectedResponse = [
                /.*\*168\/dia.*/,
                /.*\*31\/dia.*/
            ]

            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            goal( message, mockIssues )

            expect(eventSpy).toBeCalled()

            // Both params are passing as only one, the first
            const [ actualResponse, channel ] = eventSpy.mock.calls[0]

            expectedResponse.map( (response) => expect( actualResponse ).toMatch( response ) )
            expect( channel ).toBe( message.channel );
        })
    })
})