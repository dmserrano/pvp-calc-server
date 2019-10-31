const { getOrderedEvolutionChain } = require("../services/pokeApi");

const handleGetEvolutionChain = async ({
    params: {
        pokedexNumber = "1",
    },
}, res) => {
    try {
        const response = await getOrderedEvolutionChain(pokedexNumber);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
    handleGetEvolutionChain,
};
