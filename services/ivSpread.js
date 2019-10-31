const { getRequest } = require("./api");
const { calculateCosts } = require("./calculateCosts");
const { IV_SPREAD_API_URL, IV_SPREAD_API_OPTIONS } = require("../constants/api");

const getIvSpread = async ({
    level = undefined,
    ivs = "",
    pokemon = "",
}) => {
    const options = { ...IV_SPREAD_API_OPTIONS, qs: { pokemon, ivs, level } };
    const {
        cp: targetCp,
        level: targetLevel,
        ranks,
    } = await getRequest(IV_SPREAD_API_URL, options);

    if (level && level > targetLevel) return null;

    return {
        costs: calculateCosts(level, targetLevel),
        ranks,
        targetCp,
        targetLevel,
    };
};

module.exports = {
    getIvSpread,
};
