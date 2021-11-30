const Discord = require('discord.js');
const mongoose=require('mongoose')
const client = new Discord.Client();
let util = require('./utils')
const path = require('path')
const fs = require('fs')
const { AddUpdateUser } = require('./dbWork.js')

const env = require('dotenv');
const { setMaxListeners } = require('process');

env.config();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Traversing the Bean Universe | prefix: bn-1 ")

  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }

  readCommands('commands');
//   const queryAllUsers = () => {
//     //Where User is you mongoose user model
//     PotatoUser.find({} , (err, users) => {
//         if(err) console.log(`Error in finding users for updating all`) //do something...
//         users.forEach(user => {
//             if(!user.rank) {
//                 let roles = [{name:"Serf", levelReq:1}, {name:"Merchant", levelReq:2}, {name:"Farmer", levelReq:3}, {name:"Craftsman", levelReq:4}, {name:"Lady/Gentelman", levelReq:5}, {name:"Knight", levelReq:6}, {name:"Baron/Baroness", levelReq:7}, {name:"Duke/Duchess", levelReq:8}, {name:"Prince/Princess", levelReq:9}]
//                 roles.forEach(role => {
//                     if(role.levelReq == user.level) {
//                         user.rank = role.name
//                     }
//                     if(user.level == 0) {
//                         user.rank = "Peasant"
//                     }
//                 })
//             }
//             user.save()
//         })

//     })
// }
// queryAllUsers()
});

client.login(util.clientToken());
module.exports.client = client;