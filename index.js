const express = require("express");
const cors = require("cors");
const request = require("request-promise");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    const routes = {
        pvpoke: {
            "/gamedata": ["GET"],
        },
    };

    res.json(routes);
});

app.get("/pvpoke/gamedata", async (req, res) => {
    try {
        const response = await request("https://pvpoke.com/data/gamemaster.json?v=173");
        const parsedResponse = JSON.parse(response);
        res.json(parsedResponse);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get("/ivspread", async (req, res) => {
    const response = await request({
        headers: { Accept: "application/json" },
        uri: "https://ivservice.herokuapp.com/iv?pokemon=skuntank&ivs=6/13/11",
    });
    const parsedResponse = JSON.parse(response);
    res.json(parsedResponse);
});

app.listen(80, () => {
    console.log("CORS-enabled web server listening on port 80");
});
