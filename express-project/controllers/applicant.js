const personModel = require("../models/applicant");
const positionModel = require("../models/position");

module.exports = {
  addperson(req, res) {
    const { name,age,university,salary} = req.body;
    const filename = req.pic ? req.file.filename : "";
    personModel.addperson (name,age,university,salary,filename,(err)=>{
      res.json ({
        ret: true,
        data: {
          inserted: !err
        }
      })
    })
  },
  getpersonlist(req,res) {
    const { page,size } = req.query;
    let totalpage = 0;// 总长度
    personModel.getpersonlist({},(result)=>{
      if(result && result !== "error"){
        totalpage = Math.ceil(result.length / size);
        personModel.getPersonBypage(page,size,(result)=>{
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
  getPersonInfo(req,res) {
    const id = req.query.id;
    personModel.getPersonInfo(id,(result)=>{
      const salary = result.salary;
      positionModel.getSalary(salary,(list)=>{
        console.log(list)
        res.json({
          ret: true,
          data: {
            info : (list && list !== 'error') ? list : false
          }
        })
      })

    })
  },
  // updataPosition(req,res){
  //   const { company,position,address,salary,id } = req.body;
  //   const params = {
  //     company,
  //     position,
  //     salary,
  //     address
  //   }
  //   if (req.file && req.file.filename) {
  //     params.filename = req.file.filename
  //   }
  //   positionModel.updataPosition(params,id,(result)=>{
  //     res.json({
  //       ret: true,
  //       data: {
  //         updata: (result && result !== "error") ? true : false
  //       }
  //     })
  //     console.log(res.data.updata);
  //   })
  // }


}