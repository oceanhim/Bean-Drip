const BeanUser = require('../../models/userModel.js');
const Discord = require('discord.js');
const { sortArray } = require('../../functions/sort.js');
const { client } = require('../../ready.js');
const { itemsArray } = require('../../items/items.js'); 
const { weaponsArray } = require('../../weapons/weapons.js');

module.exports = {
    commands: ['shop', 'store'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 0,
    callback: async (message, arguments, text) => {
      try {
        const foundUser = await BeanUser.findOne({ duid: message.author.id });
        if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)

        const guilds = client.guilds.cache.array()
        let shop = []
        itemsArray.forEach(item => {
            if (item.buyable == true) {
                shop.push(item)
            }
        })
        weaponsArray.forEach(weapon => {
            if (weapon.buyable == true) {
                shop.push(weapon)
            }
        })
        sortArray(shop, "price")
        /**
         * Creates an embed with guilds starting from an index.
         * @param {number} start The index to start from.
         */
        const generateEmbed = start => {
            const current = guilds.slice(start, start + 5)
            let subtractAmount1 = shop.length - 5
            let subtractAmount2
            // you can of course customise this embed however you want
            const embed = new Discord.MessageEmbed()
                .setTitle(`Showing items ${start + 1}-${start + 5} out of ${shop.length}`)
                .setColor('#2ACAEA')
            let number = 0
            let inven = shop.slice(start, (start + 5))
            inven.forEach(g => {
                number += 1;
                if (g.buyable == true) {
                    if (g.symbol == "none") {
                        embed.addField(g.name, `**PRICE:** :canned_food: ${g.price}`)
                    } else {
                        embed.addField(g.symbol + g.name, `**PRICE:** :canned_food: ${g.price}`)
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
            if (shop.length <= 5) return
            // react with the right arrow (so that the user can click it) (left arrow isn't needed because it is the start)
            message.react('➡️')
            const collector = message.createReactionCollector(
                // only collect left and right arrow reactions from the message author
                (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
                // time out after a minute
                { time: 60000 }
            )

            let currentIndex = 0
            collector.on('collect', (reaction) => {
                // remove the existing reactions
                message.reactions.removeAll().then(async () => {
                    // increase/decrease index
                    reaction.emoji.name === '⬅️' ? currentIndex -= 5 : currentIndex += 5
                    // edit message with new embed
                    message.edit(generateEmbed(currentIndex))
                    // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
                    if (currentIndex !== 0) await message.react('⬅️')
                    // react with right arrow if it isn't the end
                    if (currentIndex + 5 < shop.length) message.react('➡️')
                })
            })
        })
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in shop/store:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}