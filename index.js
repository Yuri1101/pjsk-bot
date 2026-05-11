const {
  Client,
  GatewayIntentBits
} = require("discord.js");

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

    message.reply("変更した！");
  }
});

client.login(process.env.TOKEN);
