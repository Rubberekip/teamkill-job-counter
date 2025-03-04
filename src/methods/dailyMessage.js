const { getCount } = require('../controllers/jop.controller');

module.exports = {
    dailyMessage: async function (client) {
        console.log("-----{ Daily message at " + new Date().toString()+  " }-----");
        
        const channel = client.channels.cache.get(process.env.GENERAL_CHANNEL_ID);
        if(!channel) return console.error("Channel not found!");
    
        let count = await getCount();

        if(count == -1){
            console.error("COUNT IS NOT FOUND IN DATABASE");
            await interaction.reply("Oh no! Something went horribly wrong!")
            return;
        }

        if(count === 1){
            await channel.send("@everyone" + `Het is ${count} dag geleden sinds de laatste teamkill van Jop`);
        } else {
            await channel.send("@everyone" + `Het is ${count} dagen geleden sinds de laatste teamkill van Jop`);
        }

        console.log("-----{ End daily message }-----");
    }
}
