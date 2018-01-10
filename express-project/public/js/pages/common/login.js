function Login(container,modelContainer) {
  this.container = container;
  this.modelCon = modelContainer;
  this.init();
}

Login.templateBtn = `
  <li>
    <a href='#' data-toggle='modal' data-target='.js-login-modal'>
      登陆
    </a>
  </li>
`;

Login.templateModel = `
<!-- Modal -->
<div class="modal fade js-login-modal" tabindex="-1" role="dialog" aria-labelledby="loginLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="loginLabel">登录</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="login-username">用户名</label>
            <input type="text" class="form-control js-user" id="login-username" placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="login-password">密码</label>
            <input type="password" class="form-control js-pass" id="login-password" placeholder="请输入密码">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary js-submit">登录</button>
      </div>
    </div>
  </div>
</div>
`;

$.extend(Login.prototype,{
  init : function () {
    this.createBtn();
    this.createModel();
    this.bindEvents();
  },
  createBtn : function () {
    this.btn = $(Login.templateBtn);
    this.container.append(this.btn);
  },
  createModel : function () {
    this.model = $(Login.templateModel);
    this.modelCon.append(this.model);
  },
  bindEvents : function () {
    var submitB = this.model.find(".js-submit");
    submitB.on("click",$.proxy(this.handleSubmitBClick,this));
  },
  handleSubmitBClick : function () {

    var username = this.model.find(".js-user").val(),
        userpass = this.model.find(".js-pass").val();
    $.ajax({
      url: "/api/login",
      type: "POST",
      data: {
        username: username,
        password: userpass
      },
      success : $.proxy(this.handleLoginSucc, this)
    })
  },
  handleLoginSucc : function (res) {
    if (res && res.data && res.data.login) {
      setTimeout(()=>{
        window.location.reload();
      },1000)
    }
  }
})

