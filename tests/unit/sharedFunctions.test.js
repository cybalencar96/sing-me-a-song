import '../../src/setup.js';
import * as sharedFunctions from '../../src/utils/sharedFunctions.js';

jest.spyOn(global.Math, 'floor').mockReturnValue(1)
jest.spyOn(global.Math, 'ceil').mockReturnValue(3)
jest.spyOn(global.Math, 'random').mockReturnValue(1)

const sut = sharedFunctions;

describe('shared functions', () => {
    test('should return success message', () => {
        const result = sut.successMessage();

        expect(result).toEqual({ done: true, content: null, text: 'success' });
    });

    test('should return success message with content and modified text', () => {
        const result = sut.successMessage({ content: {}, text: 'yay'});

        expect(result).toEqual({ done: true, content: {}, text: 'yay' });
    });

    test('should return random int', () => {
        const result = sut.getRandomInt(0,5);

        expect(result).toBe(4);
    });
});