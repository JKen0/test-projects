const fs = require('fs').promises;
const { get, post } = require('./axios');
require('dotenv').config();


async function refreshAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const tokenDataString = await fs.readFile(process.env.SPOTIFY_TOKEN_SECRET_FILEPATH);
    const tokenDataParse = JSON.parse(tokenDataString);

    console.log(tokenDataParse);

    const postCallConfig = {
        params: {
            grant_type: 'refresh_token',
            refresh_token: tokenDataParse.refresh_token
        },
        headers: {
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        }
    }

    const refreshTokenAPI = await post('https://accounts.spotify.com/api/token', null, postCallConfig);

    const newTokens = {
        access_token: refreshTokenAPI.access_token,
        refresh_token: refreshTokenAPI.refresh_token ? refreshTokenAPI.refresh_token : tokenDataParse.refresh_token
    }

    if (newTokens) {
        await fs.writeFile(process.env.SPOTIFY_TOKEN_SECRET_FILEPATH, JSON.stringify(newTokens, null, 2));
        return { success: true, message: "token refreshed" };
    }

}

async function getCurrentSong() {
    let result = { song: "", artists: [] };
    const access_token = await fetchAccessToken();

    const getCallConfig = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }

    // Make request to Spotify API to get currently playing song
    const response = await get('https://api.spotify.com/v1/me/player/currently-playing', getCallConfig);

    if (response.item && response.is_playing === true) {
        result["song"] = response.item.name;

        response.item.artists.map(artist => {
            result["artists"].push(artist.name);
        });
    };

    return result;
}

async function getPreviousSong() {
    let result = { song: "", artists: [] }
    const access_token = await fetchAccessToken();

    const getCallConfig = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }

    const response = await get('https://api.spotify.com/v1/me/player/recently-played', getCallConfig);

    // Extract the most recent track from the list
    const lastPlayedTrack = response.items[0].track;

    if (lastPlayedTrack.name) {
        result["song"] = lastPlayedTrack.name;

        lastPlayedTrack.artists.map(artist => {
            result["artists"].push(artist.name);
        });
    };

    return result;
}

async function fetchAccessToken() {
    const tokenDataString = await fs.readFile(process.env.SPOTIFY_TOKEN_SECRET_FILEPATH);
    const tokenDataParse = JSON.parse(tokenDataString);
    const access_token = tokenDataParse.access_token;

    return access_token;
};

module.exports = { refreshAccessToken, getCurrentSong, getPreviousSong, fetchAccessToken };