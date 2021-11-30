const BeanUser = require('../../models/userModel.js');
const { weaponsArray } = require('../../weapons/weapons.js');
const { timeDiffCalc } = require('../../functions/timeDiffCalc.js');

module.exports = {
    commands: ['attack'],
    expectedArgs: '<userMention>',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 1,
    maxargs: 1,
    callback: async (message, arguments, text) => {
      try {
          const foundUser = await BeanUser.findOne({ duid: message.author.id });
          if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
          if (foundUser.passive) return message.channel.send(`Bruh, you can't attack when passive mode is on, lmao`)

          if (arguments.length == 0) return message.channel.send(`You need to specify who you want to attack.`)
          let otherUserId;
          if (arguments[0].length == 21) {
              otherUserId = arguments[0].substring(2, arguments[0].length - 1);
          }
          if (arguments[0].length == 22) {
              otherUserId = arguments[0].substring(3, arguments[0].length - 1);
          }
          if (otherUserId == foundUser.duid) return message.channel.send(`:rofl: HAHAHA, You can't attack yourself silly!`)
          const otherUser = await BeanUser.findOne({ duid: otherUserId });
          if (!otherUser) return message.channel.send(`The user you want to attack doesn't have an account yet.`)
          if (otherUser.passive) return message.channel.send(`The user you want to attack has passive mode on.`)
          if (timeDiffCalc(foundUser.lastAttacked, Date.now(), "hours") < 3) {
              return message.channel.send(`Chill dude! You are pretty aggresive right now. You gotta wait another **${2 - timeDiffCalc(foundUser.lastAttacked, Date.now(), "hours")}** hours and **${60 - timeDiffCalc(foundUser.lastAttacked, Date.now(), "minutes")}** minutes before you can attack again.`)
          } else {
              if (timeDiffCalc(otherUser.beenAttacked, Date.now(), "hours") < 5) {
                  return message.channel.send(`Hold up, wait a minute. This user has already been attacked in the last **5** hours. Give them a break!`)
              } else {
                  if (otherUser.health <= 0) return message.channel.send(`Jeez dude, stop tryna beat up a dead carcass.`)
                  if (!otherUser.beenAttacked) {
                      otherUser.beenAttacked = Date.now()
                  }
                  if (!foundUser.lastAttacked) {
                      foundUser.lastAttacked = Date.now()
                  }

                  let damageDealt = 0
                  let critChance = Math.floor((Math.random() * 1000) + 0)

                  if (critChance <= foundUser.critical) {
                      let percentageAmount = Math.round(foundUser.damage * 0.25)
                      damageDealt += percentageAmount
                      message.channel.send(`OOOOO, You landed a crit hit dealing an extra :boom: **${percentageAmount}** damage!`)
                  }
                  damageDealt += foundUser.damage
                  damageDealt -= otherUser.defense
                  if (damageDealt < 0) {
                      damageDealt = 0
                  }
                  try {
                      let ogWeapon = weaponsArray.find(weapon => weapon.name == foundUser.equipped.name)
                      let ogWeapon2 = weaponsArray.find(weapon => weapon.name == foundUser.equipped2.name)
                      if (!ogWeapon.effect) {
                          ogWeapon.effect = async function () { }
                      }
                      if (!ogWeapon2.effect) {
                          ogWeapon2.effect = async function () { }
                      }
                      ogWeapon.effect(message, arguments, foundUser, otherUser, damageDealt)
                      ogWeapon2.effect(message, arguments, foundUser, otherUser, damageDealt)
                      otherUser.health -= damageDealt;
                      if (otherUser.health <= 0) {
                          let lootAmount = (otherUser.beans * 0.2)
                          let lootAmount1 = Math.round(lootAmount)
                          if (lootAmount1 < 0) {
                              lootAmount1 = 0
                          }
                          foundUser.beans += lootAmount1
                          foundUser.xp += 50;
                          otherUser.beans -= lootAmount1;
                          otherUser.health = 0;
                          foundUser.playersKilled += 1
                          foundUser.achievements[3].currentCollected += 1
                          achievementCollect(foundUser.achievements[3], message, arguments, foundUser)
                          let user = message.guild.members.cache.get(otherUser.duid)
                          user.send(`OOF! You were killed by ${foundUser.name} who was using a **${foundUser.equipped.name}** and a **${foundUser.equipped2.name}**`)
                          message.channel.send(`You have killed **${otherUser.name}**!! You have looted **${lootAmount1}** BEANS :canned_food:!! You also gained **50** xp for this honorable feat!`)
                      }

                      foundUser.lastAttacked = Date.now()
                      let user = message.guild.members.cache.get(otherUser.duid)
                      user.send(`${foundUser.name} attacked you dealing :boom: ${damageDealt} damage.`)
                      message.channel.send(`OOOOO, You have dealth a WHOPPING :boom: **${damageDealt}** :boom: DAMAGE! Your opponent now has :heart: **${otherUser.health}**!`)
                      let attackChanceBack = Math.floor((Math.random() * 100) + 0)
                      if (attackChanceBack <= 50) {
                          let backDmgDealt = otherUser.damage
                          backDmgDealt -= foundUser.defense
                          backDmgDealt /= 2
                          if (backDmgDealt <= 0) {
                              backDmgDealt = 0
                          }
                          foundUser.health -= backDmgDealt
                          message.channel.send(`Right after you step towards your opponent, and have dealt your damage, they side-step hoping to deal a blow towards their attacker.`)
                          client.setTimeout(() => {
                              let attacks = [`*WHOOSH*!!, They front flip over you and slash you across your back, dealing a mighty :boom: **${backDmgDealt}** DAMAGE!`, `*BAM*!!! Your opponent retreats back three steps, and comes running at you, bashing the end of their weapon STRAIGHT into your forehead leaving you dizzy, dealing a crazy :boom: **${backDmgDealt}** damage!`, `*SLASH*!!! Ducking, as you try to hit them again, your opponent sweeps your leg, making you fall on your back, and pounding their fist into your face, dealing a air-sucking :boom: *${backDmgDealt}* damage! https://media.tenor.co/videos/33edd556a81f2f79078a054f35544980/mp4`]
                              let responseNumber = Math.floor((Math.random() * (attacks.length - 1)) + 0)
                              let response = attacks[responseNumber]
                              message.channel.send(response)
                          }, 3000)
                          if (foundUser.health <= 0) {
                              let lootAmount = (foundUser.beans * 0.2)
                              let lootAmount1 = Math.round(lootAmount)
                              otherUser.beans += lootAmount1
                              otherUser.xp += 100;
                              foundUser.beans -= lootAmount1;
                              foundUser.health = 0;
                              let user = message.guild.members.cache.get(foundUser.duid)
                              user.send(`OOF! HAHAHA, you tried to kill ${otherUser.name} who was using a **${otherUser.equipped.name}** and a **${otherUser.equipped2.name}**, but instead, they KILLED YOU :rofl:`)
                              user.send(`https://images-ext-2.discordapp.net/external/syLd4TqJfqJ6ougFTDhzdZUfjRocfLo4IaEzJpljWqc/%3Fv%3D1/https/cdn.discordapp.com/emojis/808954841207537665.gif `)
                              message.channel.send(`You have killed **${foundUser.name}**!! You have looted **${lootAmount1}** BEANS :canned_food:!! You also gained **100** xp for killing someone who attcked you!`)
                              message.channel.send(`https://images-ext-2.discordapp.net/external/syLd4TqJfqJ6ougFTDhzdZUfjRocfLo4IaEzJpljWqc/%3Fv%3D1/https/cdn.discordapp.com/emojis/808954841207537665.gif `)
                          }
                      }
                      foundUser.save()
                      otherUser.save()
                  }
                  catch (err) {
                      let errorChannel = message.guild.channels.cache.find(channel => channel.id === "836738105942867978");
                      errorChannel.send(`Error while attacking: ` + err)
                      message.channel.send(`Sorry, There was an error while attacking. Lucky opponent.`)
                  }
              }
          }
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in attack:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}