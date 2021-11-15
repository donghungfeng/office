var Document = function(){
	var that = this;
	const URL = {
		GETALL:'document/search',
		GETBYID:'document/getbyid',
		SAVE:'document/create',
		DEL:'document/delete',
	}
	
	const LABEL={
		INVALID_name:'Tên loại nhân viên không hợp lệ',
	}

	// Thuộc tính
	this.id=0;
	this.dateDone = 0;
	this.dateExpiration = 0;
	this.dateAssign = 0;
	this.dateReceive = 0;
	this.dateOut = 0;
	this.fileName = '';
	this.filePath = '';
	this.location = '';
	this.num = '';
	this.organOut = '';
	this.quote = '';
	this.status = 0;
	this.priority = 0;
	this.comment = '';
	this.description = '';
	this.note = '';
	this.assgineeId = null;
	this.reporterId = null;
	this.typeId = null;

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
		this.dateDone = item.dateDone;
		this.dateExpiration = item.dateExpiration;
		this.dateAssign = item.dateAssign;
		this.dateReceive = item.dateReceive;
		this.dateOut = item.dateOfBirth;
		this.fileName = item.fileName;
		this.filePath = item.filePath;
		this.location = item.location;
		this.num = item.num;
		this.organOut = item.organOut;
		this.quote = item.quote;
		this.status = item.status;
		this.priority = item.priority;
		this.comment = item.comment;
		this.description = item.description;
		this.note = item.note;
		this.assgineeId = item.assgineeId;
		this.reporterId = item.reporterId;
		this.typeId = item.typeId;
	}

	//save data
	this.save = function(){
		var data= {
			id:that.id,
			dateDone:that.dateDone,
			dateExpiration:that.dateExpiration,
			dateAssign:that.dateAssign,
			dateReceive:that.dateReceive,
			dateOut:that.dateOut,
			fileName:that.fileName,
			filePath:that.filePath,
			location:that.location,
			num:that.num,
			organOut:that.organOut,
			quote:that.quote,
			status:that.status,
			priority:that.priority,
			comment:that.comment,
			description:that.description,
			note:that.note,
			assgineeId:that.assgineeId,
			reporterId:that.reporterId,
			typeId:that.typeId
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