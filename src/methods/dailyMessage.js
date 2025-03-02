const fs = require("node:fs");

module.exports = {
    dailyMessage: async function (client) {

        console.log("Daily message at " + new Date().toString());
        
        const channel = client.channels.cache.get(process.env.GENERAL_CHANNEL_ID);
        if(!channel) return console.error("Channel not found!");
    
        let data;

        try{
            data = JSON.parse(fs.readFileSync("./countdata.json"));
            data.count += 1;
            fs.writeFileSync("./countdata.json", JSON.stringify(data));
        } catch(error){
            console.error(error);
            await channel.send("An error occured with bot, whoops");
            return;
        }

        if(data.count === 1){
            await channel.send("@everyone" + `Het is ${data.count} dag geleden sinds de laatste teamkill van Jop`);
        } else {
            await channel.send("@everyone" + `Het is ${data.count} dagen geleden sinds de laatste teamkill van Jop`);
        }
    }
}
