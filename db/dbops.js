var users = require('./dbschema-users');
var tasks = require('./dbschema-tasks');
var us = require('underscore');

// Wraps an async handler: sends its result, or the error, to the response.
function respond(res, fn) {
    return Promise.resolve().then(fn).then(function (data) {
        res.send(data);
    }, function (err) {
        res.send(err);
    });
}
var obj = {
    getUserForLogin: function (em, pw, res) {
        return respond(res, function () {
            return users.findOne({
                email: em
                , passwd: pw
            });
        });
    }
    , checkUsernameAvailability: function (un, res) {
        return respond(res, function () {
            return users.findOne({
                username: un
            });
        });
    }
    , checkEmailAvailability: function (em, res) {
        return respond(res, function () {
            return users.findOne({
                email: em
            });
        });
    }
    , addUser: function (em, pw, un, res) {
        return respond(res, function () {
            return new users({
                email: em
                , passwd: pw
                , username: un
                , tasks: []
            }).save();
        });
    }
    , createTask: function (userid, title, description, priority, createdOn, res) {
        return respond(res, async function () {
            var newtask = await new tasks({
                title: title
                , description: description
                , priority: priority
                , createdOn: createdOn
                , lastUpdated: createdOn
            }).save();
            var doc = await users.findOne({
                _id: userid
            });
            doc.tasks.push(newtask._id);
            await doc.save();
            return doc.tasks;
        });
    }
    , getTasks: function (uid, res) {
        return respond(res, async function () {
            var data = await users.findOne({
                _id: uid
            });
            return data.tasks;
        });
    }
    , deleteTask: function (uid, tid, res) {
        return respond(res, async function () {
            var task = await tasks.findByIdAndDelete(tid);
            var doc = await users.findOne({
                _id: uid
            });
            doc.tasks = doc.tasks.filter(function (item) {
                return !us.isEqual(task && task._id, item);
            });
            await doc.save();
            return doc.tasks;
        });
    }
    , completeTask: function (uid, tid, time, res) {
        return respond(res, async function () {
            var doc = await tasks.findOne({
                _id: tid
            });
            doc.isCompleted = true;
            doc.completedOn = time;
            await doc.save();
            return doc;
        });
    }
    , retrieveTask: function (tid, res) {
        return respond(res, function () {
            return tasks.findOne({
                _id: tid
            });
        });
    }
    , updateTask: function (tid, time, title, desc, priority, res) {
        return respond(res, async function () {
            var data = await tasks.findOne({
                _id: tid
            });
            data.lastUpdated = time;
            data.title = title;
            data.description = desc;
            data.priority = priority;
            await data.save();
            return data;
        });
    }
};
module.exports = obj;
