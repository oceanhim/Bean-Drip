const BeanUser = require('../../models/userModel.js');
const Discord = require('discord.js');
const readyFile = require('../../ready.js');
const { sortArray } = require('../../functions/sort.js')

module.exports = {
    commands: ['status', 'bstats'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 0,
    callback: async (message, arguments, text) => {
      try {
        let serverCount = 0
        let totalUsers = 0;
    
        let guildsArray = []
        for (const guild of readyFile.client.guilds.cache.array()) {
            guildsArray.push(guild)
        }
    
        for (const guild of guildsArray) {
            serverCount += 1
            totalUsers += guild.memberCount
        }
    
        sortArray(guildsArray, "memberCount")
    
        let createdAccounts = await BeanUser.find().countDocuments()
        message.channel.send(`Servers in: ${serverCount} \nAccounts Created: ${createdAccounts} \nTotal Users: ${totalUsers}`)
        let number = 0
        /**
         * Creates an embed with guilds starting from an index.
         * @param {number} start The index to start from.
        */
        const generateEmbed = start => {
        // you can of course customise this embed however you want
        const embed = new Discord.MessageEmbed()
            .setTitle(`Showing Servers ${start + 1}-${start + 5} out of ${guildsArray.length}`)
            .setDescription(`Here are all of the servers I'm in and their member count`)
            .setColor('#0099ff')
    
            let fiveServers = guildsArray.slice(start, (start + 5))
            fiveServers.forEach(g => {
            number += 1;  
            embed.addFields({name:`${number}. ${g.name}`, value:`${g.memberCount} members`})
            })
        return embed
        }
        
        // edit: you can store the message author like this:
        const author = message.author
        
        // send the embed with the first 10 guilds
        message.channel.send(generateEmbed(0)).then(message => {
        // exit if there is only one page of guilds (no need for all of this)
        if (guildsArray.length <= 5) return
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
            reaction.emoji.name === '⬅️' ? currentIndex -= 5 : currentIndex += 5
            reaction.emoji.name === '⬅️' ? number -= 10 : number += 0
            // edit message with new embed
            message.edit(generateEmbed(currentIndex))
            // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
            if (currentIndex !== 0) await message.react('⬅️')
            // react with right arrow if it isn't the end
            if (currentIndex + 5 < guildsArray.length) message.react('➡️')
            })
        })
        })
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in status/bstatus:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}