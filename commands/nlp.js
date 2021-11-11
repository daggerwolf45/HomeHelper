const fs = require('fs');

const pLoc = "./phrases.json";
const oLoc = './objects.json';

const phraseFile = fs.readFileSync(pLoc);
const objFile = fs.readFileSync(oLoc);
let phrases = JSON.parse(phraseFile);
let objects = createObjmap(JSON.parse(objFile));

const typesplit = phrases.grammer.separators.typesplit;
const subtypesplit = phrases.grammer.separators.subtypesplit;

module.exports = {
    name: 'nlp',
    description: 'Natrual Language Processing Core',
    execute(message, args, client){
        args = message.content.split(" ");

        //BAD! Hardcoded checks just for debugging
        if (args[0].toLowerCase() === "evaluate"){
            if (args[1].toLowerCase() == "string" || args[1].toLowerCase() == "str"){
                message.channel.send(dcFrm(parseDevString(args[2]), true));
                return 0;
            } else 
                return 1;
        }
    }
}

function parseDevString(str){
    const components = str.split(typesplit);
    const parameterIDs = components[components.length-1].split(subtypesplit);
    
    components.pop();
    components.push(parameterIDs.shift());
    
    const devFid = str.split(subtypesplit).shift();
    console.log(devFid);

    const params = fillParam(objects.devices.get(devFid), parameterIDs);
    
    const data = {
        room: objects.rooms.get(components[0]),
        category: objects.categories.get(components[1]),
        type: objects.types.get(components[2]),
        device: objects.devices.get(devFid),
        paramerters: params
    }

    return data
}

function fillParam(device, paramets){}

function dcFrm(string, json){
    if (json){
        string = JSON.stringify(string, null, '\t');
    }
    const codeHead = "\`\`\`json\n";
    const codeEnd = "\n\`\`\`";
    return codeHead.concat(string, codeEnd);
}

function createObjmap(obj){
    const coll = {
        rooms: new Map(),
        categories: new Map(),
        types: new Map(),
        devices: new Map(),
        people: new Map()
    }

    for (const i of obj.rooms){
        coll.rooms.set(i.id, i);
    }
    for (const i of obj.categories){
        coll.categories.set(i.id, i);
    }
    for (const i of obj.classes){
        coll.types.set(i.id, i);
    }
    for (const i of obj.devices){
        coll.devices.set(i.fid, i);
    }
    for (const i of obj.people){
        coll.people.set(i.name, i);
    }

    return coll;
}