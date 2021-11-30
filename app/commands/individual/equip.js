const BeanUser = require('../../models/userModel.js');
const { weaponsArray } = require('../../weapons/weapons.js');
const { updateFurther } = require('../../functions/updateFurther.js');
const { timeDiffCalc } = require('../../functions/timeDiffCalc.js');

module.exports = {
    commands: ['equip'],
    expectedArgs: '<weaponName>',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 1,
    maxargs: 1,
    callback: async (message, arguments, text) => {
      try {
          const foundUser = await BeanUser.findOne({ duid: message.author.id });
          if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
          if (foundUser.health <= 0) return message.channel.send(`What do you think you're doing?!?! YOU ARE D E A D. Lmao`)
          if (!foundUser.lastEquipped) {
              foundUser.lastEquipped = Date.now()
              foundUser.save()
          }
          if (timeDiffCalc(foundUser.lastEquipped, Date.now(), "minutes") < 5) return message.channel.send(`You can't equip anything for another **${4 - (timeDiffCalc(foundUser.lastEquipped, Date.now(), "minutes"))}** minutes and **${60 - (timeDiffCalc(foundUser.lastEquipped, Date.now(), "seconds"))}** seconds. The reason for this is so you can't attack someone with good weapons and then quickly switch over to good armor.`)
          if (arguments.length == 0) return message.channel.send(`You need to state what you want to equip.`)
          const name = arguments.splice(0).join(' ');
          // const name = name1.toLowerCase();
          let invItem = foundUser.inventory.find(thing => thing.name == name)
          if (!invItem) return message.channel.send(`I couldn't find an **${name}** in your inventory.`)
          let isWeapon = weaponsArray.find(weapon => weapon.name == invItem.name)
          if (!isWeapon) return message.channel.send(`That is not a weapon.`)

          message.channel.send('Which hand do you want to hold this in? Either react with 🤜 to equip this weapon to your right hand, or react with 🤛 to equip the weapon to your left hand.').then(async (msg) => {
              msg.react("🤛")
              msg.react('🤜')
              const filter = (reaction, duser) => reaction.emoji.name === '🤛' && duser.id == foundUser.duid;
              const filter2 = (reaction, duser) => reaction.emoji.name === '🤜' && duser.id == foundUser.duid;
              const collector = msg.createReactionCollector(filter, {
                  time: 20000
              });
              const collector2 = msg.createReactionCollector(filter2, {
                  time: 20000
              });

              collector2.on('collect', async r => {
                  let currentEquipped = foundUser.equipped;
                  let arrayIndex = -1
                  let realIndex = -1
                  foundUser.inventory.forEach(thing => {
                      arrayIndex += 1
                      if (thing.name == name) {
                          realIndex = arrayIndex
                      }
                  })
                  foundUser.inventory.push(currentEquipped)
                  foundUser.equipped = invItem
                  foundUser.inventory.splice(realIndex, 1)
                  foundUser.damage -= currentEquipped.dmgBoost;
                  foundUser.defense -= currentEquipped.defenseBoost;
                  foundUser.critical -= currentEquipped.critBoost;
                  foundUser.damage += foundUser.equipped.dmgBoost;
                  foundUser.defense += foundUser.equipped.defenseBoost;
                  foundUser.critical += foundUser.equipped.critBoost;
                  if (foundUser.critical > 1000) {
                      foundUser.critical = 1000
                  }
                  foundUser.lastEquipped = Date.now()
                  foundUser.save()
                  updateFurther(foundUser.factory, foundUser)
                  message.channel.send(`You have equipped the **${invItem.name}** in your right hand.`)
              })
              collector.on('collect', async r => {
                  if (!foundUser.equipped2) {
                      foundUser.equipped2 = weaponsArray[0]
                  }
                  let currentEquipped = foundUser.equipped2;
                  let arrayIndex = -1
                  let realIndex = -1
                  foundUser.inventory.forEach(thing => {
                      arrayIndex += 1
                      if (thing.name == name) {
                          realIndex = arrayIndex
                      }
                  })
                  foundUser.inventory.push(currentEquipped)
                  foundUser.equipped2 = invItem
                  foundUser.inventory.splice(realIndex, 1)
                  foundUser.damage -= currentEquipped.dmgBoost;
                  foundUser.defense -= currentEquipped.defenseBoost;
                  foundUser.critical -= currentEquipped.critBoost;
                  foundUser.damage += foundUser.equipped2.dmgBoost;
                  foundUser.defense += foundUser.equipped2.defenseBoost;
                  foundUser.critical += foundUser.equipped2.critBoost;
                  foundUser.save()
                  foundUser.lastEquipped = Date.now()
                  updateFurther(foundUser.factory, foundUser)
                  message.channel.send(`You have equipped the **${invItem.name}** in your left hand`)
              })
          })
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in equip:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}