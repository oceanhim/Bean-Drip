const BeanUser = require('../../models/userModel.js');

module.exports = {
    commands: ['start'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
      try {
        const foundUser = await BeanUser.findOne({duid:message.author.id});
        if(!foundUser) {
          const retMe = await new BeanUser({
            name:message.author.username, 
            duid:message.author.id, 
            beans:0, 
            level:0, 
            inventory:[
              itemsArray[0], 
              itemsArray[0], 
              weaponsArray[0], 
              weaponsArray[0], 
              weaponsArray[1]
            ], 
            health:100, 
            maxHealth:100, 
            damage:10, 
            defense:10, 
            critical:5, 
            equipped:weaponsArray[0], 
            equipped2:weaponsArray[0], 
            factory:"none", 
            beanFactoryDonations:0, 
            xp:0, 
            xpMax:25, 
            workAmount:25, 
            lastAttacked:Date.now(), 
            beenAttacked:Date.now(), 
            reviveTokens:0, 
            story:"none", 
            lastEquipped:Date.now(), 
            lastHealed:Date.now(), 
            voting:Date.now(), 
            passive:false, 
            passiveCooldown:Date.now(), 
            achievements:[
              {
                name:"Daily Streak", 
                currentCollected:0, 
                goal:5, 
                rewards:{
                  beans:6000, 
                  xp:70, 
                  items:[]
                }
              }, 
              {
                name:`Total Beans Collected`, 
                currentCollected:0, 
                goal:50000, 
                rewards:{
                  beans:25000, 
                  xp:100, 
                  items:[]
                }
              }, 
              {
                name:`Total Monsters Killed`, 
                currentCollected:0, 
                goal:20, 
                rewards:{
                  beans:50000, 
                  xp:300, 
                  items:[]
                }
              }, {
                name:"Total Players Killed", 
                currentCollected:0, 
                goal:25, 
                rewards:{
                  beans:60000, 
                  xp:500, 
                  items:[]
                }
              }
            ], 
            monstersKilled:0, 
            playersKilled:0
          }).save()
          message.channel.send(`Account created!`)
          return retMe
        } else {
          message.channel.send(`You already have an account.`)
        }
      }
      catch(err) {
          let errorChannel = message.guild.channels.cache.find(channel => channel.id === "836738105942867978");
          errorChannel.send(`Error in starting account: ` + err)
          message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}