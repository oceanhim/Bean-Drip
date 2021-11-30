const { Item } = require('../classes/item.js');
const BeanUser = require('../models/userModel');
const { weaponsArray } = require('../weapons/weapons.js')

//------------------------------------------------------------
const cannedBeansFunct = async function(recievedMessage, args) {
    const foundUser = await BeanUser.findOne({duid:recievedMessage.author.id});
    if(!foundUser) {
        recievedMessage.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
    } else {
        const name=args.splice(0).join(' ');
        if((foundUser.health + 1) > foundUser.maxHealth) {
            foundUser.beans += 10
            let arrayIndex = -1;
            let realIndex = -1
            let parsedAmount = parseInt(args[1])
            let useTimes = 0
            foundUser.inventory.forEach(item => {
                arrayIndex += 1
                if(item.name == name) {
                    realIndex = arrayIndex
                }
            })
            foundUser.inventory.splice(realIndex, 1)
            foundUser.health = foundUser.maxHealth
            foundUser.save()
            recievedMessage.channel.send(`You have exceeded your max hp so your hp is set to **${foundUser.maxHealth}** and you gained **10 beans**.`)
        } else {
            foundUser.beans += 10
            foundUser.health += 1
            let arrayIndex = -1;
            let realIndex = -1
            let parsedAmount = parseInt(args[1])
            let useTimes = 0
            foundUser.inventory.forEach(item => {
                arrayIndex += 1
                if(item.name == name) {
                    realIndex = arrayIndex
                }
            })
            foundUser.inventory.splice(realIndex, 1)
            foundUser.save()
            recievedMessage.channel.send(`You have healed **1 health** and gained **10 beans**`)
        }
        

    }
};

const CannedBeans = new Item(":canned_food:", "Canned Beans", 75, "A can of beans that can heal you for 1 hp and give you 10 beans.", cannedBeansFunct, true)
//------------------------------------------------------------
const beansSpillerFunct = async function(recievedMessage, args) {
    const foundUser = await BeanUser.findOne({duid:recievedMessage.author.id});
    if(!foundUser) {
        recievedMessage.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
    } else {
        const name=args.splice(0).join(' ');
        if((foundUser.health + 5) > foundUser.maxHealth) {
            foundUser.beans += 10
            let arrayIndex = -1;
            let realIndex = -1
            let parsedAmount = parseInt(args[1])
            let useTimes = 0
            foundUser.inventory.forEach(item => {
                arrayIndex += 1
                if(item.name == name) {
                    realIndex = arrayIndex
                }
            })
            foundUser.inventory.splice(realIndex, 1)
            foundUser.health = foundUser.maxHealth
            foundUser.save()
            recievedMessage.channel.send(`You have exceeded your max hp so your hp is set to **${foundUser.maxHealth}** and you gained **10 beans**.`)
        } else {
            foundUser.beans += 10
            foundUser.health += 5
            let arrayIndex = -1;
            let realIndex = -1
            let parsedAmount = parseInt(args[1])
            let useTimes = 0
            foundUser.inventory.forEach(item => {
                arrayIndex += 1
                if(item.name == name) {
                    realIndex = arrayIndex
                }
            })
            foundUser.inventory.splice(realIndex, 1)
            foundUser.save()
            recievedMessage.channel.send(`You have healed **5 health** and gained **10 beans**`)
        }
        

    }
}

const beanSpiller = new Item("none", "BeanSpiller", 150, "Low on health and need to heal a little? Pop open this can to spill beans under your opponents. You’ll leave them doing a bean dance while healing yourself +5. Must be purchased again as it is a one time use only. As it pertains to energy/healing, may be found during bean drips", beansSpillerFunct, true)
//------------------------------------------------------------
const MagicalOrbEffect = async function(recievedMessage, args) {
    const foundUser = await BeanUser.findOne({duid:recievedMessage.author.id});
    
    if(!foundUser) {
        recievedMessage.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
    } else {
        let amount = (foundUser.level * 25)
        if(amount == 0) {
            amount = 10
        }
        if(!foundUser.lastHealed) {
            foundUser.lastHealed = Date.now()
            foundUser.save()
        }
        if(timeDiffCalc(foundUser.lastHealed, Date.now(), "minutes") < 30) return recievedMessage.channel.send(`Chill dude, this orb needs to recharge before you can use it again, you can use it in **${(29 - timeDiffCalc(foundUser.lastHealed, Date.now(), "minutes"))}** minutes and **${(60 - timeDiffCalc(foundUser.lastHealed, Date.now(), "seconds"))}** seconds`)
        if((foundUser.health + amount) > foundUser.maxHealth) {
            foundUser.beans += 100
            foundUser.health = foundUser.maxHealth
            foundUser.lastHealed = Date.now()
            foundUser.save()
            recievedMessage.channel.send(`You have exceeded your max hp so your hp is set to **${foundUser.maxHealth}** and you gained **100 beans**.`)
        } else {
            foundUser.beans += 100
            foundUser.health += amount
            foundUser.lastHealed = Date.now()
            foundUser.save()
            recievedMessage.channel.send(`You have healed **${amount} health** and gained **100 beans**`)
        }

    }
}

const MagicalOrb = new Item(":purple_circle:", "Magical Healing Orb", 120000, "This orb can be used infinitely, healing you based on your level, so the higher level you are, the more this will heal you. But it needs to recharge for 30 minutes between each use.", MagicalOrbEffect, true)
//------------------------------------------------------------

//------------------------------------------------------------

let itemsArray = [CannedBeans, beanSpiller, MagicalOrb]

module.exports.itemsArray = itemsArray