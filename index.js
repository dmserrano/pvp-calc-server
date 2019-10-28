const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { router, ROUTES_MAP } = require("./router/");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));


app.get("/", (req, res) => {
    const ROUTES = JSON.parse(JSON.stringify(ROUTES_MAP));
    res.json(ROUTES);
});

app.use(router);

app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log("Web server listening on port " + PORT);
});
