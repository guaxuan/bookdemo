function MateSalary(container) {
  this.container = container;
  this.init();
}

MateSalary.templateModel = `
	<div class="modal fade js-updatepos-modal" role="dialog" aria-labelledby="UpdatePositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="UpdatePositionLabel">职位信息</h4>
	      </div>
	      <div class="modal-body js-menu">
	          <table class="table table-striped" style="margin-top:20px;">
            <thead>
              <tr>
                <th>序号</th>
                <th>公司</th>
                <th>职位</th>
                <th>薪资</th>
              </tr>
            </thead>
            <tbody class="js-tbody"></tbody>
            </table>
	      </div>
	      <div class="modal-footer">
	         <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			修改成功
	      </div>
	    </div>
	  </div>
	</div>
`;

MateSalary.templateTrs = `
  
`;

$.extend(MateSalary.prototype,{
  init : function () {
    this.createDom();
    this.bindEvents();
    // this.createPersonMenu();
  },
  createDom : function () {
    this.model = $(MateSalary.templateModel);
    this.container.append(this.model);
  },
  createPersonMenu : function (info) {
    var str = "";
    var list = info.data.info;
    var personMenuCon = this.model.find(".js-tbody");
    for(var i = 0;i < list.length;i++){
      var item = list[i];
      str += `
        <tr>
						<td>${i + 1}</td>
						<td>${item.company}</td>
						<td>${item.position}</td>
            <td>${item.salary}</td>
					</tr>
      `;
    }
    personMenuCon.html(str);

  },
  showItem : function (id) {
    this.model.modal("show");
    this.getPersonInfo(id);
    this.id = id
  },
  getPersonInfo : function (id) {
    $.ajax({
      url: "/api/getPersonInfo",
      data: {
        id : id
      },
      success : $.proxy(this.handleGetPersonInfoSucc,this)
    })
  },
  handleGetPersonInfoSucc : function (res) {
    this.createPersonMenu(res);
  },
  bindEvents : function () {
    this.submitBtn = this.model.find(".js-submit");
    // this.submitBtn.on("click",$.proxy(this.handSubmitBClick,this))
  },
  // handSubmitBClick : function () {
  //   var company = this.company.val(),
  //     position = this.position.val(),
  //     salary = this.salary.val(),
  //     address = this.address.val(),
  //     logo = this.logo[0].files[0];
  //   var formData = new FormData();
  //   formData.append("company", company);
  //   formData.append("position", position);
  //   formData.append("salary", salary);
  //   formData.append("address", address);
  //   formData.append("id", this.id);
  //   formData.append("logo", logo);
  //   $.ajax({
  //     url: "/api/updataPosition",
  //     type: "POST",
  //     data: formData,
  //     cache: false,
  //     processData: false,
  //     contentType: false,
  //     success: $.proxy(this.handleUpdataSucc,this)
  //   })
  // },
  // handleUpdataSucc : function (res) {
  //   console.log(res);
  //   if(res && res.data && res.data.updata){
  //     this.SuccNoticeEle = this.model.find(".js-succ-notice");
  //     this.SuccNoticeEle.removeClass("hide");
  //     $(this).trigger("change");
  //     setTimeout($.proxy(this.handleSuccNotice,this),1000)
  //   }
  // },
  // handleSuccNotice : function () {
  //   this.SuccNoticeEle.addClass("hide");
  //   this.model.modal("hide");
  // }
})