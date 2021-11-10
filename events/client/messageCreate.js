module.exports = (Discord, client, message) => {
    const prefix = "!";
    const haPrefix = "+";

    if(message.author.bot){
        // If message is from the bot, don't do anything
        return;
    }    

    let args = message.content.slice(prefix.length).split(/ +/);                    //By default assume prefix is used and remove the first char
    if ((message.channel.type == "DM" || message.channel.name == "home-control") && (!message.content.startsWith(prefix))) {       //If the message is a DM or in the "home-control" channel AND doesn't have a prefix                                     //If there is no prefix
        args = message.content.split(/ +/);                                                                                             //change arguments to include the first char
    } else if (!message.content.startsWith(prefix)){                                //Else, if there is no prefix 
        return;                                                                         //Stop processing the message
    }

    
    const command = args.shift().toLowerCase();                                     //Make command lowercase

    try {
        client.commands.get(command).execute(message, args);                        //Run the selected command
        console.log(`[Message]: ${message.author.username} triggered ${command} ${args}`);
    } catch {
        try {
            client.commands.get('nlp').execute(message, args, client);
            console.log(`[Message]: ${message.author.username} activated NLP with :${command} ${args}`);
        } catch (e){
            if (e.message == 1){
                console.error("NLP Failed!\n" + e);
                return;
            }
        } 
        console.error("Unknown command: " + command);                                 //If command doesn't exist, post in console
    }
}