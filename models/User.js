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
    let user = await User.find(searchObject)
    console.log('user', user)
    if (user.length > 0) {
        return user
    } else {
        user = new User({
            ...searchObject,
        })
        const savedUser = await user.save()
        return savedUser
    }
})


module.exports = mongoose.model('User', userSchema);