const mongoose = require('mongoose')
const Schema = mongoose.Schema
const teamSchema = new mongoose.Schema({
    teamOne: {
        goalKeeper: {type:String, required:true},
        defenderOne: {type:String,required:true},
        defenderTwo: {type:String,required:true},
        defenderThree: {type:String,required:true},
        defenderFour: {type:String,required:true},
        midfielderOne:{type:String,required:true},
        midfielderTwo:{type:String,required:true},
        midfielderThree:{type:String,required:true},
        midfielderFour:{type:String,required:true},
        attackerOne: {type:String,required:true},
        attackerTwo: {type:String,required:true},
    },
    teamTwo: {
        goalKeeper: {type:String, required:true},
        defenderOne: {type:String,required:true},
        defenderTwo: {type:String,required:true},
        defenderThree: {type:String,required:true},
        defenderFour: {type:String,required:true},
        midfielderOne:{type:String,required:true},
        midfielderTwo:{type:String,required:true},
        midfielderThree:{type:String,required:true},
        midfielderFour:{type:String,required:true},
        attackerOne: {type:String,required:true},
        attackerTwo: {type:String,required:true},
    },
    user: {type:Schema.Types.ObjectId, ref:'user'},
    game: {type:Schema.Types.ObjectId, ref:'game'},
    createdAt:{type:Date, default:Date.now},

})

const team = mongoose.model('team', teamSchema)
module.exports = team