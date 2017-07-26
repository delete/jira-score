const subscribe = require('../subscribe')
const patterns  = require('../response/patterns')

describe('Regex patterns: goodMorning', () => {
    test('Must run a callback when a right pattern string is sent"', () => {
        const message = {
            text: 'Olá bom dia.',
            channel: 'a1a1a1'
        }
        const pattern = patterns.GOOD_MORNING
        
        const callbackMock = jest.fn()
        callbackMock.mockReturnValueOnce('Bom dia')

        const runOn = subscribe( {message} )

        const expected = 'Bom dia'
        
        runOn( pattern, callbackMock )
        
        expect(callbackMock).toBeCalled();
        expect(callbackMock).toBeCalledWith( message, null );
    })

    test('Must NOT run a callback when a wrong pattern string is sent"', () => {
        const message = {
            text: 'Olá bom noite.',
            channel: 'a1a1a1'
        }
        const pattern = patterns.GOOD_MORNING
        
        const callbackMock = jest.fn()
        callbackMock.mockReturnValueOnce('Bom dia')

        const runOn = subscribe( {message} )

        const expected = 'Bom dia'
        
        runOn( pattern, callbackMock )
        
        expect(callbackMock).not.toBeCalled();
        expect(callbackMock).not.toBeCalledWith( message );
    })
})

describe('String pattern: teste', () => {
    test('Must run a callback when a right string is sent"', () => {
        const message = {
            text: 'teste',
            channel: 'a1a1a1'
        }
        const pattern = 'teste'

        const callbackMock = jest.fn()
        callbackMock.mockReturnValueOnce('This was a test!')

        const runOn = subscribe( {message} )

        const expected = 'This was a test!'
        
        runOn( pattern, callbackMock )
        
        expect(callbackMock).toBeCalled();
        expect(callbackMock).toBeCalledWith( message, null );
    })

    test('Must NOT run a callback when a wrong string is sent"', () => {
        const message = {
            text: 'testEE',
            channel: 'a1a1a1'
        }
        const pattern = 'teste'

        const callbackMock = jest.fn()
        callbackMock.mockReturnValueOnce('This was a test!')

        const runOn = subscribe( {message} )

        const expected = 'This was a test!'
        
        runOn( pattern, callbackMock )
        
        expect( callbackMock ).not.toBeCalled();
        expect( callbackMock ).not.toBeCalledWith( message );
    })
})