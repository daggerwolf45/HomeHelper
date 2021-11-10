module.exports = {
    name: 'say',
    aliases: ['tell'],
    description: 'Read out text on a google assistant',
    execute(message, args){
        console.log(message);
        console.log(args);
    }
}