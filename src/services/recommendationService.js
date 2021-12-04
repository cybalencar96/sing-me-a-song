import * as recommendationRepo from '../repositories/recommendationRepo.js';
import NotFound from '../errors/NotFound.js';
import { getRandomInt, successMessage } from '../utils/sharedFunctions.js'; 

async function post({ name, youtubeLink }) {
    const recommendation = await recommendationRepo.insert({ name, youtubeLink });

    return successMessage({ content: recommendation });
}

async function vote({ type, id }) {
    const recommendation = await recommendationRepo.vote({ type, id });

    if (!recommendation) {
        throw new NotFound('recommendation not found');
    }

    const hated = recommendation.score < -5;

    if (hated) {
        await recommendationRepo.remove({ id });
    }

    const text = hated ? 'score below -5, recommendation excluded' : '';
    const content = hated ? null : recommendation;

    return successMessage({ content, text });
}

async function getRandom() {
    const allRecommendations = await recommendationRepo.get();
    
    if (allRecommendations.length === 0) {
        throw new NotFound('there are no recommendations available')
    }

    const goodRec = allRecommendations.filter(recommendation => recommendation.score > 10);
    const badRec = allRecommendations.filter(recommendation => recommendation.score <= 10);

    if (!goodRec.length || !badRec.length) {
        const hundredPecentRecommendation = goodRec.length === 0 ? badRec : goodRec;
        const randomIndex = getRandomInt(0, hundredPecentRecommendation.length - 1);

        return hundredPecentRecommendation[randomIndex];
    }

    const recommendationType = (Math.random() - 0.3) >= 0 ? 'good' : 'bad'; // 70% de ser positivo, 30% de ser negativo
    const possibleRecommendations = recommendationType === 'good' ? goodRec : badRec 

    const randomIndex = getRandomInt(0, possibleRecommendations.length - 1);

    return possibleRecommendations[randomIndex];
}

export {
    post,
    vote,
    getRandom,
}