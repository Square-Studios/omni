module.exports = {
  name: "say",

  aliases: ["speak", "talk", "s", "echo"],

  execute: (msg, args) => {
    if (!args.length) return msg.send("You must give me something to echo!");

    msg.send(args.join(" "));
  },
};
