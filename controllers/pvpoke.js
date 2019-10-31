const { getGameData, getLeagueRankings } = require("../services/pvppoke");

const handleGetAllPokemon = async (req, res) => {
    try {
        const { pokemon } = await getGameData();
        res.json(pokemon);
    } catch (error) {
        res.json({ error: error.message });
    }
};

const handleGetLeagueRankings = async ({ query }, res) => {
    try {
        const response = await getLeagueRankings(query);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
    handleGetAllPokemon,
    handleGetLeagueRankings,
};
