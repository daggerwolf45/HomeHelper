module.exports = {
    name: 'new',
    description: 'Begins device creation process',
    aliases: ["create"],
    execute(message, args){
        message.channel.send("Pong!");
    }
}