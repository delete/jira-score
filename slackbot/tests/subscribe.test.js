const subscribe = require('../subscribe')
const patterns  = require('../response/patterns')

describe('Regex patterns: goodMorning', () => {
    test('Must run a callback when a right pattern string is sent"', () => {
        const message = {
            text: 'Olá bom dia.',
            channel: 'a1a1a1'
        }
        const pattern = patterns.GOOD_MORNING
        
        const senderMock = jest.fn()
        senderMock.mockReturnValueOnce('Bom dia')
        
        const callbackMock = jest.fn()
        callbackMock.mockReturnValueOnce('Bom dia')

        const runOn = subscribe( message, senderMock )

        const expected = 'Bom dia'
        const result = runOn( pattern, callbackMock )
        
        expect(callbackMock).toBeCalled();
        expect(senderMock).toBeCalledWith(expected, message.channel);
    })

    test('Must NOT run a callback when a wrong pattern string is sent"', () => {
        const message = {
            text: 'Olá bom noite.',
            channel: 'a1a1a1'
        }
        const pattern = patterns.GOOD_MORNING
        
        const senderMock = jest.fn()
        senderMock.mockReturnValueOnce('Bom dia')
        
        const callbackMock = jest.fn()
        callbackMock.mockReturnValueOnce('Bom dia')

        const runOn = subscribe( message, senderMock )

        const expected = 'Bom dia'
        const result = runOn( pattern, callbackMock )
        
        expect(callbackMock).not.toBeCalled();
        expect(senderMock).not.toBeCalledWith(expected, message.channel);
    })
})

describe('String pattern: teste', () => {
    test('Must run a callback when a right string is sent"', () => {
        const message = {
            text: 'teste',
            channel: 'a1a1a1'
        }
        const pattern = 'teste'
        
        const senderMock = jest.fn()
        senderMock.mockReturnValueOnce('This was a test!')
        
        const callbackMock = jest.fn()
        callbackMock.mockReturnValueOnce('This was a test!')

        const runOn = subscribe( message, senderMock )

        const expected = 'This was a test!'
        const result = runOn( pattern, callbackMock )
        
        expect(callbackMock).toBeCalled();
        expect(senderMock).toBeCalledWith(expected, message.channel);
    })

    test('Must NOT run a callback when a wrong string is sent"', () => {
        const message = {
            text: 'testEE',
            channel: 'a1a1a1'
        }
        const pattern = 'teste'
        
        const senderMock = jest.fn()
        senderMock.mockReturnValueOnce('This was a test!')
        
        const callbackMock = jest.fn()
        callbackMock.mockReturnValueOnce('This was a test!')

        const runOn = subscribe( message, senderMock )

        const expected = 'This was a test!'
        const result = runOn( pattern, callbackMock )
        
        expect(callbackMock).not.toBeCalled();
        expect(senderMock).not.toBeCalledWith(expected, message.channel);
    })
})