function Header(headercontainer,index) {
	this.headerCon = headercontainer;
	this.index = index;
	this.init();
	// this.flag = false;
}
Header.template = `<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">拉勾网后台</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav js-index">
        <li><a href="/index.html">首页</a></li>
        <li><a href="/list.html">职位管理</a></li>
         <li><a href="/applicant.html">求职信息</a></li>
      </ul>
			<ul class="nav navbar-nav navbar-right js-right">

			</ul>
    </div>
  </div>
</nav>`;

$.extend(Header.prototype, {
	init : function () {
		this.creataDom();
    this.getLoginInfo();
    this.setSelected();
  },
  creataDom : function () {
		this.ele = $(Header.template);
    this.rightArea = this.ele.find(".js-right");
		this.headerCon.append(this.ele);
  },
  setSelected : function () {
      var indexArea = this.ele.find(".js-index");
      var indexItems = indexArea.find("li");
      indexItems.eq(this.index).addClass("active");
  },
  getLoginInfo : function () {
	  $.ajax({
      url: "/api/isLogin",
      success: $.proxy(this.handleGetLoginSucc, this)
    })
  },
  handleGetLoginSucc : function (res) {
    if (res && res.data && res.data.isLogin) {
      this.createLogout();
      $(this).trigger("change");
    }else {
      this.createLogin();
      this.createRegister();
    }
  },
  createLogin : function () {
		this.login = new Login(this.rightArea,this.ele);
  },
  createRegister : function () {
    this.register = new Register(this.rightArea,this.ele);
  },
  createLogout: function() {
    this.logout = new Logout(this.rightArea);
  }
})