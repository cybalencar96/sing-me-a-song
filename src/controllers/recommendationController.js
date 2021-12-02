import * as schemas from '../schemas/recommendation.js';
import * as recommendationService from '../services/recommendationService.js';
import NotFound from '../errors/NotFound.js';

async function post(req, res, next) {
    const {
        name,
        youtubeLink,
    } = req.body;

    const bodyError = schemas.postRecommendation.validate({ name, youtubeLink }).error;
    if (bodyError) {
        return res.status(400).send(bodyError.details[0].message);
    }

    try {
        const { content } = await recommendationService.post({ name, youtubeLink });

        res.status(200).send(content);
    } catch (error) {
        next(error)
    }
}

function vote(type) {
    return async (req, res) => {
        const { id } = req.params;

        const bodyError = schemas.voteRecommendation.validate({ id }).error;
        if (bodyError) {
            return res.status(400).send(bodyError.details[0].message);
        }
    
        try {
            const { content } = await recommendationService.vote({ type, id });

            res.status(200).send(content && content);
        } catch (error) {
            if (error instanceof NotFound) {
                return res.status(404).send(error.message);
            }

            next(error);
        }
    }
}

async function getRandom(req, res, next) {
    try {
        const recommendation = await recommendationService.getRandom();
        res.send(recommendation);
    } catch (error) {
        if (error instanceof NotFound) {
            return res.status(404).send(error.message);
        }
        
        next(error);
    }
}

export {
    post,
    vote,
    getRandom,
};
