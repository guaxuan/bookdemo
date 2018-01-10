function Addpersoninfo(container) {
  this.container = container;
  this.init();
}

Addpersoninfo.templateBtn = `
  <button type="button" class="btn btn-info" data-toggle='modal' data-target='.js-addperson-modal'>增加求职</button>
`;
Addpersoninfo.templateModel =`
  	<div class="modal fade js-addperson-modal" role="dialog" aria-labelledby="AddpersoninfoLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="AddpersoninfoLabel">新增职位</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addperson-name">姓名</label>
			  <input type="text" class="form-control js-name" id="addperson-name" placeholder="请输入公司名">
			</div>
			<div class="form-group">
			  <label for="addperson-age">年龄</label>
			  <input type="text" class="form-control js-age" id="addperson-age" placeholder="请输入职位名称">
			</div>
			<div class="form-group">
			  <label for="addperson-university">毕业院校</label>
			  <input type="text" class="form-control js-university" id="addperson-university" placeholder="请输入办公地点">
			</div>
      <div class="form-group">
			  <label for="addperson-logo">照片</label>
			  <input type="file" class="form-control js-logo" id="addperson-logo">
			</div>
      <div class="form-group">
			  <label for="addperson-salary">期望薪资</label>
			  <select class="form-control js-salary" id="updatepos-salary">
				  <option>5k-10k</option>
				  <option>10k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-35k</option>
				  <option>35k+</option>
				</select>
      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			添加成功
	      </div>
	      <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
			对不起，您所注册的用户名已存在
	      </div>
	    </div>
	  </div>
	</div>
`;
$.extend(Addpersoninfo.prototype,{
  init : function () {
    this.createDom();
    this.bindEvents();
  },
  createDom : function () {
    this.tempBtn = $(Addpersoninfo.templateBtn);
    this.tempModel = $(Addpersoninfo.templateModel);
    this.succNoticeEle = this.tempModel.find("js-succ-notice");
    this.container.append(this.tempBtn);
    this.container.append(this.tempModel);
  },
  bindEvents : function () {
    var submintB = this.tempModel.find(".js-submit");
    submintB.on("click",$.proxy(this.handleSubmitBClick,this));
  },
  handleSubmitBClick : function () {
    var name = this.tempModel.find(".js-name").val(),
        age = this.tempModel.find(".js-age").val(),
        university = this.tempModel.find(".js-university").val(),
        pic = this.tempModel.find(".js-logo")[0].files[0],
        salary = this.tempModel.find(".js-salary").val();
    var formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("university", university);
    formData.append("pic", pic);
    formData.append("salary", salary);
    $.ajax({
      url:"/api/addpersoninfo",
      type:"POST",
      cache: false,
      processData: false,
      contentType: false,
      data: formData,
      success : $.proxy(this.handleAddpersoninfoSucc,this)
    })
  },
  handleAddpersoninfoSucc : function (res) {
    if(res && res.data && res.data.inserted){
      this.succNoticeEle.removeClass("hide");
      $(this).trigger("change");
      setTimeout($.proxy(this.handleDelay,this),1000);
    }
  },
  handleDelay : function () {
    this.succNoticeEle.addClass("hide");
    this.tempModel.modal("hide");
  }

})