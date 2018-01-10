var mongoose = require("../utils/database.js");

var User = mongoose.model('user',{
  username : String,
  password : String
})

module.exports = {
  register :(username,password,cb) =>{
    var user = new User({
      username: username,
      password: password
    });
    user.save(function (err) {
      cb(err);
    })
  },
  findUser :(findParms,cb)=>{
    User.findOne(findParms).then((result)=>{
      cb(result)
    }).catch(()=>{
      cb('error');
    })
  }
}