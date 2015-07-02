Ext.ns("app");

app.childexam2Panel = new Ext.tf.HealthPanel({
	title : '1至2岁儿童体检记录',
	treeLoaderFn : UserMenuTreeService.getUserDistrictNodes,
	queryUrl : UserMenuTreeService.findChildExam2Records,
	deleteUrl : UserMenuTreeService.removeChildExamRecords,
	dataExportUrl : DataExportService.dataExportChildExam2,
	recordId : 'child.id',
	recordPk : 'id',
	detailUrl : '/childexam2.html',
	isPrintChildrenExam : true,
	childrenPrintType : 3,
	panelId : 'app.childexam2Panel',
	readerConfig : [ {
		name : 'execOrgName',
		mapping : 'org.name'
	}, {
		name : 'id',
		mapping : 'child.id'
	}, {
		name : 'fileNo',
		mapping : 'file.fileNo'
	}, {
		name : 'name',
		mapping : 'file.name'
	}, {
		name : 'sex',
		mapping : 'person.sex'
	}, {
		name : 'birthday',
		mapping : 'person.birthday'
	}, {
		name : 'highRisk',
		mapping : 'child.highRisk'
	}, {
		name : 'checkItem',
		mapping : 'child.checkItem'
	}, {
		name : 'visitDate',
		mapping : 'child.visitDate'
	}, {
		name : 'visitDoctor',
		mapping : 'child.visitDoctor'
	}, {
		name : 'exam12',
		mapping : 'child.exam12'
	}, {
		name : 'username',
		mapping : 'samTaxempcode.username'
	} ],
	gridCmConfig : [

	{
		"header" : "执行机构",
		"dataIndex" : "execOrgName"
	}, {
		"header" : "编号",
		"dataIndex" : "fileNo",
		"width" : 130
	}, {
		"header" : "姓名",
		"dataIndex" : "name"
	}, {
		"header" : "性别",
		"dataIndex" : "sex"
	}, {
		"header" : "出生日期",
		"dataIndex" : "birthday",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	},

	{
		"header" : "高危",
		"dataIndex" : "highRisk"
	}, {
		"header" : "项目",
		"dataIndex" : "checkItem"
	}, {
		"header" : "血红蛋白值",
		"dataIndex" : "exam12"
	}, {
		"header" : "随访日期",
		"dataIndex" : "visitDate",
		"renderer" : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		"header" : "随访医生",
		"dataIndex" : "visitDoctor"
	}, {
		"header" : "录入人",
		"dataIndex" : "username"
	} ]
});
// _tab = ModuleMgr.register(app.childexam2Panel);
ModuleMgr.register(app.childexam2Panel);
