import * as schemas from '../schemas/recommendation.js';

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
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getRecommendation() {
    console.log('ooi');
}

export {
    postRecommendation,
    getRecommendation,
};
