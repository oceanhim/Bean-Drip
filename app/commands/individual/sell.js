const BeanUser = require('../../models/userModel.js');
const { updateFurther } = require('../../functions/updateFurther.js');

module.exports = {
    commands: ['sell'],
    expectedArgs: '<itemName>',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 1,
    maxargs: 1,
    callback: async (message, arguments, text) => {
      try {
          const foundUser = await BeanUser.findOne({ duid: message.author.id });
          if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
          if (foundUser.health <= 0) return message.channel.send(`What do you think you're doing?!?! YOU ARE D E A D. Lmao`)
          if (arguments.length < 1) return message.channel.send(`You need to state what you want to sell.`)
          const name = arguments.splice(0).join(' ');
          let invitem = foundUser.inventory.find(thing => thing.name == name)
          if (!invitem) return message.channel.send(`You don't have an **${name}** in your inventory.`)
          if (invitem.name == "Fists" || invitem.name == "Broken-Bean-Sword") return message.channel.send(`Those are starter weapons, you can't sell those.`)

          let parsedAmount = arguments[1]
          let arrayIndex = -1;
          let realIndex = -1;
          let upTo = 0;

          foundUser.inventory.forEach(item => {
              arrayIndex += 1
              if (item.name == name) {
                  realIndex = arrayIndex
              }
          })

          // while(upTo < parsedAmount) {
          //     upTo += 1
          //     foundUser.inventory.forEach(item => {
          //         arrayIndex += 1
          //         if(item.name == name) {
          //             foundUser.beans += invitem.price
          //             foundUser.inventory.splice(arrayIndex, 1)
          //             arrayIndex = -1
          //             message.channel.send(`You have sold the **${name}** for **${invitem.price}** BEANS!!`)
          //             return
          //         }
          //     })
          // }
          foundUser.beans += invitem.price
          let supposedInventory = foundUser.inventory
          supposedInventory.splice(realIndex, 1)
          foundUser.inventory = supposedInventory
          message.channel.send(`You have sold the **${name}** for **${invitem.price}** BEANS!!`)
          foundUser.save()
          updateFurther(foundUser.factory, foundUser)
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in sell:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}