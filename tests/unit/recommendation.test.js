import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepo from '../../src/repositories/recommendationRepo.js';

const sut = recommendationService;
const mockPostRecommendationRepo = jest.spyOn(recommendationRepo, 'insert');
const mockVoteRecommendationRepo = jest.spyOn(recommendationRepo, 'vote');
const mockRemoveRecommendationRepo = jest.spyOn(recommendationRepo, 'remove');

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
        mockPostRecommendationRepo.mockReset();
        mockVoteRecommendationRepo.mockReset();
        mockRemoveRecommendationRepo.mockReset();
    });

    describe('post recommendation', () => {
        test('should return errorMessage when object not inserted', async () => {
            mockPostRecommendationRepo.mockReturnValueOnce(undefined);

            const result = await sut.post({});

            expect(result).toEqual(errorMessage);
        });

        test('should return successMessage when object inserted', async () => {
            mockPostRecommendationRepo.mockReturnValueOnce(mockRecommendation());

            const result = await sut.post({});
            
            expect(result).toEqual(successMessage());
        });
    });

    describe('vote recommendation', () => {
        test('should return errorMessage when object not upvoted', async () => {
            mockVoteRecommendationRepo.mockReturnValueOnce(undefined);

            const result = await sut.vote({});

            expect(result).toEqual(errorMessage);
        });

        test('should return successMessage with content when downvoted', async () => {
            mockVoteRecommendationRepo.mockReturnValueOnce(mockRecommendation({ score: -5 }));
            mockRemoveRecommendationRepo.mockImplementationOnce(() => {});

            const result = await sut.vote({});

            expect(result).toEqual(successMessage({ score: -5 }));
        });

        test('should return successMessage with empty content when downvoted and excluded', async () => {
            mockVoteRecommendationRepo.mockReturnValueOnce({ score: -6 });
            mockRemoveRecommendationRepo.mockImplementationOnce(() => {});

            const result = await sut.vote({});

            expect(result).toEqual(successMessage({ noContent: true }));
        });
    });
});
