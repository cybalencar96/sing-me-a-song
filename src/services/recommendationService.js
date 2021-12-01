import * as recommendationRepo from '../repositories/recommendationRepo.js';

const successMessage = (messageContent = {}) => { 
    const { content = null, text = 'success' } = messageContent;

    return { done: true, content, text };
};

const errorMessage = (messageContent = {}) => { 
    const { content = null, text = 'something went wrong' } = messageContent;

    return { done: false, content, text };
};

async function post({ name, youtubeLink }) {
    const recommendation = await recommendationRepo.insert({ name, youtubeLink });
    
    if (!recommendation) {
        return errorMessage();
    }

    return successMessage({ content: recommendation });
}

async function vote({ type, id }) {
    const recommendation = await recommendationRepo.vote({ type, id });

    if (!recommendation) {
        return errorMessage({ text: 'recommendation not found' });
    }

    const hated = recommendation.score < -5;

    if (hated) {
        await recommendationRepo.remove({ id });
    }

    const text = hated ? 'score below -5, recommendation excluded' : '';
    const content = hated ? null : recommendation;

    return successMessage({ content, text });
}


export {
    post,
    vote,
}