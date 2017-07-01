const pontuations = require('../src/pontuations')


test('"Muito simples" must return 30', () => {
    const payload = 'Muito simples'
    const expected = 30
    
    const result = pontuations(payload).points
    expect(result).toBe(expected);
});

test('"Simples" must return 75', () => {
    const payload = 'Simples'
    const expected = 75
    
    const result = pontuations(payload).points
    expect(result).toBe(expected);
});

test('"Média" must return 160', () => {
    const payload = 'Média'
    const expected = 160
    
    const result = pontuations(payload).points
    expect(result).toBe(expected);
});

test('"Difícil" must return 320', () => {
    const payload = 'Difícil'
    const expected = 320
    
    const result = pontuations(payload).points
    expect(result).toBe(expected);
});

test('"Muito difícil" must return 560', () => {
    const payload = 'Muito difícil'
    const expected = 560
    
    const result = pontuations(payload).points
    expect(result).toBe(expected);
});

test('"Anything" must return 30', () => {
    const payload = 'Anything'
    const expected = 30
    
    const result = pontuations(payload).points
    expect(result).toBe(expected);
});

