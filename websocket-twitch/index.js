require('dotenv').config();
const tmi = require('tmi.js');
const { startTimer } = require('./timer');


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


client.on('message', (channel, tags, message, self) => {

    if (self || !message.startsWith('!')) {
        return;
    }

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'echo') {
        client.say(channel, `@${tags.username}, you said: ${args.join(' ')}`);

    } else if (command === 'hello') {
        client.say(channel, `@${tags.username}, Yo what's up`);

    } else if (command === 'dice') {
        console.log(args);
        numRolls = args.length > 0 ? args[0] : 1;
        maxDiceNum = args.length > 1 ? args[1] : 6;

        if (!Number.isInteger(parseInt(numRolls)) || !Number.isInteger(parseInt(maxDiceNum))) {
            client.say(channel, `@${tags.username}, Invalid Dice Format`);
            return;
        }

        let result = [];
        while (result.length < numRolls) {
            const randomNumber = Math.floor(Math.random() * maxDiceNum) + 1;
            result.push(randomNumber);
        }

        client.say(channel, `@${tags.username}, You rolled a ${result.join(' ')} GAMBA`);

    } else if (command === 'timer') {
        const regex = /^!timer\s+(\d+)\s*(\w*)\s*(?:"([^"]*)")?$/;
        const match = message.match(regex);

        if (!match) {
            client.say(channel, `@${tags.username} Invalid Timer Format.`);
            return;
        }

        let [, timerDuration, timerUser, timerMessage] = match;
        timerUser = timerUser ? timerUser : tags.username;

        startTimer(timerUser, timerDuration, () => {
            client.say(channel, `@${timerUser}, Time Is Up DinkDonk Timer Expired DinkDonk ${timerMessage ? timerMessage : ''}`);
        });

        client.say(channel, `@${tags.username}, Your ${timerDuration} minute timer has been set Waiting`);
    }
});

