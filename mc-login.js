const { spawn } = require('child_process');
const { Client, GatewayIntentBits } = require('discord.js');
const readline = require('readline');

const TOKEN = "DISCORD_BOT_TOKEN_HERE"; //The TOKEN for your bot.
const ADMIN_USER_ID = "ADMIN_ID_HERE"; //The User ID for the Admin of the server.

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let mcserver;
const MC_SERVER_START_SCRIPT = "start.bat"; //Change this to your .bat Minecraft starting file.

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const command = input.trim();
  if (command) {
    if (mcserver) {
      mcserver.stdin.write(command + '\n');
    } else {
      console.log("[Bot]: The server is off. Turn it on with 'start' on the designed discord channel.");
    }
  }
});


bot.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "start") {
    if (!mcserver) {
      message.channel.send("Starting the server...");

      mcserver = spawn(MC_SERVER_START_SCRIPT, [], { shell: true, stdio: ['pipe', 'pipe', 'pipe'] });

      mcserver.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
      });

      mcserver.stderr.on('data', (data) => {
        process.stderr.write(data.toString());
      });

      mcserver.on('close', (code) => {
        console.log(`[Bot]: The Minecraft server stopped. Exit code: ${code}`);
        mcserver = null;
      });

    } else {
      message.channel.send("The server is already executing.");
    }
  }

  if (command === "stop") {
    if (mcserver) {
      message.channel.send("Stopping the server...");
      mcserver.stdin.write('stop\n');

      setTimeout(() => {
        if (mcserver) {
          message.channel.send("The server turned off successfully.");
          mcserver.kill();
          mcserver = null;
        }
      }, 15000);

    } else {
      message.channel.send("The server is not executing.");
    }
  }

  if (command === "cmd") {
    if (message.author.id !== ADMIN_USER_ID) {
      message.channel.send("You're not allowed to use this command.");
      return;
    }

    if (mcserver) {
      const commandToSend = args.join(' ');
      if (commandToSend) {
        message.channel.send(`Sending the following command to the console: \`${commandToSend}\``);
        mcserver.stdin.write(commandToSend + '\n');
      }
    } else {
      message.channel.send("The server is not executing to send it commands.");
    }
  }
});

bot.login(TOKEN).then(() => {
  console.log("Discord bot turned on successfully.");
  console.log("-----------------------------------------");
}).catch(error => {
  console.error("Error trying to execute the bot:", error);
  console.log("Make sure the token of your bot is correct.");
});