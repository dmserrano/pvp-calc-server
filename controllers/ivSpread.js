const { getIvSpread } = require("../services/ivSpread");

const handleGetIvSpread = async ({ query }, res) => {
    try {
        const response = await getIvSpread(query);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
    handleGetIvSpread,
};
