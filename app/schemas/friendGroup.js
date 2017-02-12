var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var FriendsGroupSchema = new Schema({
  name:{
    type:String,
    default:'oneItem'
  },
  userId:{
    type:ObjectId,
    ref:'User'
  }

})


FriendsGroupSchema.statics = {
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

module.exports = FriendsGroupSchema;