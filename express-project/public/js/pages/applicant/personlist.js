function PositionList(container) {
  this.container = container;
  this.page = 1;
  this.size = 10;
  this.init();
}
PositionList.templateModel =`
  <table class="table table-bordered" style="margin-top:20px;">
		<thead>
			<tr>
				<th>序号</th>
				<th>姓名</th>
				<th>年龄</th>
				<th>毕业院校</th>
				<th>照片</th>
				<th>期望薪资</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody class="js-tbody"></tbody>
	</table>
`;

$.extend(PositionList.prototype,{
  init : function () {
    this.createDom();
    this.createMateSalary();
    this.bindEvents();
    this.getListInfo();
  },
  createDom : function () {
    this.model = $(PositionList.templateModel);
    this.container.append(this.model);
  },
  createMateSalary : function () {
    this.matesalary = new MateSalary(this.container);
    // $(this.matesalary).on("change",$.proxy(this.handleUpdatePosChange,this))
  },
  handleUpdatePosChange : function () {
    this.getListInfo();
  },
  bindEvents : function () {
    this.container.on("click",$.proxy(this.handleTableClick,this));
  },
  handleTableClick : function (e) {
    var target = $(e.target)
      , isMateClick = target.hasClass("js-mate");
    if(isMateClick){
      this.matesalary.showItem(target.attr("data-id"));
    }
  },
  deleteItem : function (id) {
    $.ajax({
      url : "/api/removePosition",
      data : {
        id : id
      },
      success : $.proxy(this.handleItemDeleteSucc,this)
    })
  },
  handleItemDeleteSucc : function (res) {
    if(res && res.data && res.data.delete){
      this.getListInfo();
    }
  },
  getListInfo : function () {
    $.ajax({
      url: "/api/getpersonlist",
      type: "GET",
      data: {
        page : this.page,
        size : this.size
      },
      success: $.proxy(this.handleGetListSucc,this)
    })
  },
  handleGetListSucc : function (res) {
    if(res && res.data && res.data.list){
      this.createItems(res.data.list);
      // if(this.page > res.data.totalpage){
      //   this.page = res.data.totalpage;
      //   this.getListInfo();
      // }else {
      //   $(this).trigger( new $.Event("change",{
      //     total : res.data.totalpage,
      //     index : this.page
      //   }))
      // }
    }
  },
  createItems : function (list) {
    var str = "";
    var itemsContainer = this.model.find(".js-tbody");
    for(var i = 0;i < list.length;i++){
      var item = list[i];
      var pic = item.filename ? item.filename : "1515117751462%E4%B8%8B%E8%BD%BD.jpeg"

      str += `
        <tr>
						<td>${i + 1}</td>
						<td>${item.name}</td>
						<td>${item.age}</td>
						<td>${item.university}</td>
            <td><img style="width:30px;height:30px;" src="/uploads/${pic}"/></td>
            <td>${item.salary}</td>
						<td>
							<span class="js-mate" data-id="${item._id}">匹配</span>
						</td>
					</tr>
      `;
    }
    itemsContainer.html(str);
  },
  changePage : function (page) {
    this.page = page;
    this.getListInfo();
  }

})