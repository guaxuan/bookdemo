function Page() {

}

Page.templateFlag = `
  <div class="container">
        <div class="well well-lg">请先登录</div>
    </div>
`;
$.extend(Page.prototype, {
  init: function () {
    this.createHead();
    this.createFlagDanger();
  },
  createHead: function () {
    var headContainer = $(".js-header");
    this.header = new Header(headContainer,1);
    $(this.header).on("change",$.proxy(this.handleCreateContainer,this))
  },
  createFlagDanger : function () {
    this.flagDanger = $(Page.templateFlag);
    $("body").append(this.flagDanger);
  },
  createAddPos : function () {
    var postionContainer = $(".js-container");
    this.addPos = new AddPosition(postionContainer);
    $(this.addPos).on("change",$.proxy(this.handleAddposChange,this))
  },
  createPositionList: function() {
    var positionContainer = $(".js-container");
    this.positionList = new PositionList(positionContainer);
    $(this.positionList).on("change",$.proxy(this.handleListChange,this))
  },
  createPagination : function () {
    this.pageContainer = $(".js-pagination");
    this.pagination = new Pagination(this.pageContainer);
    $(this.pagination).on("change",$.proxy(this.handlePaginationChange,this))
  },
  handleCreateContainer : function () {
    this.createAddPos();
    this.createPositionList();
    this.createPagination();
    this.flagDanger.addClass("hide");
  },
  handleListChange : function (e) {
    this.pagination.settotal(e.total,e.index);
  },
  handlePaginationChange : function (e) {
    this.positionList.changePage(e.page);
  },
  handleAddposChange :function () {
    this.positionList.getListInfo();
  },

})