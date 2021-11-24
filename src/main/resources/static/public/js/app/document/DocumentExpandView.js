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

		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oDocument.id != 0) {
			that.oDocument.getById();
			$('#type').html(that.oDocument.typeId.name);
			switch (that.oDocument.priority) {
				case 1:
					$('#priority').html("Thấp");
					break;
				case 2:
					$('#priority').html("Trung Bình");
					break;
				case 3:
					$('#priority').html("Cao");
					break;
			};
			$('#num').html(that.oDocument.num);
			$('#organOut').html(that.oDocument.organOut);
			$('#quote').html(that.oDocument.quote);
			$('#description').html(that.oDocument.description);
			$('#assignee').html(that.oDocument.assgineeId?that.oDocument.assgineeId.name:'');
			$('#reporter').html(that.oDocument.reporterId?that.oDocument.reporterId.name:'');
			$('#dateOut').html(new Date(that.oDocument.dateOut).toLocaleDateString());
			$('#dateReceive').html(new Date(that.oDocument.dateReceive).toLocaleDateString());
			$('#dateAsssign').html(new Date(that.oDocument.dateAssign).toLocaleDateString());
			$('#dateExpiration').html(new Date(that.oDocument.dateExpiration).toLocaleDateString());
			$('#dateDone').html(new Date(that.oDocument.dateDone).toLocaleDateString());

		}
    }

    this.convertDate = function(date){
		if(date == null || date == '' || date == 0){
			return '';
		}
		else{

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