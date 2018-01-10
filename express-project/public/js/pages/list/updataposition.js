function UpdataPosition(container) {
  this.container = container;
  this.init();

}
UpdataPosition.templateModel = `
	<div class="modal fade js-updatepos-modal" role="dialog" aria-labelledby="UpdatePositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="UpdatePositionLabel">修改职位</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
			  <label for="addpos-company">公司名称</label>
			  <input type="text" class="form-control js-company" id="updatepos-company" placeholder="请输入公司名">
			</div>
			<div class="form-group">
			  <label for="addpos-position">职位名称</label>
			  <input type="text" class="form-control js-position" id="updatepos-position" placeholder="请输入职位名称">
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
			  <input type="text" class="form-control js-address" id="updatepos-address" placeholder="请输入办公地点">
			</div>
			<div class="form-group">
			  <label for="addpos-logo">公司logo</label>
			  <input type="file" class="form-control js-logo" id="updatepos-logo">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			修改成功
	      </div>
	    </div>
	  </div>
	</div>
`;


$.extend(UpdataPosition.prototype,{
  init : function () {
    this.createDom();
    this.bindEvents();
  },
  createDom : function () {
    this.model = $(UpdataPosition.templateModel);
    this.container.append(this.model);
    this.company = this.model.find(".js-company");
    this.position = this.model.find(".js-position");
    this.address = this.model.find(".js-address");
    this.salary = this.model.find(".js-salary");
    this.logo = this.model.find(".js-logo");
  },
  showItem : function (id) {
    this.model.modal("show");
    this.getPositionInfo(id);
    this.id = id;
  },
  getPositionInfo : function (id) {
    $.ajax({
      url: "/api/getPosition",
      data: {
        id : id
      },
      success : $.proxy(this.handleGetPositionInfoSucc,this)
    })
  },
  handleGetPositionInfoSucc :function (res) {
    var list = res.data.info;
    this.company.val(list.company);
    this.position.val(list.position);
    this.address.val(list.address);
    this.salary.val(list.salary);
  },
  bindEvents : function () {
    this.submitBtn = this.model.find(".js-submit");
    this.submitBtn.on("click",$.proxy(this.handSubmitBClick,this))
  },
  handSubmitBClick : function () {
    var company = this.company.val(),
        position = this.position.val(),
        salary = this.salary.val(),
        address = this.address.val(),
        logo = this.logo[0].files[0];
    var formData = new FormData();
    formData.append("company", company);
    formData.append("position", position);
    formData.append("salary", salary);
    formData.append("address", address);
    formData.append("id", this.id);
    formData.append("logo", logo);
    $.ajax({
      url: "/api/updataPosition",
      type: "POST",
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: $.proxy(this.handleUpdataSucc,this)
    })
  },
  handleUpdataSucc : function (res) {
    console.log(res);
    if(res && res.data && res.data.updata){
      this.SuccNoticeEle = this.model.find(".js-succ-notice");
      this.SuccNoticeEle.removeClass("hide");
      $(this).trigger("change");
      setTimeout($.proxy(this.handleSuccNotice,this),1000)
    }
  },
  handleSuccNotice : function () {
    this.SuccNoticeEle.addClass("hide");
    this.model.modal("hide");
  }
})