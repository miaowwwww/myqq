var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

// var bcrypt = require('bcrypt') //为密码存储设计的算法
var SALT_WORK_FACTOR = 10 //加盐长度，默认是10

var UserSchema = new Schema({
  loginId: {
    unique: true,
    type: String
  },
  password: String,
  nickName: String,
  headerPortrait: { 
    type: String,
    default: 'header.jpg'
  },
  sex:Number,
  birthday:Date,
  age:Number,
  // 状态：0--outline 1--inline
  state:Number

})

UserSchema.pre('save', function(next) {
    var user = this //当前操作的user对象
    // 判断是否已经加密过了，密码长度不能超过16
    if(user.password.length > 18){
      next();
    }else{
      //对密码进行哈希加盐 
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) return next(err)

          user.password = hash;
          next();
        })
      })
    }
  })
  //methods 定义实例上该有的方法
  // 判断密码是否正确
UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}

UserSchema.statics = {
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

module.exports = UserSchema