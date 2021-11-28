var DocumentDetailsView = function(){
    // Thuộc tính
	var that = this;
	this.AppTitle = 'Chi tiết văn bản';
	this.oTable = null;
	this.oDialog = null;
	this.oDocument = new Document();
	this.oType = new Type();
	this.oUser = new User();
    this.id = 0;

    // Phương thức
	this.initPage = function () {
		that.oDocument.id = Util.Url.getParameterByName('id');
		that.oUser.bindSelect('#assignee');
		that.oType.bindSelect('#type');
		that.bindPopup();
    }

    this.bindPopup = function(){
		that.AppTitle = that.oDocument.id == 0? 'Thêm mới Cán bộ':'Cập nhật thông tin Cán bộ';
		that.lockForm(false);

		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oDocument.id != 0) {
			that.oDocument.getById();
			$('#type').val(that.oDocument.typeId.id);
			$('#priority').val(that.oDocument.priority);
			$('#num').val(that.oDocument.num);
			$('#organOut').val(that.oDocument.organOut);
			$('#dateOut').val(that.oDocument.dateOut);
			$('#dateReceive').val(that.oDocument.dateReceive);
			$('#assignee').val(that.oDocument.assgineeId?that.oDocument.assgineeId.id:'0');
			$('#quote').val(that.oDocument.quote);
			$('#description').val(that.oDocument.description);

		}
    }
    
    this.lockForm = function(type){
		$(".FORM :input").attr("disabled", type);
		$(".ACTIONS :button").attr("disabled", type);
    }

    // Sự kiện
	$(document).ready(function () {

		that.initPage();

		$('.ACTIONS').on('click', '#btnSave', function () {
			
			that.oDocument.typeId = {id: $('.FORM #type').val()};
			that.oDocument.priority = $('.FORM #priority').val();
			that.oDocument.num = $('.FORM #num').val();
			that.oDocument.organOut = $('.FORM #organOut').val();
			that.oDocument.dateOut = new Date($('.FORM #dateOut').val()).getTime();
			that.oDocument.dateReceive = new Date($('.FORM #dateReceive').val()).getTime();
			that.oDocument.assgineeId = $('.FORM #assignee').val()=='0'?null:{id: $('.FORM #assignee').val()};
			that.oDocument.quote =  $('.FORM #quote').val();
			that.oDocument.description = $('.FORM #description').val();

			var rs = that.oDocument.save();
			alert(rs.MESSAGE);
			//
			// that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oDocumentView.oDialog.close();
		});

	});
}