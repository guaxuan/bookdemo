var mongoose = require("../utils/database.js");

var Position = mongoose.model('person',{
  name: String,
  age: String,
  university: String,
  filename: String,
  salary : String,
});

module.exports = {
  addperson(name, age, university, salary, filename, cb){
    console.log(arguments);
    var position = new Position({ name, age, university, salary, filename });
    position.save((err) =>{
      cb(err)
    })
  },
  getpersonlist(params,cb){
    Position.find(params).then((result)=>{
      cb(result);
    }).catch(()=>{
      cb("error");
    })
  },
  getPersonBypage(page,size,cb){
    page = parseInt(page,10);
    size = parseInt(size,10);
    Position.find({}).limit(size).skip((page-1) * size).then((result)=>{
      cb(result);
    }).catch(()=>{
      cb('error');
    })
  },
  // removePosition(id,cb) {
  //   Position.findByIdAndRemove(id,(err)=>{
  //     cb(err);
  //   })
  // },
  getPersonInfo(id,cb) {
    Position.findById(id).then((result)=>{
      cb(result);
    })
    //   .catch(()=>{
    //   cb("error");
    // })
  },
  // updataPosition(params,id,cb){
  //   Position.findByIdAndUpdate(id,params).then((result)=>{
  //     cb(result);
  //   }).catch(()=>{
  //     cb("error");
  //   })
  // }
}