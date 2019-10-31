const { Router } = require("express");
const { handleGetAllPokemon, handleGetLeagueRankings } = require("../controllers/pvpoke");

const router = Router();

const ALL_POKEMON_ROUTE = {
    path: "/all-pokemon",
    methods: "GET",
};

const RANKINGS_ROUTE = {
    path: "/rankings",
    methods: {
        GET: {
            // TODO: should "category" be "cup"?
            queryParams: {
                category: "string",
                league: "string",
                role: "string",
            },
        },
    },
};

router.get(ALL_POKEMON_ROUTE.path, handleGetAllPokemon);

router.get(RANKINGS_ROUTE.path, handleGetLeagueRankings);

module.exports = {
    router,

    ROUTES_MAP: {
        [ALL_POKEMON_ROUTE.path]: ALL_POKEMON_ROUTE,
        [RANKINGS_ROUTE.path]: RANKINGS_ROUTE,
    },
};
