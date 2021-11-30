const mongoose = require('mongoose');

let Schema = mongoose.Schema

var userSchema = new Schema({
    name : {
        type : String
    },
    duid: {
        type : String
    },
    beans : {
        type : Number
    },
    level : {
        type : Number
    },
    inventory : {
        type : Array
    },
    health : {
        type : Number
    },
    maxHealth : {
        type : Number
    },
    damage : {
        type : Number
    },
    defense : {
        type : Number
    },
    critical : {
        type : Number
    },
    equipped : {
        type : Object
    },
    equipped2 : {
        type : Object
    },
    factory : {
        type : Object
    },
    beanFactoryDonations : {
        type : Number
    },
    lastExecuted : {
        type : Date
    },
    xp : {
        type : Number
    },
    xpMax : {
        type : Number
    },
    workAmount : {
        type : Number
    },
    daily : {
        type : Date
    },
    weekly : {
        type : Date
    },
    lastAttacked : {
        type : Date
    },
    beenAttacked : {
        type : Date
    },
    reviveTokens : {
        type : Number
    },
    story : {
        type : String
    },
    lastEquipped : {
        type : Date
    },
    lastHealed : {
        type : Date
    },
    voting : {
        type : Date
    },
    passive : {
        type : Boolean
    },
    passiveCooldown : {
        type : Date
    },
    achievements : [
        {name:{type : String}, currentCollected:{type : Number}, goal:{type : Number}, rewards:{beans:{type : Number}, xp:{type : Number}, items:{type : Array}}}
    ],
    monstersKilled : {
        type : Number
    },
    playersKilled : {
        type : Number
    }
})

// const realm = await Realm.open({
//     schema: [userSchema],
//     schemaVersion: 2
// });

module.exports = mongoose.model('BeanUser', userSchema)