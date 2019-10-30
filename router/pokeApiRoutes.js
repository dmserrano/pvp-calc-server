const { Router } = require("express");
const { getOrderedEvolutionChain } = require("../services/pokeApi");

const router = Router();

const EVOLUTION_CHAIN_ROUTE = {
    path: "/evolution-chain",
    method: {
        GET: {
            queryParams: {
                pokedexNumber: "string",
            },
        },
    },
};

router.get(EVOLUTION_CHAIN_ROUTE.path, async ({
    query: {
        pokedexNumber = "1",
    },
}, res) => {
    try {
        const response = await getOrderedEvolutionChain(pokedexNumber);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = {
    router,

    ROUTES_MAP: {
        [EVOLUTION_CHAIN_ROUTE.path]: EVOLUTION_CHAIN_ROUTE,
    },
};
