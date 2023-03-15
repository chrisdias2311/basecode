const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        // required: true
    },
    lastname: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true
    },
});


// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);