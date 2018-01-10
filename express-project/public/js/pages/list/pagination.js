function Pagination(container) {
  this.container = container;
  this.bindEvents();
}


$.extend(Pagination.prototype,{
  // init : function () {
  //   this.createDom();
  // },
  
  settotal : function (total,index) {
    this.createDom(total,index);
  },
  createDom : function (total,index) {
    var str = "";
    for(var i = 0;i < total;i++){
      str += `
        <li class="js-item"><a href="javascript:;">${i+1}</a></li>
      `;
    }
    this.container.html(str);
    this.addItemClass(index);
  },
  addItemClass : function (index) {
    this.items = this.container.find(".js-item");
    this.items.eq(index-1).addClass("active")
  },
  bindEvents : function () {
    this.container.on("click",$.proxy(this.handleClick,this));
  },
  handleClick : function (e) {
    var target = $(e.target),
        page = parseInt(target.text(),10);
    $(this).trigger( new $.Event("change",{ page : page}));
  },
})