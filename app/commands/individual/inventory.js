const BeanUser = require('../../models/userModel.js');
const beanFactory = require('../../models/factoryModel.js');
const { timeDiffCalc } = require('../../functions/timeDiffCalc');
const { levelUp } = require('../../functions/levelUp.js');
const { achievementCollect } = require('../../functions/achievement.js');
const { encounter } = require('../../functions/encounter.js');
const Discord = require('discord.js');

module.exports = {
    commands: ['inventory', 'i'],
    expectedArgs: '<userID>',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 1,
    callback: async (message, arguments, text) => {
      try {
        const foundUser = await BeanUser.findOne({duid:message.author.id});
        if(!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)

        if(arguments.length == 0) {
        let ezvar = 7

            let totalValue = 0
            foundUser.inventory.forEach(thing => {
                totalValue += thing.price
            })
            let allDifferent = []
        /**
         * Creates an embed with guilds starting from an index.
         * @param {number} start The index to start from.
         */
        const generateEmbed = start => {
            // const current = guilds.slice(start, start + 5)
        
            // you can of course customise this embed however you want
            foundUser.inventory.forEach(g => {
                let differentOne = allDifferent.find(dif => dif == g.name)
                if(!differentOne) {
                    allDifferent.push(g.name)
                }
            })
            let inven = allDifferent.slice(start, (start + 7))
            const embed = new Discord.MessageEmbed()
            .setTitle(`Showing slots ${start + 1}-${start + inven.length} out of ${allDifferent.length}`)
            .setDescription(`The total Value of your inventory is :canned_food: **${totalValue}** BEANS.`)
            .setColor('#0099ff')
            let number = 0
            let amount = 0
            inven.forEach(g => {
                number += 1;
            
                if(number <= ezvar) {
                    let filtered = foundUser.inventory.filter(thing => thing.name == g)
                    let foundInv = foundUser.inventory.find(weaponThing => weaponThing.name == g)
                    amount = filtered.length
                if(foundInv.symbol == "none" || foundInv.symbol === undefined) {
                    embed.addField(`x` + amount + ` ` + foundInv.name, `WORTH: :canned_food: ${foundInv.price}`)
                } else {
                    embed.addField(`x` + amount + ` ` + foundInv.symbol + foundInv.name, `WORTH: :canned_food: ${foundInv.price}`)
                }    
                }
            })

            return embed
        }
        
        // edit: you can store the message author like this:
        const author = message.author
        
        // send the embed with the first 10 guilds
        message.channel.send(generateEmbed(0)).then(message => {
            // exit if there is only one page of guilds (no need for all of this)
            if (allDifferent.length <= ezvar) return
            // react with the right arrow (so that the user can click it) (left arrow isn't needed because it is the start)
            message.react('➡️')
            const collector = message.createReactionCollector(
            // only collect left and right arrow reactions from the message author
            (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
            // time out after a minute
            {time: 60000}
            )
        
            let currentIndex = 0
            collector.on('collect',(reaction) => {
            // remove the existing reactions
            message.reactions.removeAll().then(async () => {
                // increase/decrease index
                reaction.emoji.name === '⬅️' ? currentIndex -= ezvar : currentIndex += ezvar
                // edit message with new embed
                message.edit(generateEmbed(currentIndex))
                // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
                if (currentIndex !== 0) await message.react('⬅️')
                // react with right arrow if it isn't the end
                if (currentIndex + ezvar < allDifferent.length) message.react('➡️')
            })
            })
        })
        }
        if(arguments.length == 1) {
            const otherUser = await BeanUser.findOne({duid:arguments[0]});
            if(!otherUser) return message.channel.send(`Invalid Id given. Maybe the person you are trying to lookup hasn't created an account yet.`)
            
            let ezvar = 7

            let totalValue = 0
            otherUser.inventory.forEach(thing => {
                totalValue += thing.price
            })
            let allDifferent = []
        /**
         * Creates an embed with guilds starting from an index.
         * @param {number} start The index to start from.
         */
        const generateEmbed = start => {
            // const current = guilds.slice(start, start + 5)
        
            // you can of course customise this embed however you want
            otherUser.inventory.forEach(g => {
                let differentOne = allDifferent.find(dif => dif == g.name)
                if(!differentOne) {
                    allDifferent.push(g.name)
                }
            })
            let inven = allDifferent.slice(start, (start + 7))
            const embed = new Discord.MessageEmbed()
            .setTitle(`Showing slots ${start + 1}-${start + inven.length} out of ${allDifferent.length}`)
            .setDescription(`The total Value of your inventory is :canned_food: **${totalValue}** BEANS.`)
            .setColor('#0099ff')
            let number = 0
            let amount = 0
            inven.forEach(g => {
                number += 1;
            
                if(number <= ezvar) {
                    let filtered = otherUser.inventory.filter(thing => thing.name == g)
                    let foundInv = otherUser.inventory.find(weaponThing => weaponThing.name == g)
                    amount = filtered.length
                if(foundInv.symbol == "none" || foundInv.symbol === undefined) {
                    embed.addField(`x` + amount + ` ` + foundInv.name, `WORTH: :canned_food: ${foundInv.price}`)
                } else {
                    embed.addField(`x` + amount + ` ` + foundInv.symbol + foundInv.name, `WORTH: :canned_food: ${foundInv.price}`)
                }    
                }
            })

            return embed
        }
        
        // edit: you can store the message author like this:
        const author = message.author
        
        // send the embed with the first 10 guilds
        message.channel.send(generateEmbed(0)).then(message => {
            // exit if there is only one page of guilds (no need for all of this)
            if (allDifferent.length <= ezvar) return
            // react with the right arrow (so that the user can click it) (left arrow isn't needed because it is the start)
            message.react('➡️')
            const collector = message.createReactionCollector(
            // only collect left and right arrow reactions from the message author
            (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
            // time out after a minute
            {time: 60000}
            )
        
            let currentIndex = 0
            collector.on('collect',(reaction) => {
            // remove the existing reactions
            message.reactions.removeAll().then(async () => {
                // increase/decrease index
                reaction.emoji.name === '⬅️' ? currentIndex -= ezvar : currentIndex += ezvar
                // edit message with new embed
                message.edit(generateEmbed(currentIndex))
                // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
                if (currentIndex !== 0) await message.react('⬅️')
                // react with right arrow if it isn't the end
                if (currentIndex + ezvar < allDifferent.length) message.react('➡️')
            })
            })
        })
        } 
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in inventory/i:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}