module.exports = {
    commands: ['invite'],
    expectedArgs: '',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minargs: 0,
    maxargs: 0,
    callback: async (message, arguments, text) => {
      try {
        message.channel.send(`https://discord.com/api/oauth2/authorize?client_id=820801511188594709&permissions=11264&scope=bot`)
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in invite:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: '',
    requiredRoles: [],
}