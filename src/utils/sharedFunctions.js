function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const successMessage = (messageContent = {}) => { 
    const { content = null, text = 'success' } = messageContent;

    return { done: true, content, text };
};

export {
    getRandomInt,
    successMessage,
}