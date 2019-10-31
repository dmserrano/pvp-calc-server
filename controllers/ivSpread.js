const { getBatchIvSpreads } = require("../services/ivSpread");

const handleGetIvSpread = async ({ query }, res) => {
    try {
        const response = await getBatchIvSpreads(query);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
    handleGetIvSpread,
};
