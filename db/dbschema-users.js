var dbobject = require('./dbobject');
var userschema = new dbobject.mongoose.Schema({
    email: {
        type: String
        , required: true
        , unique: true
    }
    , passwd: {
        type: String
        , required: true
    }
    , username: {
        type: String
        , default: 'new user'
        , unique: true
    }
    , tasks: []
});
module.exports = dbobject.mongoose.model('users', userschema);