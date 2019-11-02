const { getGameData, getLeagueRankings } = require("../services/pvppoke");

const handleGetAllPokemon = async (req, res) => {
    try {
        const { pokemon } = await getGameData();
        res.json(pokemon);
    } catch (error) {
        res.status(500).json("Could not fetch Pokemon");
    }
};

const handleGetLeagueRankings = async ({ query }, res) => {
    try {
        const response = await getLeagueRankings(query);
        res.json(response);
    } catch (error) {
        res.status(500).json("Could not fetch League Rankings");
    }
};

module.exports = {
    handleGetAllPokemon,
    handleGetLeagueRankings,
};
