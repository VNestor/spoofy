require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");

// create server
const app = express();
// Resolve blocked by CORS policy
app.use(cors());
// Used to parse json from code
app.use(bodyParser.json());
// Used url encoded parser for lyrics
app.use(bodyParser.urlencoded({ extended: true }));

// ref: https://www.npmjs.com/package/spotify-web-api-node

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body),
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        });
    })
    .catch((err) => {
      console.log("Error at refresh: " + err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "Unable to find lyrics for this song! :(";
  res.json({ lyrics });
});

// ref: https://devcenter.heroku.com/articles/config-vars
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
