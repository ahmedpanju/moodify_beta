var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var JournalSchema = mongoose.Schema({
    user: {
        type: String
    },
    sleep: {
        type: Number
    },
    diet: {
        type: Number
    },
    exercise: {
        type: Number
    },
    mood: {
        type: Number    
    },
    happiness: {
        type: Number
    },
    sadness: {
        type: Number    
    },
    date: {
        type: String 
    }
});

module.exports = mongoose.model('Journal', JournalSchema);

module.exports.createJournal = function(newJournal, callback) {
    newJournal.save(callback);
}