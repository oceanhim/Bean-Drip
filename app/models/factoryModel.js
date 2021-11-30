const mongoose = require('mongoose');

let Schema = mongoose.Schema

var factorySchema = new Schema({
    name : {
        type : String
    },
    dfid: {
        type : String
    },
    beans : {
        type : Number
    },
    level : {
        type : Number
    },
    members : {
        type : Array
    },
    owner : {
        type : Object
    },
    coowner : {
        type : Object
    },
    generals : {
        type : Array
    },
    capacity : {
        type : Number
    },
    income : {
        type : Number
    },
    upgrades : {
        type : Array
    }
})

module.exports = mongoose.model('BeanFactory', factorySchema)