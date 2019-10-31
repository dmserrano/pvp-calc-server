const { Router } = require("express");
const { handleGetEvolutionChain } = require("../controllers/pokeApi");

const router = Router();

const EVOLUTION_CHAIN_ROUTE = {
    path: "/evolution-chain/:pokedexNumber",
    method: {
        GET: {
            params: {
                pokedexNumber: "string",
            },
        },
    },
};

router.get(EVOLUTION_CHAIN_ROUTE.path, handleGetEvolutionChain);

module.exports = {
    router,

    ROUTES_MAP: {
        [EVOLUTION_CHAIN_ROUTE.path]: EVOLUTION_CHAIN_ROUTE,
    },
};
