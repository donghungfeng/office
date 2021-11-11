var DashboardController = function(){
    var that = this;
    var PageTitle ='OFFICE | Bảng điều khiển';
    
	this.initPage = function(){
		$(document).attr("title", PageTitle);
	}

	$(function() {
		that.initPage();
	});
}