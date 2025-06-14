# Minecraft Starter Discord Bot

A simple Node.js bot that allows you to start, stop, and send commands to your Minecraft server directly from a Discord channel.

## Features

-   **Start Server**: Launches your Minecraft server using a startup script (`.bat` or `.sh`).
-   **Stop Server**: Sends the `stop` command to the server console for a safe shutdown.
-   **Send Commands**: Allows a designated admin to send any command to the Minecraft console.
-   **Terminal Control**: Lets you type commands directly into the terminal running the bot to control the Minecraft server console.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v16.9.0 or higher).
-   A pre-configured Minecraft server with a startup script (e.g., `start.bat`).
-   A bot application created on the [Discord Developer Portal](https://discord.com/developers/applications) to get a bot token.

## Installation and Setup

**1. Prepare the Files**

-   Save the provided bot code into a file named `mc-login.js` inside your main Minecraft server folder or a dedicated folder for the bot.

**2. Configure the Bot**

Open the `mc-login.js` file and edit the following constants at the top:

```javascript
// The TOKEN for your bot.
const TOKEN = "DISCORD_BOT_TOKEN_HERE"; 

// The User ID for the Admin of the server.
const ADMIN_USER_ID = "ADMIN_ID_HERE"; 

// Change this to your .bat Minecraft starting file.
const MC_SERVER_START_SCRIPT = "start.bat"; 
```

-   **`TOKEN`**: Replace `"DISCORD_BOT_TOKEN_HERE"` with your bot's token. You can get this from the Discord Developer Portal under the "Bot" section of your application.
-   **`ADMIN_USER_ID`**: Replace `"ADMIN_ID_HERE"` with your personal Discord User ID. To get your ID, enable "Developer Mode" in Discord (User Settings > Advanced), then right-click your username and select "Copy User ID".
-   **`MC_SERVER_START_SCRIPT`**: Make sure this value matches the name of your Minecraft server's startup script (e.g., `start.bat` for Windows or `./start.sh` for Linux/macOS).

**3. Install Dependencies**

Open a terminal or command prompt in the folder where you saved `mc-login.js` and run the following commands:

```bash
# Creates a package.json file
npm init -y

# Installs the required discord.js libraries
npm install discord.js
```

**4. Start the Bot**

Once configured, run the bot using this command in your terminal:

```bash
node mc-login.js
```

If everything is correct, you will see the message `Discord bot turned on successfully.` in your console. Don't forget to invite your bot to the Discord server where you intend to use it!

## How to Use

You can use the following commands in any text channel the bot has access to.

### Discord Commands

-   `start`
    Starts the Minecraft server. The bot will reply with "Starting the server...".

-   `stop`
    Sends the `stop` command to the server console to shut it down safely.

-   `cmd <command>`
    Sends a command directly to the Minecraft server console. **This command can only be used by the `ADMIN_USER_ID`**.
    
    *Example:*
    `cmd say Hello World!`

### Terminal Control

While the Minecraft server is running, you can also type commands (e.g: `list`, `op <username>`) directly into the terminal where the bot is running and press Enter. The command will be sent straight to the Minecraft server's console.
