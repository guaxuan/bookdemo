function AddPosition(container) {
  this.container = container;
  this.init();
}

AddPosition.templateBtn = `
  <button type="button" class="btn btn-info" data-toggle='modal' data-target='.js-addpos-modal'>增加</button>
`;
AddPosition.templateModel =`
  	<div class="modal fade js-addpos-modal" role="dialog" aria-labelledby="AddPositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="AddPositionLabel">新增职位</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addpos-company">公司名称</label>
			  <input type="text" class="form-control js-company" id="addpos-company" placeholder="请输入公司名">
			</div>
			<div class="form-group">
			  <label for="addpos-position">职位名称</label>
			  <input type="text" class="form-control js-position" id="addpos-position" placeholder="请输入职位名称">
			</div>
			<div class="form-group">
			  <label for="addpos-salary">薪资范围</label>
			  <select class="form-control js-salary" id="updatepos-salary">
				  <option>5k-10k</option>
				  <option>10k-20k</option>
				  <option>20k-25k</option>
				  <option>25k-35k</option>
				  <option>35k+</option>
				</select>
			</div>
			<div class="form-group">
			  <label for="addpos-address">办公地点</label>
			  <input type="text" class="form-control js-address" id="addpos-address" placeholder="请输入办公地点">
			</div>
      <div class="form-group">
			  <label for="addpos-logo">公司logo</label>
			  <input type="file" class="form-control js-logo" id="addpos-logo">
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
$.extend(AddPosition.prototype,{
  init : function () {
    this.createDom();
    this.bindEvents();
  },
  createDom : function () {
    this.tempBtn = $(AddPosition.templateBtn);
    this.tempModel = $(AddPosition.templateModel);
    this.succNoticeEle = this.tempModel.find("js-succ-notice");
    this.container.append(this.tempBtn);
    this.container.append(this.tempModel);
  },
  bindEvents : function () {
    var submintB = this.tempModel.find(".js-submit");
    submintB.on("click",$.proxy(this.handleSubmitBClick,this));
  },
  handleSubmitBClick : function () {
    var company = this.tempModel.find(".js-company").val(),
        position = this.tempModel.find(".js-position").val(),
        salary = this.tempModel.find(".js-salary").val(),
        address = this.tempModel.find(".js-address").val(),
        logo = this.tempModel.find(".js-logo")[0].files[0];
    var formData = new FormData();
        formData.append("company", company);
        formData.append("position", position);
        formData.append("salary", salary);
        formData.append("address", address);
        formData.append("logo", logo);

    $.ajax({
      url:"/api/addposition",
      type:"POST",
      cache: false,
      processData: false,
      contentType: false,
      data: formData,
      success : $.proxy(this.handleAddPositionSucc,this)
    })
  },
  handleAddPositionSucc : function (res) {
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