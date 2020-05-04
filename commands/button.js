module.exports = async (message, keyv, MessageEmbed) => {
    if (message.content.split(" ").length > 2)
        return message.reply("This command only has one argument.");
    const arg = message.content.toLowerCase().split(" ")[1];
    const colors = ["blue", "red", "green"];
    const channel = message.channel;
    const guild = message.guild;
    if (arg === "start") {
        for (const color in colors)
            if (!(guild.roles.cache.find(role => role.name === `${colors[color]} tier`)))
                guild.roles.create({
                    data: {
                        name:  `${colors[color]} tier`,
                        color: `${colors[color].toUpperCase()}`,
                    },
                    reason: `button ${colors[color]} tier`,
                });
        await keyv.set(guild.id + ":buttonAlive", true)
        await keyv.set(guild.id + ":button", colors.length);
        setInterval(async function() {
            if (await keyv.get(guild.id + ":buttonAlive")) {
                await keyv.set(guild.id + ":button", await keyv.get(guild.id + ":button") - 1);
                if (await keyv.get(guild.id + ":button") === 0) {
                    await keyv.delete(guild.id + ":buttonAlive");
                    return channel.send(new MessageEmbed()
                        .setTitle("Button died")
                        .setDescription("Type `R!button start` to start the button again.")
                        .setColor(0xff0000)
                    );
                }
            }
        }, 10000);
    }
    if (arg === "press") {

    }
    if (arg === "look")
        return channel.send(new MessageEmbed()
            .setTitle("Button")
            .setDescription(`The button is now add ${colors[await keyv.get(guild.id + ":button")-1]}`)
            .setColor(0xff0000)
        );
}