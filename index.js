const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
let { count } = require("./countdata.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Schedule task to run every day at 9:00 AM
    cron.schedule('0 9 * * *', async () => {
        const channel = client.channels.cache.get(process.env.CHANNEL_ID);
        if (!channel) return console.error('Channel not found!');

        await announceCounter();

    });
});

client.on('messageCreate', async (message) => {
    if (message.content === '!resetcount') {
        try {
            const data = { count: 0 };
            fs.writeFileSync('./countdata.json', JSON.stringify(data, null, 2));
            await message.channel.send('Het is weer gebeurd hoor');
            await announceCounter();
        } catch (error) {
            console.error('Error resetting count:', error);
            await message.channel.send('Failed to reset count.');
        }
    }
    if(message.content === "!increaseTest"){
        await announceCounter();
    }
});

const announceCounter = async () => {
    try {
        const data = JSON.parse(fs.readFileSync('./countdata.json', 'utf8'));
        data.count += 1;
        fs.writeFileSync('./countdata.json', JSON.stringify(data, null, 2));
        await channel.send(`@everyone Count is now: ${data.count}`);
    } catch (error) {
        console.error('Error reading or writing count file:', error);
    }
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

