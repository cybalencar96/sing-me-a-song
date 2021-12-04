import * as recommendationRepo from '../../../src/repositories/recommendationRepo.js';
import connection from '../../../src/connection.js';

const sut = recommendationRepo;
const mockConnection = jest.spyOn(connection, 'query');
const mockRecommendationObj = {
    rows: [{ id: 1, name: 'sla', youtubeLink: 'link', score: 0 }]
};

describe('unit test recommendation repository', () => {
    test('insert should return an recommendation object', async () => {
        mockConnection.mockReturnValueOnce(mockRecommendationObj);

        const result = await sut.insert({});

        expect(result).toEqual(mockRecommendationObj.rows[0])
    });

    test('vote should return an recommendation object', async () => {
        mockConnection.mockReturnValueOnce(mockRecommendationObj);

        const result = await sut.vote({type: 'up'});

        expect(result).toEqual(mockRecommendationObj.rows[0])
    });

    test('get should return an array of recommendation objects', async () => {
        mockConnection.mockReturnValueOnce(mockRecommendationObj);

        const result = await sut.get({});

        expect(result).toEqual(mockRecommendationObj.rows)
    });

    test('remove should return undefined', async () => {
        mockConnection.mockReturnValueOnce(mockRecommendationObj);

        const result = await sut.remove({});

        expect(result).toEqual(undefined)
    });
});