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

async function upVote({ id }) {
    const recommendation = await recommendationRepo.upVote({ id });

    if (!recommendation) {
        return errorMessage({ text: 'recommendation not found' });
    }

    return successMessage({ content: recommendation })
}


export {
    post,
    upVote,
}