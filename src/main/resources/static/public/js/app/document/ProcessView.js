var ProcessView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'GIÁM SÁT TIẾN ĐỘ THỰC HIỆN';
	this.oTable = null;
	this.oDialog = null;
	this.oUser = new User();

	// Phương thức
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		document.title = that.AppTitle;
		that.bindGrid();
	}

	this.bindGrid = function(){
		that.oUser.getAll();

		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < that.oUser.LIST.length; i++) {
			var item = that.oUser.LIST[i];
			let _status = item.status === 1 ? '<label class="label label-success">Hoạt động</label>' : '<label class="label label-danger">Khóa</label>';
			aRows.push([
				(i + 1),
				item.account,
				item.name,
				item.phone,
				item.email,
				new Date(item.dateOfBirth).toLocaleDateString(),
				_status,
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