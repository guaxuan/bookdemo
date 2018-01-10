function Page() {

}

$.extend(Page.prototype, {
  init: function () {
    this.createHead();
    this.createAddPerson();
    this.createPersonList();
  },
  createHead: function () {
    var headContainer = $(".js-header");
    this.header = new Header(headContainer,2);
  },
  createAddPerson : function () {
    var personCon = $(".js-container");
    this.addpersoninfo = new Addpersoninfo(personCon);
    $(this.addpersoninfo).on("change",$.proxy(this.handleAddpersonChange,this))
  },
  createPersonList: function() {
    var personContainer = $(".js-container");
    this.poersonList = new PositionList(personContainer);
    // $(this.positionList).on("change",$.proxy(this.handleListChange,this))
  },
  handleAddpersonChange :function () {
    this.poersonList.getListInfo();
  }

  // createPagination : function () {
  //   this.pageContainer = $(".js-pagination");
  //   this.pagination = new Pagination(this.pageContainer);
  //   $(this.pagination).on("change",$.proxy(this.handlePaginationChange,this))
  // },
  // handleListChange : function (e) {
  //   this.pagination.settotal(e.total,e.index);
  // },
  // handlePaginationChange : function (e) {
  //   this.positionList.changePage(e.page);
  // },
  // handleAddposChange :function () {
  //   this.positionList.getListInfo();
  // },

})