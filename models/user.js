var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    local            : {
        fname        : String,
        lname        : String,
        email        : String,
        password     : String,
        notif        : String,
        complete     : Boolean,
        journal_content      : Array,
        user_options : Array,
        journal_complete : Boolean,
        stats : Array,
        data : Array,
        date_data: Array,
        journal_complete : Boolean,
        journal_latest : Number,
        empty : Boolean
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
