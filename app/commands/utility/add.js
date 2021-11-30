module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'Anyone can run this command, check with the dev to find out why this is not working.',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
      try {
        const num1 = +arguments[0]
        const num2 = +arguments[1]
    
        message.reply(`The sum is ${num1 + num2}`)
      } 
      catch(err) {
        let errorChannel = message.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in ${this.commands[0]}/${this.commands[1]}:\n${err}`)
      }
    },
    permissions: '',
    requiredRoles: [],
}