const axios = require('axios');
const dns = require('dns');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    readline.question('Ip: ', (ip) => {
        dns.lookup(ip, (err, address, family) => {
            if(err) {
                console.log(err);
            }
            if(address == undefined) {
                console.log('Invalid address. Try again.')
                main();
                return;
            }
            if (address == `::1`) {
                address = `localhost`
            }
            const baseUrl = `http://${address}:3000/command`
                    
            function main1(){
                readline.question('Password: ', (passphrase) => {
                    readline.question('> ', (command) => {
                        if(command === "exit"){
                            process.exit(0);
                        }
                        readline.pause();
                        axios.get(baseUrl, {
                            params: {
                                data: `${command}`,
                                password: passphrase
                            }
                        })
                        .then(data => {
                            console.log(data.data);
                            if (data.data == "Wrong password" || data.data == "You need to give a password") {
                                console.log('Disconnected.')
                                main();
                                return;
                            }
                            main1();
                            return;
                        })
                        .catch(err => {
                            console.log(err);
                            main1();
                            return;
                        });
                    });
                });
            }
    
            main1();
        });
    });
}
main();