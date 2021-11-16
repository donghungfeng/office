var User = function(){
	var that = this;
	const URL = {
		GETALL:'user/search',
		GETBYID:'user/getbyid',
		SAVE:'user/create',
		DEL:'user/delete',
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.account='';
	this.dateOfBirth=0;
	this.name = ''
	this.password = '';
	this.phone = '';
	this.role = 'USER';
	this.position = '';
	this.status=1;
	this.email = '';

	this.validSave = function(){
		var alert = '';

		if(that.name.length < 1){
			alert += '(*) ' + LABEL.INVALID_name + '<br/> ';
		}
		return alert;
	}

    this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs.RESULT;
	}
	
	// get data by id
	this.getById = function(){
		var rs = DATA.get(URL.GETBYID+"/"+that.id);
		var item = rs.RESULT;
		this.id=item.id;
		this.account=item.account;
		this.dateOfBirth=item.dateOfBirth;
		this.name=item.name;
		this.password=item.password;
		this.phone=item.phone;
		this.role=item.role;
		this.position=item.position;
		this.status=item.status;
		this.email=item.email;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			name:that.name,
			account:that.account,
			dateOfBirth:that.dateOfBirth,
			password:that.password,
			phone:that.phone,
			role:that.role,
			position:that.position,
			status:that.status,
			email:that.email
		}
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(){
		return DATA.get(URL.DEL+"/"+that.id);
	}
	
	this.bindSelect = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> - Chọn cán bộ thực hiện - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}
	this.bindSelect2 = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> -Chọn cán bộ thực hiện- </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).select2();
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}

}