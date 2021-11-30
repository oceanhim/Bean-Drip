const BeanUser = require('../../models/userModel.js');

module.exports = {
    commands: ['heal', 'revive'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 0,
    callback: async (message, arguments, text) => {
      try {
          const foundUser = await BeanUser.findOne({ duid: message.author.id });
          if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
          if (foundUser.health > 0) return message.channel.send(`What do you think you're doing?!?! You aren't dead ||yet||. Lmao`)
          let revivePrice = (foundUser.maxHealth * 4)
          if (!foundUser.reviveTokens) {
              foundUser.reviveTokens = 0
          }
          message.channel.send(`You call upon the bean angels of the overworld. You ask them to put life back into your body. 
        *Angels:*
        \n> Request granted, though I warn you, bean soldier, it comes at a price, a price of :canned_food: **${revivePrice}** BEANS. You have **${foundUser.reviveTokens}** revive tokens left
        \n*React with :skull: To stay dead or react with 👼 to have the angels revive you*
    `).then(async (msg) => {
              msg.react("💀")
              msg.react('👼')
              const filter = (reaction, duser) => reaction.emoji.name === '💀' && duser.id == foundUser.duid;
              const filter2 = (reaction, duser) => reaction.emoji.name === '👼' && duser.id == foundUser.duid;
              const collector = msg.createReactionCollector(filter, {
                  time: 20000
              });
              const collector2 = msg.createReactionCollector(filter2, {
                  time: 20000
              });

              collector2.on('collect', async r => {
                  if (foundUser.reviveTokens > 0) {
                      foundUser.reviveTokens -= 1
                      foundUser.health = foundUser.maxHealth
                      message.channel.send(`You have used a revive token`)
                  } else {
                      foundUser.health = foundUser.maxHealth
                      foundUser.beans -= revivePrice
                  }
                  message.channel.send(`*Reviving*`)
                  foundUser.save()
                  client.setTimeout(() => {
                      message.channel.send(`YOU HAVE BEEN REVIVED BY THE ANCIENT BEAN ANGELS. Try not to die again lol. :rofl:`)
                  }, 3000);
              })
              collector.on('collect', async r => {
                  message.channel.send(`You have declined the offer, and must therefore stay perished as a dry bean soldier.`)
              })
          })
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in heal/revive:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}