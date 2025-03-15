// DOES NOT WORK CORRECTLY

const { Embed } = require("guilded.js");
const { addKey, getKey } = require("./db/databaseUtils");

module.exports = {
  name: "warn",
  aliases: ["w"],
  execute: async (msg, args) => {
    if (args.length < 2) {
      return msg.send("Usage: ?warn <@user> <reason> [infraction_points]");
    }

    const user = args[0];
    const infractionPoints = args.length > 2 && !isNaN(parseInt(args[args.length - 1], 10)) 
      ? parseInt(args[args.length - 1], 10) 
      : 5;
    const reason = args.length > 2 && !isNaN(parseInt(args[args.length - 1], 10)) 
      ? args.slice(1, args.length - 1).join(" ") 
      : args.slice(1).join(" ");

    if (isNaN(infractionPoints)) {
      return msg.send("Infraction points must be a number.");
    }

    const warnings = getKey(`warnings.${user}`) || [];

    warnings.push({ infractionPoints, reason, date: new Date().toISOString() });
    addKey(`warnings.${user}`, warnings);

    const totalInfractionPoints = warnings.reduce((total, warning) => total + warning.infractionPoints, 0);

    const warningList = warnings.map(warning => `Reason: ${warning.reason}\nDate: ${warning.date}\nInfraction Points: ${warning.infractionPoints}`).join("\n\n");

    const WarnEmbed = new Embed()
      .setColor(0xff0000)
      .setTitle("User Warned")
      .addField("User", user, true)
      .addField("Infraction Points", infractionPoints.toString(), true)
      .addField("Total Infraction Points", totalInfractionPoints.toString(), true)
      .addField("Warnings", warningList);

    await msg.send(WarnEmbed);
  },
};
