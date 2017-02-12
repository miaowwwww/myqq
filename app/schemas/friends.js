var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var FriendsSchema = new Schema({
  friendId:{
    type:ObjectId,
    ref:'User'
  },
  userId:{
    type:ObjectId,
    ref:'User'
  },
  friendGroupId:{
    type:ObjectId,
    ref:'FriendsGroup'
  },
  isChating:{
    type:Boolean,
    default:true
  }
})


FriendsSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      // .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb)
  }
}

module.exports = FriendsSchema