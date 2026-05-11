const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(3000, () => {
  console.log("Web server started");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log("Bot起動");
});

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  if (/^\d{5}$/.test(message.content)) {

    const targetChannelId =
      "1380947003407728780";

    const channel =
      await client.channels.fetch(targetChannelId);

    await channel.setName(message.content);

    message.reply("変更したっ！");
  }
});

client.login(process.env.TOKEN);
