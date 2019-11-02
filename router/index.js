const { Router } = require("express");
const ivSpreadRoutes = require("./ivSpreadRoutes");
const pokeApiRoutes = require("./pokeApiRoutes");
const pvpokeRoutes = require("./pvpokeRoutes");

const router = Router();

router.use(ivSpreadRoutes.router);
router.use(pokeApiRoutes.router);
router.use(pvpokeRoutes.router);

module.exports = {
    router,

    ROUTES_MAP: {
        ...pokeApiRoutes.ROUTES_MAP,
        ...pvpokeRoutes.ROUTES_MAP,
        ...ivSpreadRoutes.ROUTES_MAP,
    },
};
