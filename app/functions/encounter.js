const { getRandomNumberBetween } = require('../functions/getRandom.js');
const { regMonsters } = require('../monsters/monsters.json');

let encounter = {}
encounter.start = async function(recievedMessage, args, foundUser) {
    let chance = getRandomNumberBetween(1,100)
    if(chance /*<=*/<= 5) {
        let specialChance = getRandomNumberBetween(1,100)
        if(specialChance <= 10) {
            console.log(`------------------- Would be encounter -------------------`)
        } else {
            
        }
        encounter.calc(recievedMessage, args, foundUser)
    }
}

encounter.calc = async function(recievedMessage, args, foundUser) {
    try {
        let filteredMonsters = regMonsters.monsters.filter(monster => monster.level <= (foundUser.level + 3))
        let monsterIndex = Math.floor(Math.random() * ((regMonsters.monsters.length - 1) - 1))
        let monster = filteredMonsters[monsterIndex]
        let beanAmount = Math.round(foundUser.beans * 0.05)
        let encounterBattle = new Battle([foundUser], [monster])
        recievedMessage.channel.send(`OH NO! A :crossed_swords: **${monster.race}** :crossed_swords: whose name is **${monster.name}** came out of hiding and is going to ATTACK YOU! You have 3 choices, Fight, Defend - Decreases the amount of damage you take by an extra 30%, or RUN. React with :punch: to fight, :shield: to defend, or :man_running: to try and run. And remember, if you do not run now, there is no turning back. If you do run, you lose 5% of your beans which is **${beanAmount}** BEANS. Choose Wisely.`).then(async (msg1) => {
            function continueBattle(battle) {
                recievedMessage.channel.send(`You have 3 options, Attack, Defend, or run.`).then(msg => {
                    msg.react("👊")
                    msg.react('🛡️')
                    msg.react("🏃‍♂️")
                    const filter = (reaction, duser) => reaction.emoji.name === '👊' && duser.id == foundUser.duid;
                    const filter2 = (reaction, duser) => reaction.emoji.name === '🛡️' && duser.id == foundUser.duid;
                    const filter3 = (reaction, duser) => reaction.emoji.name === '🏃‍♂️' && duser.id == foundUser.duid;
                    const collector = msg.createReactionCollector(filter, {
                        time: 60000
                    });
                    const collector2 = msg.createReactionCollector(filter2, {
                        time: 60000
                    });
                    const collector3 = msg.createReactionCollector(filter3, {
                        time: 60000
                    });

                    collector.on('collect', async r => {
                        let defenseChance = getRandomNumberBetween(1, 100)
                        if (defenseChance <= 50) {
                            let deadOrNot = battle.nextRound(recievedMessage, args, [foundUser], [monster])
                            if (!deadOrNot) {
                                continueBattle(battle)
                            }
                        } else {
                            let deadOrNot = battle.nextRound(recievedMessage, args, [foundUser, monster], [])
                            if (!deadOrNot) {
                                continueBattle(battle)
                            }
                        }
                    })
                    collector2.on('collect', async r => {
                        let defenseChance = getRandomNumberBetween(1, 100)
                        console.log(defenseChance)
                        if (defenseChance <= 50) {
                            let deadOrNot = battle.nextRound(recievedMessage, args, [], [foundUser, monster])
                            if (!deadOrNot) {
                                continueBattle(battle)
                            }
                        } else {
                            let deadOrNot = battle.nextRound(recievedMessage, args, [monster], [foundUser])
                            if (!deadOrNot) {
                                continueBattle(battle)
                            }
                        }
                    })
                    collector3.on('collect', async r => {
                        let runawayChance = getRandomNumberBetween(1, 100)
                        if (runawayChance <= 50) {
                            foundUser.beans -= beanAmount;
                            foundUser.save()
                            recievedMessage.channel.send(`> COWARD! \n*Someone yells from somewhere, lol*. You have run away from the **${monster.name}** and left :canned_food: **${beanAmount}** Beans while running away, left for the **${monster.name}** to keep.`)
                        } else {
                            recievedMessage.channel.send(`OOF! You were running and you tripped on a rock SLAMMING your face into the dirt. Looks like you have to face the **${monster.name}** now. Good Luck! :fingers_crossed:`)
                        }

                    })
                })
            }
            continueBattle(encounterBattle)
        })
    }
    catch(err) {
        let errorChannel = recievedMessage.guild.channels.cache.get('836738105942867978')
        errorChannel.send(`Error in encounter:\n${err}`)
        message.channel.send(`Sorry, and error occured. It has been reported to the dev to soon be fixed.`)
    }
}

module.exports.encounter = encounter;