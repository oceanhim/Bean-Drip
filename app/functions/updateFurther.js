const { BeanFactory } = require('../models/factoryModel.js');

async function updateFurther(factory, foundUser) {
    let foundFactory = await BeanFactory.findOne({dfid:factory});
    if(!foundFactory) return 

    let arrayIndex = -1;
    foundFactory.members.forEach(async (member) => {
        arrayIndex += 1;
        if(member.duid == foundUser.duid) {
            foundFactory.members.splice(arrayIndex, 1, foundUser)
            foundFactory.save()
        }
    })
}

module.exports.updateFurther = updateFurther;