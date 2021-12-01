import * as recommendationRepo from '../repositories/recommendationRepo.js';

async function post({ name, youtubeLink }) {
    const recommendation = await recommendationRepo.insert({ name, youtubeLink });
    if (!recommendation) {
        return errorMessage();
    }

    return successMessage(recommendation);
}

const successMessage = (content = null) => ({ done: true, content });
const errorMessage = (content = null) => ({ done: false, content });

export {
    post,
}