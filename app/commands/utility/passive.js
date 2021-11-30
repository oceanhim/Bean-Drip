const BeanUser = require('../../models/userModel.js');
const { timeDiffCalc } = require('../../functions/timeDiffCalc.js');

module.exports = {
    commands: ['passive'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
      try {
          const foundUser = await BeanUser.findOne({ duid: message.author.id });
          if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
          if (foundUser.health < 0) return message.channel.send(`What do you think you're doing?!?! You're dead. Lmao`)
          if ((timeDiffCalc(foundUser.passiveCooldown, Date.now(), "hours") < 12)) return message.channel.send(`You can't switch your passive mode for another **${(11 - timeDiffCalc(foundUser.passiveCooldown, Date.now(), "hours"))}** hours and **${(60 - timeDiffCalc(foundUser.passiveCooldown, Date.now(), "minutes"))}** minutes`)
          if (foundUser.passive) {
              message.channel.send(`Are you sure you want to turn passive mode off?`).then(async (msg) => {
                  msg.react("✅")

                  const filter = (reaction, duser) => reaction.emoji.name === '✅' && duser.id == foundUser.duid;

                  const collector = msg.createReactionCollector(filter, {
                      time: 20000
                  });

                  collector.on('collect', async r => {
                      foundUser.passive = false
                      if (!foundUser.passiveCooldown) {
                          foundUser.passiveCooldown = Date.now()
                      }
                      foundUser.passiveCooldown = Date.now()
                      foundUser.save()
                      message.channel.send(`Passive mode turned off!`)
                  })
              })
          } else {
              message.channel.send(`Are you sure you want to turn passive mode on?`).then(async (msg) => {
                  msg.react("✅")

                  const filter = (reaction, duser) => reaction.emoji.name === '✅' && duser.id == foundUser.duid;

                  const collector = msg.createReactionCollector(filter, {
                      time: 20000
                  });

                  collector.on('collect', async r => {
                      foundUser.passive = true
                      if (!foundUser.passiveCooldown) {
                          foundUser.passiveCooldown = Date.now()
                      }
                      foundUser.save()
                      message.channel.send(`Passive mode turned on!`)
                  })
              })
          }
      }
      catch(err) {
          let errorChannel = message.guild.channels.cache.find(channel => channel.id === "836738105942867978");
          errorChannel.send(`Error in passive: ` + err)
          message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}