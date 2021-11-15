var Notification = function(){
	var that = this;
	const URL = {
		GETALL:'notification/search',
		GETBYID:'notification/getbyid',
		SAVE:'notification/create',
		DEL:'notification/delete',
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.toId = null;
	this.from = '';
	this.content = '';
	this.time = 0;
	this.status = 0;

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
		console.log(rs);
	}
	
	// get data by id
	this.getById = function(){
		var rs = DATA.get(URL.GETBYID+"/"+that.id);
		var item = rs.RESULT;
		this.id=item.id;
		this.toId = item.toId;
		this.from = item.from;
		this.content = item.content;
		this.time = item.time;
		this.status = item.status;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			toId:that.toId,
			from:that.from,
			content:that.content,
			time:that.time,
			status:that.status
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(){
		return DATA.get(URL.DEL+"/"+that.id);
	}
	
	this.bindSelect = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> - Chọn loại văn bản - </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}
	this.bindSelect2 = function(sControlId){
		that.getAll();
		var html = '<option  value="0"> -Chọn loại văn bản- </option>';
		for (let i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html +='<option  value="'+ item.id +'">' + item.name +'</option>';
		}
		$(sControlId).html(html);
		$(sControlId).select2();
		$(sControlId).val($(sControlId + ' option:first-child').val()).trigger('change');
	}

}