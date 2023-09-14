## Requirements:
- Latest version of Node
- Windows OS

## Suggestions:
- Access to your router admin panel
- Knowledge about batch commands
- Firewall access

## Setup:
1. Download the project using [this link](github.com//Kaden-Skinner/Express-Remote-Shell/archive/refs/heads/main.zip).

2. Right-Click the file and `Extract All`.
- `(Optional) - You can move the contents of the "server" folder to the startup folder to make this start automatically on startup. You can get to the startup folder with WIN+R and running "shell:startup". This will open your startup folder.`

**Remote Side**:

3. Naviage to the `Remote folder` and click on the navigation bar up to and send `cmd`. This will open command prompt where you can now install the packages needed. You can do this by sending `npm i`.

- `(Suggestion) - If you want to access the remote side from another network, you need to portforward. The port that needs to be forwarded is "3000". If you do this, it is recommended to block all connections using that port from the firewall and only allow your ip address.`
4. Double-click on `start.vbs` to run it in the background. Or go into the `server` folder and double-click on `start.bat`.

5. The script will ask for a password. Give it one. `(Should not include any quote or double quote characters. If you accidentally do this, go to the `server` folder and set "config.json" to - {"Password": ""} - )`

**Client Side**:

3. Navigate to the `Client` folder and click on the navigation bar and send `cmd`. This will open command prompt where you can now install the packages needed. You can do this by sending `npm i`.

4. Double-click on the `start.bat` file to run the client.

5. The script will ask for an ip address. If you are on the same network, go to the remote computer and open command prompt. Send `ipconfig` and find the `Ipv4` ip. This is what you give it. If you are not on the same network, make sure you setup the `Remote Side` properly and go to the remote computer and google `What is my ip address`. Copy that ip and give the script that.

6. The script will ask for a password. Give it the same password you used when setting up the remote side. If all goes successfully, then you can now send commands to the remote computer.