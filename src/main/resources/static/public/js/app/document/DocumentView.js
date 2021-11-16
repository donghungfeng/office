var DocumentView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Danh sách văn bản';
	this.oTable = null;
	this.oDialog = null;
	this.oDocument = new Document();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}

	this.bindGrid = function(){
		that.oDocument.getAll();

		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < that.oDocument.LIST.length; i++) {
			var item = that.oDocument.LIST[i];
			var act = '<div class="row-actions">';
			act += '<button class="btn btn-info btnEdit" data-id="'+ item.id +'"><i class="fa fa-edit"></i></button>';
			act += '<button class="btn btn-danger btnDel" data-id="'+ item.id +'"><i class="fa fa-trash"></i></button>';
			act += '</div>';

			aRows.push([
				(i + 1),
				item.num,
				item.organOut,
				item.dateOut,
				item.dateReceive,
				item.quote,
				item.assgineeId?item.assgineeId.name:'',
				"Hoàn thành",
				act
            ]);
		}
		that.oTable.rows.add(aRows).draw();
	}


	// Sự kiện
	$(document).ready(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);

		that.initPage();

		function reload() {
			that.bindGrid();
		}

		$('#Grid01').on('click', '.btnEdit', function () {
			var id = $(this).data('id');
			var url = CONFIG_APP.URL.CONTEXT + '/app/document/documentdetails?id=' + id;
			that.oDialog.show('Sửa thông tin văn bản', url, '50%', '800px');
			return false;
		});

		$('#Grid01').on('click', '.btnDel', function () {
			var id = $(this).data('id');
			if (confirm('Bạn có chắc chắn xóa văn bản này không?')) {
				that.oDocument.id = id;
				var rs = that.oDocument.del();
			}
			that.bindGrid();
			return false;
		});

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/document/documentdetails?id=0';
			that.oDialog.show('Thêm mới văn bản', url, '50%', '800px');
		});

		$('#Grid01 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
		   }
		   return true;
		 });
	});
}