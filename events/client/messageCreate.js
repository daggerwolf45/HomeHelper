module.exports = (Discord, client, message) => {
    const prefix = "!";
    const haPrefix = "+";

    if(message.author.bot){
        // If message is from the bot, don't do anything
        return;
    }    

    let args = message.content.slice(prefix.length).split(/ +/);
    if (message.channel.type == "DM") {
        if (!message.content.startsWith(prefix)){
            args = message.content.split(/ +/);
        }
    } else if (!message.content.startsWith(prefix)){
        return;
    }

    
    const command = args.shift().toLowerCase();

    try {
        client.commands.get(command).execute(message, args);
    } catch {
        console.log("Unknown command: " + command);
    }
}