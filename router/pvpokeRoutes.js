const { Router } = require("express");
const request = require("request-promise");

const router = Router();

const ALL_POKEMON_ROUTE = {
    path: "/allpokemon",
    methods: "GET",
};

const RANKINGS_ROUTE = {
    path: "/rankings",
    methods: {
        GET: {
            queryParams: {
                category: "string",
                league: "string",
                role: "string",
            },
        },
    },
};

const PVPOKE_ROOT_URL = "https://pvpoke.com/data";
const queryParams = { v: "173" };

router.get(ALL_POKEMON_ROUTE.path, async (req, res) => {
    try {
        const response = await request({
            uri: `${PVPOKE_ROOT_URL}/gamemaster.json`,
            qs: queryParams,
        });

        const { pokemon } = JSON.parse(response);

        res.json(pokemon);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get(RANKINGS_ROUTE.path, async ({
    query: {
        category = "all",
        league = "1500",
        role = "overall",
    },
}, res) => {
    try {
        const response = await request({
            uri: `https://pvpoke.com/data/${category}/${role}/rankings-${league}.json`,
            qs: queryParams,
        });

        const parsedResponse = JSON.parse(response);

        res.json(parsedResponse);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = {
    router,

    ROUTES_MAP: {
        [ALL_POKEMON_ROUTE.path]: ALL_POKEMON_ROUTE,
        [RANKINGS_ROUTE.path]: RANKINGS_ROUTE,
    },
};
