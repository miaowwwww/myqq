var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var ChatHistorySchema = new Schema({
  postMessage:String,
  time:Date,
  fromUserId:{
    type:ObjectId,
    ref:'User'
  },
  toUserId:{
    type:ObjectId,
    ref:'User'
  },
  //是否已阅
  status:{
    type:Boolean,
    default:false
  }
});


ChatHistorySchema.statics = {
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

module.exports = ChatHistorySchema