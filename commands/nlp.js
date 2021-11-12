const fs = require('fs');

const pLoc = "./phrases.json";
const oLoc = './objects.json';
const lLoc = './halookup.json';

const phraseFile = fs.readFileSync(pLoc);
const objFile = fs.readFileSync(oLoc);
const halFile = fs.readFileSync(lLoc);
const phrases = JSON.parse(phraseFile);
const objects = JSON.parse(objFile);
const lookup = mirrorLookup(JSON.parse(halFile));

const peopleById = getDIDList(objects.people);

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
                const data = parseDevString(args[2]);

                const devTitle = "**" + titleize(data.device.name) + "**";
                let usePar;
                if (data.parameter) {
                    usePar = `'s ${titleize(data.parameter.name)} parameter.`
                } else usePar = '.';

                let accessString;
                
                if (checkUserAccess(data.room, message.author.id)){
                    accessString = "You *have* access to this room.";
                } else accessString = "You do __not__ have access to this room";

                const msg = [
                    `You requested: ${devTitle}${usePar}\n`,
                    `${devTitle} is in the room; *${titleize(data.room.name)}*. ${accessString}\n`,
                    `${devTitle} is part of the *${titleize(data.category.name)}* group and takes *${data.type.name}* data`
                ]

                message.channel.send(msg.join(""));
            }
                return 1;
        } else if (args[0].toLowerCase() == "get") {
            const lookup = parseDevString(args[1]);
        }
    }
}

/**
 * Functions:
 * TODO: These should be moved to their own files for organization purposes
 */



function parseDevString(str){
    //Ref: sr_lt_sw_main.br
    const reg = new RegExp(`\\${typesplit}|\\${subtypesplit}`, "g");
    const components = str.split(reg);
    
    const devFid = str.split(subtypesplit).shift();
    
    const data = {
        room: objects.rooms[components[0]],
        category: objects.categories[components[1]],
        type: objects.classes[components[2]],
        device: objects.devices[devFid],
        parameter: objects.categories[components[1]].parameters[components[4]]
    }

    data.device.fid = devFid;

    return data
}

function dev2HA(device, type){
    //TODO Handle parameters
    let newString;
    if (type == "string" || type == 0){

    } else {
        const backHalf = [
            device.room,
            device.type,
            device.sid
        ]
        const frontHalf = [
            lookup.hh.categories[device.category],
            backHalf.join(lookup.delimeters.secondary)
        ]

        newString = frontHalf.join(lookup.delimeters.primary);
    }

    return newString;
}

function mirrorLookup(table){
    const mTag = table.mirrorTag;
    table[mTag] = {};
    for (const cat in table.hh){
        const cate = table.hh[cat];
        table[mTag][cate] = {};
        for (const tag in cate){
            const rtag = cate[tag];
            table[mTag][cate][rtag] = tag;
        }
    }
     return table;
}

function dcFrm(string, json){
    if (json){
        string = JSON.stringify(string, null, '\t');
    }
    const codeHead = "\`\`\`json\n";
    const codeEnd = "\n\`\`\`";
    return codeHead.concat(string, codeEnd);
}

function titleize(string){
    const title = string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return title;
}

function getDIDList(users){
    const ids = {};
    for (const person in users){
        if (!users.hasOwnProperty(person)) continue;
        try {users[person].users.discord.id;} catch {continue;}

        const user = users[person];
        const tag = user.users.discord.id;
        ids[tag] = user;
        ids[tag].name = person;
    }

    return ids;
}

function checkUserAccess(room, id){
    if (!peopleById[id]) return false;                          //Check if theres a person with this discord id

    if (room.access == ["common"] || !room.owner) return true;  //Check if the room is a common room/ownerless

    const access = room.access.concat([room.owner]);            //Create list of people with access
    const user = peopleById[id].name;                           //Get name of user
    
    return access.includes(user);                               //Return true/false if the person is in the access list
}