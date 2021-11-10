module.exports = {
    name: 'bee',
    description: 'Print the bee movie script',
    execute(message, args){
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const url = "https://gist.githubusercontent.com/MattIPv4/045239bc27b16b2bcf7a3a9a4648c08a/raw/2411e31293a35f3e565f61e7490a806d4720ea7e/bee%2520movie%2520script";
        
        fetch(url)
            .then(res => res.text())
            .then(text => {
                const chunkedText = chunkText(text);
                for (const chunk of chunkedText){
                    message.channel.send(chunk);
                }
            });

        function chunkText (str) {
            const size = Math.ceil(str.length/1999)
            const r = Array(size)
            let offset = 0
            
            for (let i = 0; i < size; i++) {
                r[i] = str.substr(offset, 1999)
                offset += 1999
            }
            
            return r
        }
    }
}