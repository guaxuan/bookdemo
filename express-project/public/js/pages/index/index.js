function Page() {

}

$.extend(Page.prototype, {
	init: function () {
		this.createHead();

	},
	createHead: function () {
		var headContainer = $(".js-header");
		this.header = new Header(headContainer,0);
	},

})