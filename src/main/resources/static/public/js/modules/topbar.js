var TopBar = function() {

	this.oDialog = null;

	var that = this;
	
	this.init = function() {
		var oAUTH =JSON.parse( window.localStorage.getItem('AUTH'));
		//console.log('INFO | TopBar | oAUTH',oAUTH);
		if (oAUTH) {
			$('.UserName').html(oAUTH.UserName);
			$('.FullName').html(oAUTH.FullName);
			that.filterMenu();
		}else{
			location.replace(CONFIG_APP.URL.CONTEXT +CONFIG_APP.URL.LOGIN);
		}
		
		if (CONFIG_APP.NAVBAR_AUTOHIDE) {
			setTimeout(function(){
				$("body").toggleClass("minimize-menu");
			}, 3000);
		}

	}

	this.filterMenu = function(){
		var oAUTH =JSON.parse( window.localStorage.getItem('AUTH'));
		Util.Log.info('TopBar.filterMenu.oAUTH',oAUTH);
		if (oAUTH.UserName !='admin') {
			$('#menu_bacsi').css('display','none');
			$('#menu_baocao').css('display','none');
		}
	}

	this.getClock = function() {
		var date = new Date();
		function addZero(x) {
			if (x < 10) {
				return x = '0' + x;
			} else {
				return x;
			}
		}

		function twelveHour(x) {
			if (x > 12) {
				return x = x - 12;
			} else if (x == 0) {
				return x = 12;
			} else {
				return x;
			}
		}

		var h = addZero(twelveHour(date.getHours()));
		var m = addZero(date.getMinutes());
		var s = addZero(date.getSeconds());
		return h + ':' + m + ':' + s;
	}
	
	
	this.updateClock = function(){
		$('#DongHo').text(that.getClock());
	}

	this.clearChangePassForm = function(){
		$('#oldPassword').val('');
		$('#newPassword').val('');
		$('#newPassword1').val('');
		$('#oldPassword').focus();
	}

	this.validChangePass = function(){
		var sInvalid = '';
		var oldPassword = $('#oldPassword').val();
		var newPassword = $('#newPassword').val();
		var newPassword1 = $('#newPassword1').val();

		if (oldPassword.length < 5 || newPassword.length < 5) {
			sInvalid +='<p style="color:red;font-weight:bold"> (*) Mật khẩu không hợp lệ (Số ký tự phải lớn hơn 6 ký tự)</p>';
        }
        
        if (newPassword !== newPassword1) {
			sInvalid +='<p style="color:red;font-weight:bold"> (*) Xác nhận mật khẩu mới không khớp</p>';
        }

		return sInvalid;

    }


	
	$(function(){

		that.oDialog = new PopupDialog(reload);
		
		that.init();

		function reload() {

		}


		setInterval(that.updateClock, 1000);
		
		$(".menus .item").click(function () {
            $(this).toggleClass("active").siblings().removeClass('active');

        });
		
        $(".header .nav-icon").click(function () {
            $("body").toggleClass("minimize-menu");

        });
        
        $(".menus li").each(function(){
            if($(this).hasClass("active")){
                $(this).parent().parent().addClass("active");
            }
        });
        
        $(".overlay-common").click(function () {
            $("body").removeClass("minimize-menu");
        }); 
        
        $('#btnSignOut').click(function(){
			// AUTH.logout();
			window.location("/");
		});
		
		$('#btnChangePass').click(function(){
			let id = 0;
			let url = CONFIG_APP.URL.CONTEXT + '/app/system/changepassword?id=' + id;
			that.oDialog.show('Đổi mật khẩu', url, '40%', '300px');
		});
	})
	
}