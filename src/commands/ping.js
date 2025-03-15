const { Embed } = require("guilded.js");

module.exports = {
  aliases: ["ping"],
  execute: (msg) => {
    const emojis = ["😀", "😉", "🤨", "🔥😫", "🤠", "😼"];
    const CorrectEmbed = new Embed()
      .setColor(0x0000)
      .setTitle("Ping, pong!")
      .setDescription(
        `Pong! ${emojis[Math.floor(Math.random() * emojis.length)]}🏓`
      );
    const IncorrectEmbed = new Embed()
      .setColor(0x0000)
      .setTitle("Ping, pong!")
      .setDescription("Aw dang it! You win. 😔🏓");
    let chance = Math.floor(Math.random() * 10);
    if (chance < 6) {
      msg.send((embed = CorrectEmbed));
    } else {
      msg.send((embed = IncorrectEmbed));
    }
  },
  name: "ping",
};
