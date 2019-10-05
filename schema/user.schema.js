var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    username: { type: String },
    email: { type: String },
    username: { type: String },
    address: {
        street: { type: String },
        suite: { type: String },
        city: { type: String },
        zipcode: { type: String },
        geo: {
            lat: { type: String},
            lng: { type: String},
        }
    },
    phone: { type: String },
    website: { type: String },
    company: {
        name: { type: String },
        catchPhrase: { type: String },
        bs: { type: String }
    }
});


module.exports = mongoose.model('User', UserSchema);