import {isEquals} from './utils'

test('it compare two same object and return true', () => {
    expect(isEquals({test:'test'},{test:'test'})).toBeTruthy()
});
test('it compare two different object and return false', () => {
    expect(isEquals({test:'test'},{test:'test', test2:'test'})).toBeFalsy()
});
test('it finds that one of the comparisons are not object and throws error',() => {
    expect(()=>isEquals({test:'test'},'')).toThrowError(new Error('The provided comparison sides are not objects'))
});