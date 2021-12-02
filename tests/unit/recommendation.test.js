import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepo from '../../src/repositories/recommendationRepo.js';

const sut = recommendationService;

const mockRecommendationRepo = {
    insert: () => jest.spyOn(recommendationRepo, 'insert'),
    vote: () => jest.spyOn(recommendationRepo, 'vote'),
    remove: () => jest.spyOn(recommendationRepo, 'remove'),
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
    });

    describe('post recommendation', () => {
        test('should return successMessage when object inserted', async () => {
            mockRecommendationRepo.insert().mockReturnValueOnce(mockRecommendation());

            const result = await sut.post({});
            
            expect(result).toEqual(successMessage());
        });
    });

    describe('vote recommendation', () => {
        test('should return errorMessage when object not upvoted', async () => {
            mockRecommendationRepo.vote().mockReturnValueOnce(undefined);

            expect(() => sut.vote({})).rejects.toThrow('recommendation not found'); // rejects for async functions
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
    });
});
