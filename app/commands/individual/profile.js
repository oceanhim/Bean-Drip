const BeanUser = require('../../models/userModel.js');
const beanFactory = require('../../models/factoryModel.js');
const Discord = require('discord.js');

module.exports = {
    commands: ['profile', 'p'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 0,
    callback: async (message, arguments, text) => {
      try {
        const foundUser = await BeanUser.findOne({duid:message.author.id});
        if(!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)

        if(arguments.length == 0) {
            let factoryNameg;
            try {
                const usersfactory = await beanFactory.findOne({dfid:foundUser.factory})
                if(!usersfactory) {
                    factoryNameg = "No factory yet"
                } else {
                    factoryNameg = usersfactory.name
                }
            }
            catch(err) {
                let errorChannel = message.guild.channels.cache.find(channel => channel.id === "836738105942867978");
                errorChannel.send(`Error in profile show, (if this error includes "Cannot read property 'name' of undefined" then it is expected): ` + err)
            }

            const profileEmbed = new Discord.MessageEmbed()
                .setColor('#A52A2A')
                .setTitle('Your Profile')
                // .setURL('https://discord.js.org/')
                .setAuthor(`${message.author.username}'s bean status`, 'https://th.bing.com/th/id/OIP.E7UMU38xQDHF9gLzxLrZ6QHaHa?w=161&h=180&c=7&o=5&pid=1.7')
                .setThumbnail('https://th.bing.com/th/id/OIP.GrWNB9vGQDaXjF6HMw2MZQHaGf?w=188&h=180&c=7&o=5&pid=1.7')
                .addFields(
                    { name:`Bean Factory`, value:`:office: ${factoryNameg}` },
                    { name: 'BEAN Count', value: `:canned_food: ${foundUser.beans}` },
                    // { name: '\u200B', value: '\u200B' },
                    { name:`Health`, value:`:heart: ${foundUser.health}` },
                    { name:`Max Health`, value:`:heart: ${foundUser.maxHealth}` },
                    { name:'Level', value: `:arrow_up: Level ${foundUser.level}` },
                    { name:`Xp`, value:`:sparkles: ${foundUser.xp}/${foundUser.xpMax}` },
                    { name:`Right Hand`, value:`:right_facing_fist: ${foundUser.equipped.name}` },
                    { name:`Left Hand`, value:`:left_facing_fist: ${foundUser.equipped2.name}` },
                    { name:`Revive Token Amount`, value:`:angel: ${foundUser.reviveTokens} tokens` },
                    { name:'Inventory', value: ':moneybag: To view your inventory, type `bn-inventory`' },
                    { name:`Damage`, value:`:crossed_swords: ${foundUser.damage}`, inline:true },
                    { name:`Defense`, value:`:shield: ${foundUser.defense}`, inline:true },
                    { name:`Critical Hit Chance`, value:`:boom: ${foundUser.critical}/1000`, inline:true },
                    { name:`Passive Mode`, value:`:neutral_face: ${foundUser.passive}` }
                )
                .setTimestamp()
                .addField("Help","[**`Support Server`**](https://discord.gg/fH36usNekr) Click to join the support server.")  

            message.channel.send(profileEmbed);
        }
        if(arguments.length == 1) {
            const otherUser = await BeanUser.findOne({duid:arguments[0]});
            if(!otherUser) return message.channel.send(`Invalid Id given. Maybe the person you are trying to lookup hasn't created an account yet.`)

            let factoryNameg;
            try {
                const usersfactory = await beanFactory.findOne({dfid:otherUser.factory})
                if(!usersfactory) {
                    factoryNameg = "No factory yet"
                } else {
                    factoryNameg = usersfactory.name
                }
            }
            catch(err) {
                let errorChannel = message.guild.channels.cache.find(channel => channel.id === "836738105942867978");
                errorChannel.send(`Error(this error is expected if it include "Cannot read property 'name' of undefined"): ` + err)
            }

            const profileEmbed2 = new Discord.MessageEmbed()
            .setColor('#A52A2A')
            .setTitle(`${otherUser.name}'s profile`)
            // .setURL('https://discord.js.org/')
            .setAuthor(`${otherUser.name}'s bean status`, 'https://th.bing.com/th/id/OIP.E7UMU38xQDHF9gLzxLrZ6QHaHa?w=161&h=180&c=7&o=5&pid=1.7')
            .setThumbnail('https://th.bing.com/th/id/OIP.GrWNB9vGQDaXjF6HMw2MZQHaGf?w=188&h=180&c=7&o=5&pid=1.7')
            .addFields(
                { name:`Bean Factory`, value:`:office: ${factoryNameg}` },
                { name: 'BEAN Count', value: `:canned_food: ${otherUser.beans}` },
                // { name: '\u200B', value: '\u200B' },
                { name: 'Health', value: `:heart: ${otherUser.health}` },
                { name:`Max Health`, value:`:heart: ${otherUser.maxHealth}` },
                { name: 'Level', value: `:arrow_up: ${otherUser.level}` },
                { name:`Xp`, value:`:sparkles: ${otherUser.xp}/${otherUser.xpMax}` },
                { name:`Right Hand`, value:`:punch: ${otherUser.equipped.name}` },
                { name:`Left Hand`, value:`:punch: ${otherUser.equipped2.name}` },
                { name:`Revive Token Amount`, value:`:angel: ${otherUser.reviveTokens} tokens` },
                { name: 'Inventory', value: 'To view your inventory, type `bn-inventory`' },
                { name:`Damage`, value:`:crossed_swords: ${otherUser.damage}`, inline:true },
                { name:`Defense`, value:`:shield: ${otherUser.defense}`, inline:true },
                { name:`Critical Hit Chance`, value:`:boom: ${otherUser.critical}/1000`, inline:true },
                { name:`Passive Mode`, value:`:neutral_face: ${otherUser.passive}` }
            )
            .setTimestamp()
            .addField("Help","[**`Support Server`**](https://discord.gg/fH36usNekr) Click to join the support server.")  

        message.channel.send(profileEmbed2);
        }
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in p/profile:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}