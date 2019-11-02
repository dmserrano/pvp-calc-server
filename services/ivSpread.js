const { getRequest } = require("./api");
const { calculateCosts } = require("./calculateCosts");
const { IV_SPREAD_API_URL, IV_SPREAD_API_OPTIONS } = require("../constants/api");

const getIvSpread = async ({
    level = "",
    ivs = "",
    pokemon = "",
}) => {
    const options = { ...IV_SPREAD_API_OPTIONS, qs: { pokemon, ivs } };
    const {
        cp: targetCp,
        level: targetLevel,
        ranks,
    } = await getRequest(IV_SPREAD_API_URL, options);

    if (level && level > targetLevel) return null;

    return {
        costs: calculateCosts(level || undefined, targetLevel),
        ranks,
        targetCp,
        targetLevel,
    };
};

const getBatchIvSpreads = async ({
    level = "",
    ivs = "",
    pokemon = "",
}) => {
    const pokemonList = pokemon.split(",");
    const actions = pokemonList.map(
        (pokemonName) => getIvSpread({ level, ivs, pokemon: pokemonName }),
    );
    const results = await Promise.all(actions);

    return results.reduce((accumulator, result, index) => {
        const pokemonName = pokemonList[index];
        accumulator[pokemonName] = result;
        return accumulator;
    }, {});
};

module.exports = {
    getBatchIvSpreads,
};
