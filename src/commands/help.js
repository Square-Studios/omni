const { Embed } = require("guilded.js");

module.exports = {
  aliases: ["h", "commands"],
  execute: (msg) => {
    const HelpEmbed = new Embed()
      .setTitle("Help")
      .setDescription(
        `[Omni](https://www.guilded.gg/b/ff8e81bc-1a75-4a7c-8c59-4bca19f0b00f) is a fast moderation bot to keep your communities safe.`
      )
      .addField(
        "Bot Commands",
        `**?ping**\n> Play ping pong with the bot\n**?help**\n> Get all commands\n**?say**\n> Repeats what you say after the command\n**?warn <@user> <infraction_points> <reason>**\n> Warn a user with customizable infraction points\n**?warnhistory <@user>**\n> Get all warnings on a user\n**?mute <@user> <time {i.e. 14m, 2h, 7d}> <reason>**\n> Mute a user for a customizable amount of time\n**?kick <@user> <reason>**\n> Kick a user\n**?ban <@user> <reason>**\n> Ban a user\n**?setrole <category {i.e. mute, staff}>**\n> Set the mute and staff roles`
      );
    msg.send((embed = HelpEmbed));
  },
  name: "help",
};
