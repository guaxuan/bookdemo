function Register(container,modelcontainer) {
  this.container = container;
  this.modelCon = modelcontainer;
  this.init();

}

Register.templateBtn = `
  <li>
    <a href='javascript:;' data-toggle='modal' data-target='.js-register-modal'>
      注册
    </a>
  </li>
`;

Register.templateModel = `
<!-- Modal -->
<div class="modal fade js-register-modal" tabindex="-1" role="dialog" aria-labelledby="regisertLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="regisertLabel">注册</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="reg-username">用户名</label>
            <input type="text" class="form-control js-user" id="reg-username" placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="reg-password">密码</label>
            <input type="password" class="form-control js-pass" id="reg-password" placeholder="请输入密码">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary js-submit">提交</button>
      </div>
      <div class="alert alert-success hide js-succ-notice" role="alert">恭喜您，注册成功</div>
      <!--<div class="alert alert-info" role="alert"></div>-->
      <!--<div class="alert alert-warning" role="alert"></div>-->
      <div class="alert alert-danger hide js-err-notice" role="alert">对不起，您所注册的用户名已存在</div>
    </div>
  </div>
</div>
`;

$.extend(Register.prototype,{
  init : function () {
    this.createBtn();
    this.createModel();
    this.bindEvents();
  },
  createBtn : function () {
    this.btn = $(Register.templateBtn);
    this.container.append(this.btn);
  },
  createModel : function () {
    this.model = $(Register.templateModel);
    this.modelCon.append(this.model);
    this.succNoticeEle = this.model.find(".js-succ-notice");
    this.errNoticeEle = this.model.find(".js-err-notice");
  },
  bindEvents : function () {
    var submitB = this.model.find(".js-submit");
    submitB.on("click",$.proxy(this.handleSubmitBClick,this));
  },
  handleSubmitBClick : function () {
    var username = this.model.find(".js-user").val(),
        password = this.model.find(".js-pass").val();
    $.ajax({
      url : "/api/register",
      method : "POST",
      data : {
        username: username,
        password: password
      },
      success : $.proxy(this.handleSubmitBSuccess,this)
    })
  },
  handleSubmitBSuccess : function (res) {
    console.log(res);
    if (res.ret && res.data && res.data.register) {
      this.succNoticeEle.removeClass("hide");
      setTimeout($.proxy(this.handleModelFade,this),1000);
    }else{
      this.errNoticeEle.removeClass("hide");
      setTimeout($.proxy(this.handleErrorFade,this),1000);
    }
  },
  handleModelFade : function () {
    this.succNoticeEle.addClass("hide");
    this.model.modal("hide");
  },
  handleErrorFade : function () {
    this.errNoticeEle.addClass("hide");
  }
})