import * as schemas from '../schemas/recommendation.js';
import * as recommendationService from '../services/recommendationService.js';

async function postRecommendation(req, res) {
    const {
        name,
        youtubeLink,
    } = req.body;

    const bodyError = schemas.postRecommendation.validate({ name, youtubeLink }).error;
    if (bodyError) {
        return res.status(400).send(bodyError.details[0].message);
    }

    try {
        const { done, content } = await recommendationService.post({ name, youtubeLink });

        if (!done) {
            return res.sendStatus(400)
        }

        res.status(200).send(content);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
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
            const { done, content, text } = await recommendationService.vote({ type, id });
    
            if (!done) {
                return res.status(400).send(text);
            }

            res.status(200).send(content && content);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}

async function getRecommendation() {
    console.log('ooi');
}

export {
    postRecommendation,
    vote,
    getRecommendation,
};
