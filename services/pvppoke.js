const { getRequest } = require("./api");
const { PVPOKE_API_URL, PVPOKE_API_OPTIONS } = require("../constants/api");

const getGameData = async () => {
    const requestUrl = `${PVPOKE_API_URL}/gamemaster.json`;
    const response = await getRequest(requestUrl, PVPOKE_API_OPTIONS);

    return response;
};

const getLeagueRankings = async ({
    category = "all",
    league = "1500",
    role = "overall",
}) => {
    const requestUrl = `${PVPOKE_API_URL}/${category}/${role}/rankings-${league}.json`;
    const response = await getRequest(requestUrl, PVPOKE_API_OPTIONS);

    return response;
};

module.exports = {
    getGameData,
    getLeagueRankings,
};
