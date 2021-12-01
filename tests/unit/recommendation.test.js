import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepo from '../../src/repositories/recommendationRepo.js';

const sut = recommendationService;
const mockPostRecommendationRepo = jest.spyOn(recommendationRepo, 'insert');
const mockUpVoteRecommendationRepo = jest.spyOn(recommendationRepo, 'upVote');

describe('unit RECOMMENDATION ENTITY', () => {
    const successMessage = {
        done: true,
        text: expect.any(String),
        content: {},
    }

    const errorMessage = {
        done: false,
        text: expect.any(String),
        content: null
    }

    const mockRecommendation = {};

    beforeEach(() => {
        mockPostRecommendationRepo.mockReset();
        mockUpVoteRecommendationRepo.mockReset();
    });

    describe('post recommendation', () => {
        test('should return successMessage when object inserted', async () => {
            mockPostRecommendationRepo.mockReturnValueOnce(mockRecommendation);

            const result = await sut.post({});
            
            expect(result).toEqual(successMessage);
        });

        test('should return errorMessage when object not inserted', async () => {
            mockPostRecommendationRepo.mockReturnValueOnce(undefined);

            const result = await sut.post({});

            expect(result).toEqual(errorMessage);
        });
    });

    describe('upvote recommendation', () => {
        test('should return successMessage when object upvoted', async () => {
            mockPostRecommendationRepo.mockReturnValueOnce(mockRecommendation);

            const result = await sut.post({});
            
            expect(result).toEqual(successMessage);
        });

        test('should return errorMessage when object not upvoted', async () => {
            mockPostRecommendationRepo.mockReturnValueOnce(undefined);

            const result = await sut.post({});

            expect(result).toEqual(errorMessage);
        });
    });
});
