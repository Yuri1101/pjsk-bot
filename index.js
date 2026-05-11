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

  // 監視するチャンネルだけ
  const allowedChannelId =
    "1487402528609013760";

  if (message.channel.id !== allowedChannelId)
    return;

  // 5桁数字判定
  if (/^\d{5}$/.test(message.content)) {

    try {

      // VCチャンネルID
      const vcChannelId =
        "1380947003407728780";

      // テキストチャンネルID
      const textChannelId =
        "1380946601077379183";

      const vcChannel =
        await client.channels.fetch(vcChannelId);

      const textChannel =
        await client.channels.fetch(textChannelId);

      // 名前変更
      await vcChannel.setName(
        `周回【${message.content}】`
      );

      await textChannel.setName(
        `部屋番号【${message.content}】`
      );

      await message.reply(
        `部屋番号 ${message.content} に変更したよっ！`
      );

    } catch (err) {

      console.error(err);

      await message.reply(
        "失敗…"
      );
    }
  }
});

client.login(process.env.TOKEN);
