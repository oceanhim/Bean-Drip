const BeanUser = require('../../models/userModel.js');
const BeanFactory = require('../../models/factoryModel.js');
const Discord = require('discord.js');


module.exports = {
    commands: ['factory', 'f'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 0,
    callback: async (message, arguments, text) => {
      try {
        const foundUser = await BeanUser.findOne({duid:message.author.id});  
        if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)

          if (arguments.length == 0) {
              const foundFactory = await BeanFactory.findOne({ dfid: foundUser.factory });
              if (!foundFactory) {
                  message.channel.send(`You are not in a factory yet.`)
              } else {
                  let text = ``
                  foundFactory.generals.forEach(general => {
                      text += `\n${general.name}`
                  })
                  if (text == ``) {
                      text = `none`
                  }
                  let nametext = `${foundFactory.coowner.name}`;
                  if (foundFactory.coowner.name == "undefined" || foundFactory.coowner.name === undefined) {
                      nametext = `none`
                  }
                  const factoryEmbed = new Discord.MessageEmbed()
                      .setColor('#2CB1EE')
                      .setTitle(`:office: ${foundFactory.name}`)
                      .setAuthor('Name', 'https://th.bing.com/th/id/OIP.dqyJOF9yn0tb-kh_NooMzQHaHA?w=187&h=180&c=7&o=5&pid=1.7')
                      .setDescription('Here are the stats of your factory')
                      .setThumbnail('https://th.bing.com/th/id/OIP.dqyJOF9yn0tb-kh_NooMzQHaHA?w=187&h=180&c=7&o=5&pid=1.7')
                      .addFields(
                          { name: 'OWNER', value: `:crown: ${foundFactory.owner.name} :crown:` },
                          // { name: '\u200B', value: '\u200B' },
                          { name: 'Co-Owner', value: `:crossed_swords: ${nametext} :crossed_swords:` },
                          { name: 'Generals', value: `:military_helmet: ${text} :military_helmet:` },
                          { name: `Beans`, value: `:canned_food: ${foundFactory.beans}` },
                          { name: `Level`, value: `:arrow_up: ${foundFactory.level}` },
                          { name: `Member Count`, value: `:person_curly_hair: ${foundFactory.members.length}` },
                          { name: `Max Members Possible`, value: `:scales: ${foundFactory.capacity}` },
                          { name: `Income`, value: `:dollar: ${foundFactory.income}` },
                          { name: `factory id`, value: `:id: ${foundFactory.dfid}` },
                      )
                      .setTimestamp()
                      .setFooter('For more help on factories, type "bn-help 2"');

                  message.channel.send(factoryEmbed);
              }
            }
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in factory:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}