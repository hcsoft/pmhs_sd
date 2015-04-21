Ext.ns("app");

app.residentPanel = new Ext.tf.HealthPanel({
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findHealthFiles,
	deleteUrl : UserMenuTreeService.removeHealthFiles,
	dataExportUrl : DataExportService.dataExportHealthFile,
	gridViewConfig : {
		forceFit : true,
		getRowClass : function(record, rowIndex, rowParams, store) {
			console.log(rowIndex);
			if (rowIndex % 2 == 0) {
				return 'my_row_odd';
			} else {
				return 'my_row_even';
			}
		}
	},
	title : '居民健康档案',
	detailUrl : '/personalInfo.html',
	queryType : 'demo',
	recordId : 'fileNo',
	recordPk : 'fileNo',
	visitDoctor : 'visitDoctor',
	advancedFeatures : true,
	isPrintHealthFile : true,
	readerConfig : [ {
		name : 'fileNo'
	}, {
		name : 'name'
	}, {
		name : 'personalInfo_sex',
		mapping : 'personalInfo.sex'
	}, {
		name : 'personalInfo_birthday',
		mapping : 'personalInfo.birthday'
	}, {
		name : 'personalInfo_idnumber',
		mapping : 'personalInfo.idnumber'
	}, {
		name : 'address'
	}, {
		name : 'personalInfo_linkman',
		mapping : 'personalInfo.linkman'
	}, {
		name : 'paperFileNo',
		mapping : 'paperFileNo'
	}, {
		name : 'personalInfo_tel',
		mapping : 'personalInfo.tel'
	}, {
		name : 'doctor',
		mapping : 'doctor'
	}, {
		name : 'inputPersonId',
		mapping : 'inputPersonId'
	} ],
	gridCmConfig : [ {
		"header" : "状态",
		renderer : addTooltip,
		"width" : 80
	}, {
		"header" : "档案编号",
		"dataIndex" : "fileNo",
		"width" : 200
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	}, {
		"header" : "性别",
		"dataIndex" : "personalInfo_sex",
		"width" : 50
	}, {
		"header" : "生日",
		"dataIndex" : "personalInfo_birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "身份证号",
		"dataIndex" : "personalInfo_idnumber"
	}, {
		"header" : "联系人",
		"dataIndex" : "personalInfo_linkman"
	}, {
		"header" : "住址",
		"dataIndex" : "address"
	}, {
		"header" : "纸质档案号",
		"dataIndex" : "paperFileNo"
	}, {
		"header" : "电话",
		"dataIndex" : "personalInfo_tel"
	}, {
		"header" : "建档医生",
		"dataIndex" : "doctor"
	}, {
		"header" : "录入人",
		"dataIndex" : "inputPersonId"
	}  ],

	getAddParams : function() {

		var node = this.getTreeSelNode();

		var districtNumber = node.id;
		var township = '';
//		console.log(node.attributes.data.parentName);
		if (node.parentNode) {
			township = escape(node.parentNode.text);
			if(township == 'root')
				township = escape(node.attributes.data.parentName);
		}
		var village = escape(node.text);

		var param = '?districtNumber=' + districtNumber + '&township='
				+ township + '&village=' + village;
		return param;
	}
});

_tab = ModuleMgr.register(app.residentPanel);
