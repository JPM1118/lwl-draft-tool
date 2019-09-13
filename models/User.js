const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    fbId: String,
    googleId: String,
    skaters: Array,
    goalies: Array,
    takenPlayers: Array,
    myPlayers: Array
})

userSchema.static('findOrCreate', async function (profile) {
    const User = require('./User.js')
    let user = await User.find({ fbId: profile.id })
    if (user) {
        return user
    } else {
        user = new User({
            fbId: profile.id,
        })
        const savedUser = await user.save()
        return savedUser
    }
})


module.exports = mongoose.model('User', userSchema);