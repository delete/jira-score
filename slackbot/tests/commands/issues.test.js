const emitter = require('../../eventBus')
const mockIssues = require('../fixtures/issues')
const issuesCommand = require('../../commands/issues')

describe('Score command Must emit an event and data object', () => {
  
    describe('issues command', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            const message = {}
            const issues = []
            issuesCommand( message, issues )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some message and data', ( ) => {
            const message = {
                text: 'help me',
                channel: 'aaa',
                user: '1234'
            }
            const expectedResponse = [
                /.*Muito simples: \*3\*.*/,
                /.*Simples: \*2\*.*/,
                /.*Muito simples: \*3\*.*/,
                /.*Médias: \*0\*.*/,
                /.*Difíceis: \*1\*.*/,
                /.*Muito díficeis: \*0\*.*/,
                /.*Atendimento: \*1\*.*/,
                /.*Atendimento: \*600 minutos\* - 210 pontos.*/,
                /feitas: \*8\*/
            ]

            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            issuesCommand( message, mockIssues )

            expect(eventSpy).toBeCalled()

            // Both params are passing as only one, the first
            const [ actualResponse, channel ] = eventSpy.mock.calls[0]

            expectedResponse.map( (response) => expect( actualResponse ).toMatch( response ) )
            expect( channel ).toBe( message.channel );
        })
    })
})