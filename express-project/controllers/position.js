const positionModel = require("../models/position");
const fs = require("fs");

module.exports = {
  addposition(req, res) {
    const { company,position,address,salary} = req.body;
    const filename = req.file ? req.file.filename : "";
    console.log(filename);
    positionModel.addposition (company,position,address,salary,filename,(err)=>{
      res.json ({
        ret: true,
        data: {
          inserted: !err
        }
      })
    })
  },
  getpositionlist(req,res) {
    const { page,size } = req.query;
    let totalpage = 0;// 总长度
    positionModel.getpositionlist({},(result)=>{
      if(result && result !== "error"){
        totalpage = Math.ceil(result.length / size);
        positionModel.getPositionBypage(page,size,(result)=>{
          res.json({
            ret: true,
            data:{
              list: (result && result !== "error") ? result : false,
              totalpage: totalpage
            }
          })

        })
      }
    })
  },
  removePosition(req,res) {
    const id = req.query.id;
    positionModel.getPosition(id,(result)=>{
      const filename = result.filename;
      console.log(typeof filename);
      // 为什么是 ./   ???  fs 明天要好好看
      fs.unlink("./public/uploads/"+filename,(err)=>{
        console.log(err);
        console.log("./public/uploads/"+filename)
        positionModel.removePosition(id,(err)=>{
          res.json({
            ret: true,
            data: {
              delete : !err
            }
          })
        })
      })
    })
  },
  getPosition(req,res) {
    const id = req.query.id;
    positionModel.getPosition(id,(result)=>{
      res.json({
        ret: true,
        data: {
          info : (result && result !== 'error') ? result : false
        }
      })
    })
  },
  updataPosition(req,res){
    const { company,position,address,salary,id } = req.body;
    const params = {
      company,
      position,
      salary,
      address
    }
    if (req.file && req.file.filename) {
      params.filename = req.file.filename
    }
    positionModel.updataPosition(params,id,(result)=>{
     res.json({
       ret: true,
       data: {
         updata: (result && result !== "error") ? true : false
       }
     })
      console.log(res.data.updata);
    })
  }

}