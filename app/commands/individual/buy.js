const BeanUser = require('../../models/userModel.js');
const { weaponsArray } = require('../../weapons/weapons.js');
const { itemsArray } = require('../../items/items.js');
const { updateFurther } = require('../../functions/updateFurther.js');

module.exports = {
    commands: ['buy'],
    expectedArgs: '<itemName>',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 1,
    callback: async (message, arguments, text) => {
      try {
        const foundUser = await BeanUser.findOne({ duid: message.author.id });
        if (!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
        if (foundUser.health <= 0) return message.channel.send(`What do you think you're doing?!?! YOU ARE D E A D. Lmao`)
        if (arguments.length == 0) return message.channel.send(`You need to state what you want to buy`)

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
        const name = arguments.splice(0).join(' ');
        let shopItem = shop.find(thing => thing.name == name)
        if (!shopItem) return message.channel.send(`I couldn't find an **${name}** in the shop.`)
        if (foundUser.beans <= shopItem.price) return message.channel.send(`You don't have enough beans in order to buy that.`)

        let price = shopItem.price;
        if (message.member.roles.cache.some(role => role.name === 'Premium Member')) {
            price /= 2;
        }
        foundUser.beans -= price
        foundUser.inventory.push(shopItem)
        foundUser.save()
        updateFurther(foundUser.factory, foundUser)

        message.channel.send(`You have bought the **${shopItem.name}** for **${price}** BEANS! :tada:`)
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in buy:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}