import joi from 'joi';

const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;

const postRecommendation = joi.object({
    name: joi.string().max(255).required(),
    youtubeLink: joi.string().pattern(youtubeRegex).required(),
});

const voteRecommendation = joi.object({
    id: joi.number().min(1).required(),
});

const getRecommendation = joi.object({

});

export {
    postRecommendation,
    voteRecommendation,
    getRecommendation,
};
