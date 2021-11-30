const { commandNames } = require('../command-base.js');

module.exports = {
    commands: ['help'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
      try {
        let names = ``
        commandNames.forEach(name => {
            names += `${name}\n`
        })
        message.channel.send(`The following commands are available for use:\n${names}`)
      }
      catch(err) {
          let errorChannel = message.guild.channels.cache.find(channel => channel.id === "836738105942867978");
          errorChannel.send(`Error in help: ` + err)
          message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}