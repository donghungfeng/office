var DocumentExpandView = function(){
    // Thuộc tính
	var that = this;
	this.AppTitle = 'Chi tiết văn bản';
	this.oTable = null;
	this.oDialog = null;
	this.oDocument = new Document();
    this.id = 0;

    // Phương thức
	this.initPage = function () {
		that.oDocument.id = Util.Url.getParameterByName('id');
		that.bindPopup();
    }

    this.bindPopup = function(){
		that.AppTitle = that.oDocument.id == 0? 'Thêm mới Cán bộ':'Cập nhật thông tin Cán bộ';
		that.lockForm(false);

		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oDocument.id != 0) {
			that.oDocument.getById();
		}
    }
    
    this.lockForm = function(type){
		$(".FORM :input").attr("disabled", type);
		$(".ACTIONS :button").attr("disabled", type);
    }

    // Sự kiện
	$(document).ready(function () {

		that.initPage();

	});
}