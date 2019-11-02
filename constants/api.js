const IV_SPREAD_API_URL = "https://ivservice.herokuapp.com/iv";
const IV_SPREAD_API_OPTIONS = {
    headers: { Accept: "application/json" },
};

const POKE_API_URL = "https://pokeapi.co/api/v2";

const PVPOKE_API_URL = "https://pvpoke.com/data";
const PVPOKE_API_OPTIONS = {
    qs: { v: "173" },
};

module.exports = {
    IV_SPREAD_API_OPTIONS,
    IV_SPREAD_API_URL,
    POKE_API_URL,
    PVPOKE_API_OPTIONS,
    PVPOKE_API_URL,
};
