var UserDetailsView = function(){
    // Thuộc tính
	var that = this;
	this.AppTitle = 'Chi tiết tài khoản';
	this.oTable = null;
	this.oDialog = null;
	this.oUser = new User();
    this.id = 0;

    // Phương thức
	this.initPage = function () {
		that.oUser.id = Util.Url.getParameterByName('id');
		that.bindPopup();
    }

    this.bindPopup = function(){
		that.AppTitle = that.oUser.id == 0? 'Thêm mới Cán bộ':'Cập nhật thông tin Cán bộ';
		that.lockForm(false);

		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
		if (that.oUser.id != 0) {
			that.oUser.getById();
			$('#name').val(that.oUser.name);
			$('#phone').val(that.oUser.phone);
			$('#account').val(that.oUser.account);
			$('#email').val(that.oUser.email);
			$('#role').val(that.oUser.role);
			$('#position').val(that.oUser.position);
			$('#status').val(that.oUser.status);
			$('#dateOfBirth').val(new Date(that.oUser.dateOfBirth));
			$('#password').val(that.oUser.password);

			$("#role").attr("disabled", true);
			$("#password").attr("disabled", true);

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
			
			that.oUser.name = $('.FORM #name').val();
			that.oUser.phone = $('.FORM #phone').val();
			that.oUser.account = $('.FORM #account').val();
			that.oUser.email = $('.FORM #email').val();
			that.oUser.role = $('.FORM #role').val();
			that.oUser.position = $('.FORM #position').val();
			that.oUser.status =  parseInt($('.FORM #status').val());
			that.oUser.dateOfBirth = new Date($('.FORM #dateOfBirth').val()).getTime();
			that.oUser.password = $('.FORM #password').val();

			if(that.oUser.name === ''){
				alert("Tên Cán bộ không được để trống");
				return;
			}
			if(that.oUser.account === ''){
				alert("Tài khoản không được để trống");
				return;
			}
			if(that.oUser.password === ''){
				alert("Mật khẩu không được để trống");
				return;
			}

			var rs = that.oUser.save();
			alert(rs.MESSAGE);

			that.lockForm(true);
		});

		$('.ACTIONS').on('click', '#btnReset', function () {
			if (confirm('Bạn có chắc chắn muốn reset mật khẩu cho tài khoản không?')) {
				$('#password').val("123456");
				alert("Mật khẩu đã được reset thành 123456! Bấm lưu để hoàn thành!");
			}
		});
		$('.ACTIONS').on('click', '#btnRole', function () {
			$('#role').attr('disabled',false);
		});

		$('.ACTIONS').on('click', '#btnClose', function () {
			window.parent.oUserView.oDialog.close();
		});

	});
}