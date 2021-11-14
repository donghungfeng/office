var UserView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Danh sách nhân sự';
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
			var act = '<div class="row-actions">';
			act += '<button class="btn btn-info btnEdit" data-id="'+ item.id +'"><i class="fa fa-edit"></i></button>';
			act += '<button class="btn btn-danger btnDel" data-id="'+ item.id +'"><i class="fa fa-trash"></i></button>';
			act += '</div>';
			let _status = item.status === 1 ? '<label class="label label-success">Hoạt động</label>' : '<label class="label label-danger">Khóa</label>';
			let _rank = "";
			switch (item.role) {
				case "USER":
					_rank = '<span class="label" style="background-color: black"><i class="fa fa-user"></i> Cán bộ </span>';
					break;
				case "UNIT":
					_rank = '<span class="label" style="background-color: #a6a6a6"><i class="fa fa-angle-up"></i> Lãnh đạo</span>';
					break;
				case "ADMIN":
					_rank = '<span class="label" style="background-color: gold"><i class="fa fa-angle-double-up"></i> Quản trị hệ thống</span>';
					break;
			}
			aRows.push([
				(i + 1),
				item.account,
				item.name,
				item.phone,
				item.email,
				new Date(item.dateOfBirth).toLocaleDateString(),
				item.position,
				_rank,
				_status,
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
			var url = CONFIG_APP.URL.CONTEXT + '/app/system/userdetails?id=' + id;
			that.oDialog.show('Sửa thông tin cán bộ', url, '40%', '600px');
			return false;
		});

		$('#Grid01').on('click', '.btnDel', function () {
			var id = $(this).data('id');
			if (confirm('Bạn có chắc chắn xóa cán bộ này không?')) {
				that.oUser.id = id;
				var rs = that.oUser.del();
			}
			that.bindGrid();
			return false;
		});

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/system/userdetails?id=0';
			that.oDialog.show('Thêm mới tài khoản cán bộ', url, '40%', '600px');
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