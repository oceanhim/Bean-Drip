const BeanUser = require('../../models/userModel.js');
const beanFactory = require('../../models/factoryModel.js');
const { timeDiffCalc } = require('../../functions/timeDiffCalc');
const { levelUp } = require('../../functions/levelUp.js');
const { achievementCollect } = require('../../functions/achievement.js');
const { encounter } = require('../../functions/encounter.js');

module.exports = {
    commands: ['dripBeans', 'db'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 0,
    callback: async (message, arguments, text) => {
      try {
        const foundUser = await BeanUser.findOne({duid:message.author.id});
        if(!foundUser) return message.channel.send(`You don't have an account, which means you can't use this command. Please type **bn-start** to create an account so you can use my features.`)
        
        if(foundUser.health <= 0) return message.channel.send(`What do you think you're doing?!?! YOU ARE D E A D. Lmao`)
        //encounter.start(message, arguments, foundUser)
        if(timeDiffCalc(foundUser.lastExecuted, Date.now(), "minutes") < 5){
            return message.channel.send(`CHILL! I know you want MORE BEANS!! But you gotta wait another **${4 - timeDiffCalc(foundUser.lastExecuted, Date.now(), "minutes")}** minutes and **${60 - timeDiffCalc(foundUser.lastExecuted, Date.now(), "seconds")}** seconds`);
        } else {
            //--------------(Data)--------------
            let beanCollectAmount = Math.floor((Math.random() * foundUser.workAmount) + ((foundUser.workAmount * 1.1) + 10))
            let xpCollect = Math.floor((Math.random() * 5) + 1)
            foundUser.beans += beanCollectAmount
            if(message.guild.id == "820842691419045888") {
                beanCollectAmount *= 1.1
                beanCollectAmount = Math.round(beanCollectAmount)
            }
            foundUser.xp += xpCollect
            let foundFactory = await beanFactory.findOne({dfid:foundUser.factory});
            if(!foundFactory) {
                
            } else {
                foundFactory.beans += beanCollectAmount;
            }
            let workTime = Math.floor((Math.random() * 7) + 1)
            foundUser.lastExecuted = Date.now();
            let chanceOfCollect = Math.floor((Math.random() * 100) + 1)
            // if(chanceOfCollect <= 10) {
            //     foundUser.inventory.push(itemsArray[1])
            //     message.channel.send(`Woah, Nice! You're pretty lucky. You found a **${itemsArray[1].name}** while dripping beans!`)
            // }
            // try {
            //     foundUser.achievements[1].currentCollected += beanCollectAmount
            // }
            // catch(err) {
            //     let waterBalloon = weaponsArray.find(weapon => weapon.name == "Water Balloon")
            //     foundUser.achievements = [{name:"Daily Streak", currentCollected:0, goal:5, rewards:{beans:6000, xp:70, items:[]}}, {name:`Total Beans Collected`, currentCollected:0, goal:50000, rewards:{beans:25000, xp:100, items:[waterBalloon]}}]
            //     let errorChannel = message.guild.channels.cache.find(channel => channel.id === "836738105942867978");
            //     errorChannel.send(`Error while collecting beans: ` + err)
            // }
            levelUp(foundUser, message, false);
            achievementCollect(foundUser.achievements[1], message, arguments, foundUser)
            message.channel.send(`WOOHOO! You've dripped Beans for **${workTime}** hours and have collected :canned_food: **${beanCollectAmount}** BEANS!! You also collected **${xpCollect}** XP!! `)
            encounter.start(message, arguments, foundUser)
        }
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in db/dripBeans/work:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}