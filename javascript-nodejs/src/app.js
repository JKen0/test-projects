const express = require('express'); // Express web server framework
const request = require('request'); // "Request" librar
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const { refreshAccessToken, fetchAccessToken } = require('./spotify');
const { get, post } = require('./axios');


let client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
let client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
let redirect_uri = process.env.SPOTIFY_REDIRECT_LINK; // Your redirect uri


var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());




app.get('/login', function (req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-currently-playing user-read-recently-played user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});



app.get('/callback', function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.json({
                        access_token: access_token,
                        refresh_token: refresh_token
                });
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});


app.get('/getspotifydata', async function (req, res) {
    const refreshToken = await refreshAccessToken();
    const access_token = await fetchAccessToken();
    const result = { previousSongs: [], topSongs: [], topArtists: [] }

    const getCallConfig = {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }

    const getPreviousSongPlayed = await get('https://api.spotify.com/v1/me/player/recently-played?limit=50', getCallConfig);

    const getTopSongs = await get('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10', getCallConfig);

    const getTopArtists = await get('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5', getCallConfig);

    getPreviousSongPlayed.items.map((item) => {
        result.previousSongs.push({
            name: item.track.name,
            timePlayed: item.played_at,
            linkSpotify: item.track.external_urls.spotify,
            linkPreview: item.track.preview_url,
            artists: item.track.artists.map(artist => artist.name).join(', '),
            albumPic: item.track.album.images[0].url
        });
    });

    getTopSongs.items.map((item) => {
        result.topSongs.push({
            name: item.name,
            linkSpotify: item.external_urls.spotify,
            artists: item.artists.map(artist => artist.name).join(', '),
            artistPic: item.album.images[0].url
        });
    });

    getTopArtists.items.map((item) => {
        result.topArtists.push({
            name: item.name,
            linkSpotify: item.external_urls.spotify,
            artistPic: item.images[0].url
        });
    });


    // Convert the object to JSON format
    const jsonData = JSON.stringify(result, null, 2);


    // Write the JSON data to the file
    fs.writeFile(process.env.SPOTIFY_TEST_DATA_FILEPATH, jsonData, (err) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});





app.listen(process.env.PORT || 3010);