module.exports = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
      try {
        message.reply('Pong!')
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in ping:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
  }