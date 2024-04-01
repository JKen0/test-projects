const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs').promises;
require('dotenv').config();


async function refreshAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const tokenDataString = await fs.readFile(process.env.SPOTIFY_TOKEN_SECRET_FILEPATH);
    const tokenDataParse = JSON.parse(tokenDataString);


    const refreshTokenAPI = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'refresh_token',
            refresh_token: tokenDataParse.refresh_token
        },
        headers: {
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        }
    });

    const newTokens = {
        access_token: refreshTokenAPI.data.access_token,
        refresh_token: refreshTokenAPI.data.refresh_token ? refreshTokenAPI.data.refresh_token : tokenDataParse.refresh_token
    }

    if (newTokens) {
        await fs.writeFile(process.env.SPOTIFY_TOKEN_SECRET_FILEPATH, JSON.stringify(newTokens, null, 2));
        return;
    }

}

async function getCurrentSong() {
    let result = { song: "", artists: [] }
    const tokenDataString = await fs.readFile(process.env.SPOTIFY_TOKEN_SECRET_FILEPATH);
    const tokenDataParse = JSON.parse(tokenDataString);
    const access_token = tokenDataParse.access_token;

    // Make request to Spotify API to get currently playing song
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    if (response.data.item && response.data.is_playing === true) {
        result["song"] = response.data.item.name;

        response.data.item.artists.map(artist => {
            result["artists"].push(artist.name);
        });
    };

    return result;
}

module.exports = { refreshAccessToken, getCurrentSong };