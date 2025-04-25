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
        numRolls = args.length > 0 ? parseInt(args[0]) : 1;
        maxDiceNum = args.length > 1 ? parseInt(args[1]) : 6;

        if (!Number.isInteger(numRolls) || !Number.isInteger(maxDiceNum) || numRolls > maxDiceNum || numRolls < 1 || maxDiceNum < 1) {
            client.reply(channel, `@${tags.username}, Invalid Dice Format or too many rolls requested`, tags.id);
            return;
        }

        // Generate array of numbers from 1 to maxDiceNum
        let numbers = Array.from({ length: maxDiceNum }, (_, i) => i + 1);

        // Shuffle the array
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        // Take the first numRolls values
        let result = numbers.slice(0, numRolls);

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
    } else if (command === "time") {
        // Get the current time in Singapore
        const singaporeTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Singapore" });
        const date = new Date(singaporeTime);

        // Store the current time (hours and minutes)
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Subtract one day
        date.setDate(date.getDate() - 1);

        // Format the date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString("en-US", options);

        // Add the same time to the message
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Reply with the formatted message
        client.reply(channel, `The current date in Singpore is ${formattedDate} at ${formattedTime} Smile`, tags.id);
    }

});

