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
        res.status(500).json("Could not fetch Evolution Chain");
    }
};

module.exports = {
    handleGetEvolutionChain,
};
