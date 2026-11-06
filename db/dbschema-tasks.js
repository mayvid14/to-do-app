var dbobject = require('./dbobject');
var taskschema = new dbobject.mongoose.Schema({
    title: {
        type: String
        , required: true
    }
    , description: {
        type: String
    }
    , isCompleted: {
        type: Boolean
        , default: false
    }
    , createdOn: {
        type: Number
    }
    , completedOn: {
        type: Number
        , default: 0
    }
    , priority: {
        type: Number
    }
    , lastUpdated: {
        type: Number
        , default: 0
    }
});
module.exports = dbobject.mongoose.model('tasks', taskschema);