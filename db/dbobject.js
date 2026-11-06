var mongoose = require('mongoose');
var config = require('./dbconfig.js');
var db = mongoose.connect(config.dburl);
db.catch(function (err) {
    console.error('MongoDB connection error:', err);
});
module.exports = {
    db: db
    , mongoose: mongoose
};
