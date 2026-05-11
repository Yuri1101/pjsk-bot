const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const express = require("express");
const cron = require("node-cron");

const app = express();

const PORT =
  process.env.PORT || 3000;

// ======================
// Render用
// ======================

app.get("/", (req, res) => {
  res.send("Bot running");
});

app.listen(PORT, () => {
  console.log(`Web server started`);
});

// ======================
// Discord Bot
// ======================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ======================
// 共通設定
// ======================

// 通知 & 数字入力チャンネル
const channelId =
  "1487402528609013760";

// VCチャンネルID
const vcChannelId =
  "1380947003407728780";

// テキストチャンネルID
const textChannelId =
  "1380946557511270421";

// イベント終了日時
const endDate =
  new Date(
    "2026-05-29T20:00:00+09:00"
  );


// ======================
// Bot起動
// ======================

client.once("clientReady", async () => {

  console.log("Bot起動");

  // ======================
  // 毎時00分通知
  // ======================

  cron.schedule("0 * * * *", async () => {

    try {

      const channel =
        await client.channels.fetch(
          channelId
        );

      const now =
        new Date();

      const diff =
        endDate - now;

      const hours =
        Math.floor(
          diff / 1000 / 60 / 60
        );

      const minutes =
        Math.floor(
          (diff / 1000 / 60) % 60
        );

      await channel.send(
        `⏰ イベント終了まで\n${hours}時間${minutes}分だよっ`
      );

    } catch (err) {

      console.error(err);
    }
  });

  // ======================
  // 毎時45分通知
  // ======================

  cron.schedule("45 * * * *", async () => {

    try {

      const channel =
        await client.channels.fetch(
          channelId
        );

      await channel.send(
        "たいてたいてー！"
      );

    } catch (err) {

      console.error(err);
    }
  });
});

// ======================
// 5桁で部屋変更
// ======================

client.on("messageCreate", async (message) => {

  if (message.author.bot) return;

  // 指定チャンネルのみ
  if (
    message.channel.id !==
    channelId
  ) return;

  // 5桁数字判定
  if (/^\d{5}$/.test(message.content)) {

    try {

      const vcChannel =
        await client.channels.fetch(
          vcChannelId
        );

      const textChannel =
        await client.channels.fetch(
          textChannelId
        );

      // VC変更
      await vcChannel.setName(
        `周回【${message.content}】`
      );

      // テキスト変更
      await textChannel.setName(
        `部屋番【${message.content}】`
      );

      await message.reply(
        `部屋番号 ${message.content} に変更したよっ！`
      );

    } catch (err) {

      console.error(err);

      await message.reply(
        "変更失敗"
      );
    }
  }
});

// ======================
// ログイン
// ======================

client.login(process.env.TOKEN)
  .then(() => {
    console.log("ログイン成功");
  })
  .catch((err) => {
    console.error("ログイン失敗");
    console.error(err);
  });
