module.exports = {
    commands: ['send', 'sendMessage'],
    expectedArgs: '<channel> <message>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    maxArgs: 100,
    callback: (message, arguments, text) => {
      try {
        let eachWord = text.split(' ')
        let channelId = eachWord.shift()
        let channelIdShort = channelId.substring(2, channelId.length - 1);
        let wantedMessage = eachWord.join(' ')
        console.log(`Id: ${channelIdShort}\nMessage: ${wantedMessage}`)
        let channel = message.guild.channels.cache.get(channelIdShort)
        message.delete()
        channel.send(wantedMessage)
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in send/sendMesssage:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
      }
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: ['']
}