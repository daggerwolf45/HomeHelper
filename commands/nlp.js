const fs = require('fs');

const pLoc = "./phrases.json";
const oLoc = './objects.json';

const phraseFile = fs.readFileSync(pLoc);
const objFile = fs.readFileSync(oLoc);
let phrases = JSON.parse(phraseFile);
let objects = JSON.parse(objFile);

const typesplit = phrases.grammer.separators.typesplit;
const subtypesplit = phrases.grammer.separators.subtypesplit;

module.exports = {
    name: 'nlp',
    description: 'Natrual Language Processing Core',
    execute(message, args, client){
        if (message.content.startsWith('!')){
            args = message.content.slice(1).split(" ")
        } else {
            args = message.content.split(" ");
        }

        //BAD! Hardcoded checks just for debugging
        if (args[0].toLowerCase() === "evaluate"){
            if (args[1].toLowerCase() == "string" || args[1].toLowerCase() == "str"){
                message.channel.send(dcFrm(parseDevString(args[2]), true));
                return 0;
            } else if (args[1].toLowerCase() == "device"){
                const device = parseDevString(args[2]);
            }
                return 1;
        }
    }
}

/**
 * Functions:
 * TODO: These should be moved to their own files for organization purposes
 */


function getDeviceInfo(device){

}

function parseDevString(str){
    //Ref: sr_lt_sw_main.br
    const reg = new RegExp(`\\${typesplit}|\\${subtypesplit}`, "g");
    const components = str.split(/\_|\./g);

    console.log(components);
    
    const devFid = str.split(subtypesplit).shift();
    console.log(devFid);
    
    const data = {
        room: objects.rooms[components[0]],
        category: objects.categories[components[1]],
        type: objects.classes[components[2]],
        device: objects.devices[devFid],
        parameter: objects.categories[components[1]].parameters[components[4]]
    }

    return data
}

function fillParam(device, paramets){

}

function dcFrm(string, json){
    if (json){
        string = JSON.stringify(string, null, '\t');
    }
    const codeHead = "\`\`\`json\n";
    const codeEnd = "\n\`\`\`";
    return codeHead.concat(string, codeEnd);
}