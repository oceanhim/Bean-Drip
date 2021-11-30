function achievementCollect(achievement, recievedMessage, args, foundUser) {
    if(achievement.currentCollected == achievement.goal) {
        achievement.goal *= 2
        achievement.goal += 5
        foundUser.beans += achievement.rewards.beans
        foundUser.xp += achievement.rewards.xp
        achievement.rewards.beans *= 1.5
        achievement.rewards.beans *= 1.4
        levelUp(foundUser, recievedMessage, false)
        foundUser.save()
        recievedMessage.channel.send(`:partying_face: :tada: YAYAYAY! You have completed the **${achievement.name}** achievement! Your reward is :canned_food: **${achievement.reward.beans}** BEANS and **${achievement.reward.xp}** XP :star: YAY!`)
    }
}

module.exports.achievementCollect = achievementCollect;