var mongoose = require("../utils/database.js");

var Position = mongoose.model('position',{
  company: String,
  position: String,
  salary: String,
  address: String,
  filename : String,
});

module.exports = {
  addposition(company, position, address, salary, filename, cb){
    var position = new Position({ company, position, salary, address, filename });
    position.save((err) =>{
      cb(err)
    })
  },
  getpositionlist(params,cb){
    Position.find(params).then((result)=>{
      cb(result);
    }).catch(()=>{
      cb("error");
    })
  },
  getPositionBypage(page,size,cb){
    page = parseInt(page,10);
    size = parseInt(size,10);
    Position.find({}).limit(size).skip((page-1) * size).then((result)=>{
      cb(result);
    }).catch(()=>{
      cb('error');
    })
  },
  removePosition(id,cb) {
    Position.findByIdAndRemove(id,(err)=>{
      cb(err);
    })
  },
  getPosition(id,cb) {
    Position.findById(id).then((result)=>{
      cb(result);
    }).catch(()=>{
      cb("error");
    })
  },
  updataPosition(params,id,cb){
    Position.findByIdAndUpdate(id,params).then((result)=>{
      cb(result);
    }).catch(()=>{
      cb("error");
    })
  },
  getSalary(salary,cb){
    Position.find({salary : salary}).then((result)=>{
      cb(result);
    })
    //   .catch(()=>{
    //   cb("error");
    // })
  }
}