const express = require('express');
const { exec } = require('child_process');
const directory = process.env.USERNAME;
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
function start() {
    fs.readFile('config.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error: " + err);
            process.exit();
        }
        const data = JSON.parse(jsonString);
        if (`${data.Password}` == "") {
            readline.question("Please set a password: ", (passphrase) => {
                console.log(passphrase)
                if (`${passphrase}` == "") {
                    console.log("You need to give a password");
                    exec(`start start.bat`);
                    process.exit();
                }
                let data = {
                    "Password": `${passphrase}`
                };
                console.log(data);
                let jsonContent = JSON.stringify(data);
                console.log(jsonContent);
                fs.writeFile("config.json", jsonContent, 'utf8', function (err) {
                    if (err) {
                        console.log("Error: " + err);
                        process.exit();
                    }
                    exec(`start start.bat`);
                    process.exit();
                });
            });
        } else {
            process.chdir(`C:\\users\\${directory}`);
            const app = express();
            app.use(express.json());

            const port = process.env.PORT || 3000;

            app.listen(port, () => {
                console.log("Server Listening on PORT:", port);
            });


            app.get("/command", (request, response) => {
                password = request.query.password
                if (password == null || password == "" || password == undefined || password == "undefined") {
                    response.send("You need to give a password");
                    return
                }
                if (password != `${data.Password}`) {
                    response.send("Wrong password");
                    return
                }
                command = request.query.data
                if (command == null || command == "" || command == undefined || command == "undefined") {
                    response.send("You need to give a command");
                    return
                }

                commands = command.split(" && ")
                if (commands.length == 1) {
                    for (let i = 0; i < commands.length; i++) {
                        cmd = commands[i];
                        exec(cmd, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                response.send(`${error}`);
                                return
                            }
                            response.send(`${stdout}`);
                        });
                    }
                } else {
                    let resp = [];
                    for (let i = 0; i < commands.length; i++) {
                        cmd = commands[i];
                        exec(cmd, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                response.send(`${error}`);
                                return
                            }
                            if (stdout == "") {
                                stdout = "Task Completed Successfully";
                            }
                            resp.push(`> ${commands[i]}\n${stdout}`);
                            if (resp.length == commands.length) {
                                var respo = resp.join('')
                                response.send(respo);
                            }
                        });
                    }
                }
            });
        }
    })
}
start();

