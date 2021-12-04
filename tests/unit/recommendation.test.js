import '../../src/setup.js';
import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepo from '../../src/repositories/recommendationRepo.js';
import * as sharedFunctions from '../../src/utils/sharedFunctions.js';
import NotFound from '../../src/errors/NotFound.js';

const sut = recommendationService;

const mockRandomInt = jest.spyOn(sharedFunctions, 'getRandomInt');
const mockMathRandom = jest.spyOn(global.Math, 'random');

const mockRecommendationRepo = {
    insert: () => jest.spyOn(recommendationRepo, 'insert'),
    vote: () => jest.spyOn(recommendationRepo, 'vote'),
    remove: () => jest.spyOn(recommendationRepo, 'remove'),
    get: () => jest.spyOn(recommendationRepo, 'get'),
}

describe('unit RECOMMENDATION ENTITY', () => {
    const successMessage = ({ noContent = false, score = 1 } = {}) => ({
        done: true,
        text: expect.any(String),
        content: noContent ? null : mockRecommendation({ score }),
    })

    const errorMessage = {
        done: false,
        text: expect.any(String),
        content: null
    }

    const mockRecommendation = ({ score = 1 } = {}) => ({ score: score });

    beforeEach(() => {
        mockRecommendationRepo.insert().mockReset();
        mockRecommendationRepo.vote().mockReset();
        mockRecommendationRepo.remove().mockReset();
        mockRecommendationRepo.get().mockReset();
        mockRandomInt.mockReset();
    });


    test('should return successMessage when object inserted', async () => {
        mockRecommendationRepo.insert().mockReturnValueOnce(mockRecommendation());

        const result = await sut.post({});
        
        expect(result).toEqual(successMessage());
    });

    test('should return errorMessage when object not upvoted', async () => {
        mockRecommendationRepo.vote().mockReturnValueOnce(undefined);

        const promise = sut.vote({})

        await expect(promise).rejects.toThrowError(NotFound); // rejects for async functions
    });

    test('should return successMessage with content when downvoted', async () => {
        mockRecommendationRepo.vote().mockReturnValueOnce(mockRecommendation({ score: -5 }));
        mockRecommendationRepo.remove().mockImplementationOnce(() => {});

        const result = await sut.vote({});

        expect(result).toEqual(successMessage({ score: -5 }));
    });

    test('should return successMessage with empty content when downvoted and excluded', async () => {
        mockRecommendationRepo.vote().mockReturnValueOnce({ score: -6 });
        mockRecommendationRepo.remove().mockImplementationOnce(() => {});

        const result = await sut.vote({});

        expect(result).toEqual(successMessage({ noContent: true }));
    });

    test('should throw error when empty recommendations', async () => {
        mockRecommendationRepo.get().mockReturnValueOnce([]);

        const promise = sut.getRandom();
        
        await expect(promise).rejects.toThrowError(NotFound);
    });

    

    test('should return 100% chance of good recommendations', async () => {
        mockRecommendationRepo.get().mockReturnValueOnce([{id: 0, score: 20 }, {id: 1, score: 20 }]);
        mockRandomInt.mockReturnValueOnce(1);

        const result = await sut.getRandom();

        const expected = { id: 1, score: 20 };
        expect(result).toEqual(expected);
    });

    test('should return 100% chance of bad recommendations', async () => {
        mockRecommendationRepo.get().mockReturnValueOnce([{id: 0, score: 1 }, {id: 1, score: 2 }]);
        mockRandomInt.mockReturnValueOnce(1);

        const result = await sut.getRandom();

        const expected = { id: 1, score: 2 };
        expect(result).toEqual(expected);
    });

    test('should return a good recommendation', async () => {
        mockMathRandom.mockReturnValueOnce(0.7);
        mockRandomInt.mockReturnValueOnce(1);
        mockRecommendationRepo.get().mockReturnValueOnce([
            {id: 0, score: 1 }, 
            {id: 1, score: 20 },
            {id: 2, score: 21 },
        ]);
        
        const result = await sut.getRandom();

        const expected = { id: 2, score: 21 };
        expect(result).toEqual(expected);
    });

    test('should return a bad recommendation', async () => {
        mockMathRandom.mockReturnValueOnce(0.2);
        mockRandomInt.mockReturnValueOnce(0);
        mockRecommendationRepo.get().mockReturnValueOnce([
            {id: 0, score: 1 }, 
            {id: 1, score: 20 },
            {id: 2, score: 21 },
        ]);
        
        const result = await sut.getRandom();

        const expected = { id: 0, score: 1 };
        expect(result).toEqual(expected);
    });
});
