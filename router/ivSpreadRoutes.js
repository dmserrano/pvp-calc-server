const { Router } = require("express");
const request = require("request-promise");

const router = Router();

const IV_SPREAD_ROUTE = {
    path: "/ivspread",
    methods: {
        GET: {
            queryParams: {
                ivs: "string",
                pokemon: "string",
            },
        },
    },
};

const requestionOptions = {
    headers: { Accept: "application/json" },
    uri: "https://ivservice.herokuapp.com/iv",
};

router.get(IV_SPREAD_ROUTE.path, async ({
    query: {
        pokemon = "",
        ivs = "",
    },
}, res) => {
    try {
        const response = await request({ ...requestionOptions, qs: { pokemon, ivs } });
        const parsedResponse = JSON.parse(response);

        res.json(parsedResponse);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = {
    router,

    ROUTES_MAP: {
        [IV_SPREAD_ROUTE.path]: IV_SPREAD_ROUTE,
    },
};
