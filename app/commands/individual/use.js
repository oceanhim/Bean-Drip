const BeanUser = require('../../models/userModel.js');  
const { itemsArray } = require('../../items/items.js');

module.exports = {
    commands: ['use'],
    expectedArgs: '<itemName>',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 1,
    maxargs: 1,
    callback: async (message, arguments, text) => {
      try {
          const foundUser = await BeanUser.findOne({ duid: message.author.id });
          if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
          if (foundUser.health <= 0) return message.channel.send(`What do you think you're doing?!?! YOU ARE D E A D. Lmao`)
          if (arguments.length >= 1) {
              const name = arguments.splice(0).join(' ');
              let invItem = foundUser.inventory.find(item => item.name == name)
              if (!invItem) return message.channel.send(`I could not find an **${name}** in your inventory, maybe there was a typo.`)
              let ogItem = itemsArray.find(item => item.name == invItem.name)

              ogItem.use(message, arguments)
              foundUser.save()
          } else {
              message.channel.send(`Please tell me what item you want to use, like: **bn-use Canned Beans**`)
          }
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in use:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}