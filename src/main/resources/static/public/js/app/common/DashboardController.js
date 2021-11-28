var DashboardController = function(){
    var that = this;
    var PageTitle ='OFFICE | Bảng điều khiển';
	this.oDocument = new Document();
	this.oNotification = new Notification();
	this.oTable = null;
    
	this.initPage = function(){
		$(document).attr("title", PageTitle);
		that.bindGrid();
	}
	this.bindGrid = function(){
		that.oDocument.getAll();

		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < that.oDocument.LIST.length; i++) {
			var item = that.oDocument.LIST[i];
			var act = '<div class="row-actions">';
			act += '<button class="btn btn-sm btn-success btnExpand" data-id="'+ item.id +'"><i class="fa fa-arrows-alt"></i></button>';
			act += '</div>';

			aRows.push([
				(i + 1),
				item.num,
				item.organOut,
				new Date(item.dateExpiration).toLocaleDateString(),
				act
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	$(document).ready(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);

		that.initPage();

		$('#Grid01').on('click', '.btnExpand', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/document/documentexpand?id=' + id;
			window.location.href = url;
		});

	});
}