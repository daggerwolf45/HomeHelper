module.exports = {
    name: 'nlp',
    description: 'Natrual Language Processing Core',
    execute(message, args, client){
        if (args.length > 1){
            throw new Error(1);
        }
        throw new Error(-1);
    }
}