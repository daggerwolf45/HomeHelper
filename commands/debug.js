module.exports = {
    name: 'debug',
    aliases: ['d'],
    description: 'Debug Command',
    execute(message, args){
        console.log("/********************************/");
        console.log("Message Info");
        console.log("/********************************/");
        console.log(message);
        console.log(args);

        console.log("\n\n/********************************/");
        console.log("Channel Info");
        console.log("/********************************/");
        console.log(message.channel);
    }
}