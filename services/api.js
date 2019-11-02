const request = require("request-promise");

const getRequest = async (url = "", options = {}) => {
    const response = await request(url, options);
    return JSON.parse(response);
};

module.exports = {
    getRequest,
};
