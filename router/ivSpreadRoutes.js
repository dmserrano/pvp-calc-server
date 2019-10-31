const { Router } = require("express");
const { handleGetIvSpread } = require("../controllers/ivSpread");

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

router.get(IV_SPREAD_ROUTE.path, handleGetIvSpread);

module.exports = {
    router,

    ROUTES_MAP: {
        [IV_SPREAD_ROUTE.path]: IV_SPREAD_ROUTE,
    },
};
