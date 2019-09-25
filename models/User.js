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

userSchema.static('findOrCreate', async function (provider, profile) {
    const User = require('./User.js')
    const searchObject = provider === 'facebook' ? { fbId: profile.id } : { googleId: profile.id }
    let user = await User.findOne(searchObject)
    if (!user) {
        user = new User({
            ...searchObject,
        })
        const savedUser = await user.save()
        return savedUser
    } else {
        return user
    }
})


module.exports = mongoose.model('User', userSchema);