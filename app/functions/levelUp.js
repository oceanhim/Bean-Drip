async function levelUp(user, recievedMessage, adminPurposes) {
    if(!user.xp) {
        user.xp = 0
        updateFurther(user.factory, user)
    }
    if(!user.xpMax) {
        user.xpMax = 25
        updateFurther(user.factory, user)
    }
    if(user.xp >= user.xpMax || adminPurposes) {
        user.xp -= user.xpMax
        user.xpMax *= 2;
        user.level += 1;
        user.health *= 1.2
        user.maxHealth *= 1.2
        user.health = Math.round(user.health)
        user.maxHealth = Math.round(user.maxHealth)
        if(user.health > user.maxHealth) {
            user.health = user.maxHealth
        }
        user.damage *= 1.05
        user.damage = Math.round(user.damage)
        user.defense *= 1.05
        user.defense = Math.round(user.defense)
        user.critical += 1
        if(!user.workAmount) {
            user.workAmount = 25
        }
        user.workAmount *= 1.2
        user.workAmount = Math.round(user.workAmount)
        let randomBeans = Math.floor((Math.random() * (user.level * 400)) + (user.level * 200))
        user.beans += randomBeans
        if(user.level == 5 || user.level == 10 || user.level == 15) {
            user.reviveTokens += 1;
            recievedMessage.channel.send(`Ooo, congrats! You also got a revive Token!`)
        }
        recievedMessage.channel.send(`:tada: :partying_face: YAYAY!! You leveled up! You are now level **${user.level}**. You have also gained :canned_food: **${randomBeans}** BEANS as a reward. Congrats! :partying_face:`)
    }
    user.save()
}

module.exports.levelUp = levelUp;