const BeanUser = require('../../models/userModel.js');
const Discord = require('discord.js');

module.exports = {
    commands: ['trade', 't'],
    expectedArgs: '<itemName>',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 3,
    callback: async (message, arguments, text) => {
      try {
          const foundUser = await BeanUser.findOne({ duid: message.author.id });
          if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
          if (foundUser.inventory.length == 0) return message.channel.send(`You don't have anything to trade.`)
          if (foundUser.health < 0) return message.channel.send(`What do you think you're doing?!?! You're dead. Lmao`)
          if (arguments.length == 0) return message.channel.send(`You have to mention who you want to trade with.`)
          let otherUserId;
          if (arguments[0].length == 21) {
              otherUserId = arguments[0].substring(2, arguments[0].length - 1);
          }
          if (arguments[0].length == 22) {
              otherUserId = arguments[0].substring(3, arguments[0].length - 1);
          }
          if (otherUserId == foundUser.duid) return message.channel.send(`:rofl: HAHAHA, You can't trade with yourself silly!`)
          const otherUser = await BeanUser.findOne({ duid: otherUserId });
          if (!otherUser) return message.channel.send(`The user you want to trade with doesn't have an account yet.`)
          let user = message.guild.members.cache.get(otherUserId)
          message.channel.send(`${user}, do you wish to start a trade?`).then(async (msg) => {
              msg.react("✅")
              msg.react("❌")

              const filter = (reaction, duser) => reaction.emoji.name === '✅' && duser.id == otherUser.duid;
              const filter2 = (reaction, duser) => reaction.emoji.name === '❌' && duser.id == otherUser.duid;

              const collector = msg.createReactionCollector(filter, {
                  time: 3600000
              });
              const collector2 = msg.createReactionCollector(filter2, {
                  time: 3600000
              });

              collector.on('collect', async r => {
                  let firstOffer = { beans: 0, items: [] }
                  let secondOffer = { beans: 0, items: [] }

                  const generateEmbed = start => {
                      const tradeEmbed = new Discord.MessageEmbed()
                          .setColor('#306E4E')
                          .setTitle(`${foundUser.name}'s and ${otherUser.name}'s trade`)
                          .setDescription('Here people can view what they will trade/offer with others')
                          .setThumbnail('https://www.bing.com/th?id=OIP.NaDNCSX3gwD07I9PCr7yBAHaEL&w=298&h=160&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2')
                          .addFields(
                              { name: `${foundUser.name} offers`, value: `Below is what ${foundUser.name} is willing to trade`, inline: true },
                              { name: `${otherUser.name} offers`, value: `Below is what ${otherUser.name} is willing to trade`, inline: true },
                              { name: '\u200B', value: '\u200B' },
                              { name: `items: `, value: `Below is what ${foundUser.name} is willing to trade in items`, inline: true },
                              { name: `Items: `, value: `Below is what ${otherUser.name} is willing to trade in Items`, inline: true },
                          )
                          .setTimestamp()
                          .setFooter('An intense trade takes place...');
                      return tradeEmbed
                  }
                  message.channel.send(generateEmbed(0)).then(msg => {
                      msg.react("✅")
                      msg.react("❌")

                      const filter3 = (reaction, duser) => reaction.emoji.name === '✅' && duser.id == otherUser.duid && duser.id == foundUser.duid;
                      const filter4 = (reaction, duser) => reaction.emoji.name === '❌' && duser.id == otherUser.duid || duser.id == foundUser.duid;

                      const collector3 = msg.createReactionCollector(filter3, {
                          time: 3600000
                      });
                      const collector4 = msg.createReactionCollector(filter4, {
                          time: 3600000
                      });
                      collector3.on('collect', async r => {
                          // FIRST OFFER
                          foundUser.beans -= firstOffer.beans
                          // Your Inventory
                          let arrayIndex = -1
                          let realIndex = -1;
                          // Offer
                          let arrayIndex2 = -1
                          let realIndex2 = -1;
                          foundUser.inventory.forEach(thing => {
                              arrayIndex += 1
                              firstOffer.forEach(item => {
                                  arrayIndex2 += 1
                                  if (item.name == thing.name) {
                                      realIndex = arrayIndex
                                      realIndex2 = arrayIndex2
                                      foundUser.inventory.splice(realIndex, 1)
                                      firstOffer.splice(realIndex2, 1)
                                  }
                              })
                          })
                          // Second OFFER
                          otherUser.beans -= secondOffer.beans
                          // Other Inventory
                          let arrayIndex3 = -1
                          let realIndex3 = -1;
                          // Offer
                          let arrayIndex4 = -1
                          let realIndex4 = -1;
                          otherUser.inventory.forEach(thing => {
                              arrayIndex += 1
                              secondOffer.forEach(item => {
                                  arrayIndex2 += 1
                                  if (item.name == thing.name) {
                                      realIndex3 = arrayIndex3
                                      realIndex4 = arrayIndex4
                                      otherUser.inventory.splice(realIndex3, 1)
                                      secondOffer.splice(realIndex4, 1)
                                  }
                              })
                          })
                          message.channel.send(`Trade completed!`)
                      })
                      collector4.on('collect', async r => {
                          message.channel.send(`Trade declined`)
                          return
                      })
                  })
              })
              collector2.on('collect', async r => {
                  message.channel.send(`Trade declined, go eat some beans`)
                  return
              })
          })
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in trade:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}