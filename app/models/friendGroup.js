var mongoose = require('mongoose');
var FriendsGroupSchema = require('../schemas/friendsGroup');
var FriendsGroup = mongoose.model('FriendsGroup',FriendsGroupSchema);

module.exports = FriendsGroup;