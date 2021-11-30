const mongoose = require('mongoose');
var util = require('./utils')


class Database{
    constructor(){
        mongoose.connect(util.DBConnectionString(),()=>{console.log("connected!!!!!")});
    }

    close = function() {
        console.log("closing");
        mongoose.connection.close();
    }
    
}

const AddUpdateUser = async function (name, id, level, xp, xpMax, rank){
    try {  
      const foundUser = await PotatoUser.findOne({duid:id});
      if(!foundUser){
        console.log("creating new one");
        const retMe = await new PotatoUser({name:name, duid:id, level:level, xp:xp, xpMax:xpMax, rank:rank}).save()
        return retMe;
      }else{
        console.log("updating  old one");
        foundUser.name = name;
        foundUser.duid = id;
        foundUser.level = level;
        foundUser.rank = rank;
        const retMe = await foundUser.save();
        return retMe;
      }
    }
    catch(err) {
      console.log(`Error: ` + err)
    }
}

module.exports.AddUpdateUser = AddUpdateUser
module.exports.Database = new Database();