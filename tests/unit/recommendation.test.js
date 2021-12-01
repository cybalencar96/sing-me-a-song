import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepo from '../../src/repositories/recommendationRepo.js';

const sut = recommendationService;
const mockPostRecommendationRepo = jest.spyOn(recommendationRepo, 'insert');

describe('unit RECOMMENDATION ENTITY', () => {
    beforeEach(() => {
        mockPostRecommendationRepo.mockReset();
    });

    describe('post recommendation', () => {

        test('should return done = true when object inserted', async () => {
            mockPostRecommendationRepo.mockReturnValueOnce({});

            const { done } = await sut.post({});
            
            expect(done).toBeTruthy();
        });

        test('should return done = false when object not inserted', async () => {
            mockPostRecommendationRepo.mockReturnValueOnce(undefined);

            const { done } = await sut.post({});

            expect(done).toBeFalsy();
        });
    });
});
