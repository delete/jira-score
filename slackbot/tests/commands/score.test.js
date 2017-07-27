const emitter = require('../../eventBus')
const mockIssues = require('../fixtures/issues')
const { ONE_THIRD, LESS_HALF, MORE_HALF, COMPLETED } = require('../../messages/types')
const score = require('../../commands/score')

describe('Score command Must emit an event and data object', () => {
  
    describe('score command', () => {  
        it('should emit an "SEND"', ( ) => {
            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            const message = {}
            const issues = []
            score( message, issues )

            expect(eventSpy).toBeCalled()
        })

        it('should emit an "SEND" wit some message and channel', ( ) => {
            const message = {
                text: 'help me',
                channel: 'aaa',
                user: '1234'
            }
            const expectedResponse = [
                /.*\*600 minutos\* de atendimento.*/,
                /.*\*210\* pontos.*/,
                /.*\*560\* pontos/,
                /.*completou \*15.87%\*/,
                /.*meta \*3528\* !.*/,
                /.*Faltam \*2968\* pontos.*/,
                /.*\*84.13%\* para bater a meta.*/,
            ]

            const eventSpy = jest.fn()
            emitter.on('SEND', eventSpy )

            score( message, mockIssues )

            expect(eventSpy).toBeCalled()

            // Both params are passing as only one, the first
            const [ actualResponse, channel ] = eventSpy.mock.calls[0]

            expectedResponse.map( (response) => expect( actualResponse ).toMatch( response ) )
            expect( channel ).toBe( message.channel );
        })
    })

    describe('score messages', () => {  
        // Goal is 35xx
        it('Must return one third kind of message', ( ) => {
            const issues = [
                {
                    key: 'TEST-1',
                    type: 'Programação',
                    time: 600,
                    difficulty: 'Muito simples',
                    pontuation: 30
                }
            ]
            testScoreMessage( ONE_THIRD, issues ) 
        })
        
        it('Must return less than half kind of message', ( ) => { 
                const issues = [
                {
                    key: 'TEST-1',
                    type: 'Programação',
                    time: 600,
                    difficulty: 'Muito simples',
                    pontuation: 1500
                }
            ]
            testScoreMessage( LESS_HALF, issues)
        })

        it('Must return more than half kind of message', ( ) => { 
                const issues = [
                {
                    key: 'TEST-1',
                    type: 'Programação',
                    time: 600,
                    difficulty: 'Muito simples',
                    pontuation: 2500
                }
            ]
            testScoreMessage( MORE_HALF, issues)
        })

        it('Must return completed kind of message', ( ) => { 
                const issues = [
                {
                    key: 'TEST-1',
                    type: 'Programação',
                    time: 600,
                    difficulty: 'Muito simples',
                    pontuation: 3600
                }
            ]
            testScoreMessage( COMPLETED, issues)
        })
    })
})


const testScoreMessage = ( messages, issues ) => {
    const message = {}
    const eventSpy = jest.fn()
    emitter.on('SEND', eventSpy )

    score( message, issues )

    const [ actualResponse, channel ] = eventSpy.mock.calls[0]
    const responseLines = actualResponse.split('\n')
    const lastLine = responseLines[ responseLines.length - 1 ]
    expect( messages ).toContain( lastLine );
}