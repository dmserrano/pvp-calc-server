const { getBatchIvSpreads } = require("../services/ivSpread");

const handleGetIvSpread = async ({ query }, res) => {
    try {
        const response = await getBatchIvSpreads(query);
        res.json(response);
    } catch (error) {
        console.log(error);

        res.status(500).json("Could not fetch IV and Cost stats.");
    }
};

module.exports = {
    handleGetIvSpread,
};
