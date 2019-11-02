const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { router, ROUTES_MAP } = require("./router/");

const app = express();
const PORT = process.env.PORT || 4000;
const ROUTE_PREFIX = "/api/v1";

app.use(cors());
app.use(morgan("dev"));


app.get(ROUTE_PREFIX, (req, res) => {
    const ROUTES = JSON.parse(JSON.stringify(ROUTES_MAP));
    res.json(ROUTES);
});

app.use(ROUTE_PREFIX, router);

app.get("*", (req, res) => {
    res.status(404).send("404: Route Not Found");
});

app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log("Web server listening on port " + PORT);
});
