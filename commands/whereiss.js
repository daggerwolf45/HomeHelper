const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    name: 'whereiss',
    description: "Find the iss",
    execute(message, args){
        

        const url = "https://api.wheretheiss.at/v1/satellites/25544";

        getISS().then(iss => {
            const iName = iss.name;
            const alt = Number.parseFloat(iss.altitude).toFixed(2);
            
            message.channel.send("The " + iName + " is " + alt + "km above the earth!");
        });
        
        async function getISS() {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }

        function rtISS(){
            return fetch(url).then(res => {
                return res.json();
            })
        }
    }
}