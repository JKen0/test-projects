require('dotenv').config();
const tmi = require('tmi.js');
const fs = require('fs');

const { startTimer } = require('./timer');
const { refreshAccessToken, getCurrentSong, getPreviousSong } = require('./spotify');



const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OATH_TOKEN
    },
    channels: JSON.parse(process.env.TWITCH_CHANNELS)
});

client.connect();


client.on('message', async (channel, tags, message, self) => {
    if (self || !message.startsWith('!')) {
        return;
    }

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    // ECHO LOGIC
    if (command === 'echo') {
        client.reply(channel, `@${tags.username}, you said: ${args.join(' ')}`, tags.id);
        return;


        // NOW PLAYING LOGIC
    } else if (command === 'np' || command === 'nowplaying') {

        // Get currently playing track
        await refreshAccessToken();

        const getSongInfo = await getCurrentSong();

        if (getSongInfo.song != "") {
            client.reply(channel, `@${tags.username}, Current Song: ${getSongInfo.song} by ${getSongInfo.artists.join(', ')} Jamm`, tags.id);
            return;
        } else {
            client.reply(channel, `@${tags.username}, No song playing Oopsie`, tags.id);
            return;
        }

    } else if (command === 'ps' || command === 'previoussong') {

        // Get currently playing track
        await refreshAccessToken();

        const getSongInfo = await getPreviousSong();

        if (getSongInfo.song != "") {
            client.reply(channel, `@${tags.username}, Previous Song: ${getSongInfo.song} by ${getSongInfo.artists.join(', ')} Okayge`, tags.id);
            return;
        } else {
            client.reply(channel, `@${tags.username}, No previous song on record Oopsie`, tags.id);
            return;
        }

        // DICE LOGIC
    } else if (command === 'dice') {
        numRolls = args.length > 0 ? args[0] : 1;
        maxDiceNum = args.length > 1 ? args[1] : 6;

        if (!Number.isInteger(parseInt(numRolls)) || !Number.isInteger(parseInt(maxDiceNum))) {
            client.reply(channel, `@${tags.username}, Invalid Dice Format`, tags.id);
            return;
        }

        let result = [];
        while (result.length < numRolls) {
            const randomNumber = Math.floor(Math.random() * maxDiceNum) + 1;
            result.push(randomNumber);
        }

        client.reply(channel, `@${tags.username}, You rolled a ${result.join(' ')} GAMBA`, tags.id);
        return;


        // TIMER LOGIC
    } else if (command === 'timer') {
        const regex = /^!timer\s+(\d{1,3})\s*(@\w+)?\s*(".*")?$/;
        const match = message.match(regex);

        console.log(message);

        if (!match) {
            client.reply(channel, `@${tags.username} Invalid Timer Format.`, tags.id);
            return;
        }

        let [, timerDuration, timerUser, timerMessage] = match;
        timerUser = timerUser ? timerUser : tags.username;
        startsWithAt = timerUser[0] === "@" ? true : false;

        startTimer(timerUser, timerDuration, () => {
            client.say(channel, `${startsWithAt ? "" : "@"}${timerUser}, Time Is Up DinkDonk Timer Expired DinkDonk ${timerMessage ? timerMessage : ''}`);
        });

        client.reply(channel, `@${tags.username}, Your ${timerDuration} minute timer has been set Waiting`, tags.id);
        return;
    } else if (command === "nap") {
        const fileData = fs.readFileSync(process.env.DATA_JSON, 'utf8');
        let jsonData = JSON.parse(fileData);

        // check if value exists, if so add 1 to it and update new jsonData
        let numNaps = jsonData.naps[tags.username] ? jsonData.naps[tags.username] + 1 : 1;
        jsonData.naps[tags.username] = numNaps;

        //write back to file with updated values
        fs.writeFileSync(process.env.DATA_JSON, JSON.stringify(jsonData, null, 2), 'utf8');

        client.say(channel, `${tags.username} has napped a total of ${numNaps} times. Bedge`);
    }
});

