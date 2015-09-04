PrintHealthFileAndExamClass = function() {
	// 组件初始化
};
PrintHealthFileAndExamClass.prototype.addZero = function(val){
	if(val < 10){
		return '0' + val;
	}
	return val;
}
PrintHealthFileAndExamClass.prototype.judgeDate = function(judgeType,date){
	if((date == null || date == ' ' || date == '' || date == -1)){
		if(judgeType == 0)
			return '未测';
	}else if(date instanceof Date){
		return date.getFullYear() + '' + PrintHealthFileAndExamClass.addZero(date.getMonth()) + '' + PrintHealthFileAndExamClass.addZero(date.getDate());
	}
	return date;
}
/*
 * 修改后的打印程序 20141007
 */
PrintHealthFileAndExamClass.prototype.printHealthFileOther = function(fileNo){
	var dsArray = [];
	window.cfg = [			{				id : "fileNo",				xtype : "input",				setting : {					maxlen : 18,					size : 18,					asLabel : true				}			},			{				id : "historyselect",				xtype : "historycombo",				setting : {					ds : {						search : Ext.Empty,						get : Ext.Empty					},					local : false,					cssstyle : "height:100%;width:200px;",					model : {						id : 0,						code : 0,						display : 1					},					maxlen : {						"0" : ',2,3,4,5,',						"1" : ',15,18,'					},					showDisplay : false,					roWhenSet : false,					writeback : [ {						id : "name",						col : 1,						force : true					}, {						id : "sex",						col : 2,						force : true,						nullvalue : "${$3|get_sex}",						forcenullvalue : true					}, {						id : "idnumber",						col : 3,						force : true					}, {						id : "birthday",						col : 4,						force : true,						nullvalue : "${$3|get_birthday}",						forcenullvalue : true					}, {						id : "address",						col : 6,						force : true					}, {						id : "residenceAddress",						col : 7,						force : true					}, {						id : "tel0",						col : 8,						force : true					}, {						id : "buildUnit",						col : 11,						force : true					}, {						id : "buildPerson",						col : 12,						force : true					}, {						id : "doctor",						col : 13,						force : true					}, {						id : "buildDate",						col : 14,						force : true					} ],					mCodePrefixCtrlId : 'districtNumber',					displayCols : [ 1, 2, 3, 4, 11, 12 ],					displayColNames : [ "姓名", "性别", "身份证号", "生日", '年龄', '地址',							'户籍地址', '电话', '乡镇', '村委会', '建档单位', '建档人', '责任医师',							'建档日期' ]				}			}, {				id : "paperFileNo",				xtype : "input",				setting : {					maxlen : 18,					size : 18				}			}, {				id : "name",				xtype : "input",				setting : {					maxlen : 18,					size : 18				},				required : [ true, "姓名" ]			}, {				id : "barCode",				xtype : "input",				setting : {					maxlen : 18,					size : 18				}			}, {				id : "sex",				xtype : "list",				setting : {					ds : "111",					controlShow : 3,					controlShowVal : "bornStatus"				},				required : [ true, "性别" ]			}, {				id : "folk",				xtype : "list",				setting : {					ds : "57",					isDefaultVal : true,					defaultVal : 0				},				requires : {					valEq : "2",					fields : [ "folkOther" ]				}			}, {				id : "folkOther",				xtype : "input",				setting : {					disabled : true,					maxlen : 10,					size : 10,					caption : "其他民族"				}			}, {				id : "idnumber",				xtype : "input",				setting : {					maxlen : 18,					size : 18,					format : 'idnumber',					calculateBirthday : true,					calculateBirthdayByIDNumber : [ "birthday" ],					checkfunc : window.checkidnumber				},				required : [ true, "身份证号" ]			}, {				id : "birthday",				xtype : "input",				setting : {					format : "date",					maxlen : 8,					size : 10				},				required : [ true, "出生日期" ]			}, {				id : "nation",				xtype : "input",				setting : {					maxlen : 8,					size : 2,					defaultVal : "中国"				},				required : [ true, "国籍" ]			}, {				id : "workUnit",				xtype : "input",				setting : {					maxlen : 19,					size : 19,					defaultVal : "无"				}			}, {				id : "tel",				xtype : "input",				setting : {					maxlen : 20,					size : 15				}			}, {				id : "linkman",				xtype : "input",				setting : {					maxlen : 10,					size : 10				}			}, {				id : "linkmanTel",				xtype : "input",				setting : {					maxlen : 11,					size : 11				}			}, {				id : "bloodTypeAbo",				xtype : "list",				setting : {					ds : "115"				}			}, {				id : "maritalStatus",				xtype : "list",				setting : {					ds : "37"				}			}, {				id : "farmStatus",				xtype : "list",				setting : {					ds : "171",					isDefaultVal : true,					defaultVal : 0				},				required : [ true, "是否农业人口" ]			}, {				id : "townStatus",				xtype : "list",				setting : {					ds : "171",					isDefaultVal : true,					defaultVal : 1				},				required : [ true, "是否城镇居民" ]			}, {				id : "allergiesHistory",				xtype : "list",				setting : {					ds : "34",					multi : true,					save : "id",					mapping : {						value : "allergiesId"					},					controlShow : 0,					isDefaultVal : true,					defaultVal : 0				},				requires : {					valEq : 5,					fields : [ "allergiesOther" ]				}			}, {				id : "allergiesOther",				xtype : "input",				setting : {					disabled : true,					maxlen : 10,					size : 10,					caption : "其他药物过敏史"				}			}, {				id : "exposeHistory",				xtype : "list",				setting : {					ds : "192",					multi : true,					save : "id",					mapping : {						value : "exposeId"					},					controlShow : 0,					isDefaultVal : true,					defaultVal : 0				}			}, {				id : "education",				xtype : "list",				setting : {					ds : "99"				}			}, {				id : "bloodTypeRh",				xtype : "list",				setting : {					ds : "3",					isDefaultVal : true,					defaultVal : 2				}			}, {				id : "occupation",				xtype : "list",				setting : {					ds : "137",					newlineStep : 1,					isDefaultVal : true,					defaultVal : 4				}			}, {				id : "resideType",				xtype : "list",				setting : {					ds : "7",					isDefaultVal : true,					defaultVal : 0				}			}, {				id : "opshistory",				xtype : "grid",				setting : {					ds : "operations",					displayCols : [ "opsname", "opsdate" ],					displayColNames : [ "名称", "时间" ],					colXtypes : [ "input", "input" ],					colSettings : [ {}, {						maxlen : 8,						format : "date"					} ],					required : [ "opsname" ]				},				errCaption : "手术"			}, {				id : "traumaHistory",				xtype : "grid",				setting : {					ds : "injuries",					displayCols : [ "traumaName", "traumaDate" ],					displayColNames : [ "名称", "时间" ],					colXtypes : [ "input", "input" ],					colSettings : [ {}, {						maxlen : 8,						format : "date"					} ],					required : [ "traumaName" ]				},				errCaption : "外伤"			}, {				id : "bloodTrans",				xtype : "grid",				setting : {					ds : "bloodTrans",					displayCols : [ "reason", "transDate" ],					displayColNames : [ "原因", "时间" ],					colXtypes : [ "input", "input" ],					colSettings : [ {}, {} ],					required : [ "reason" ]				},				errCaption : "输血"			}, {				id : "disabilityStatus",				xtype : "list",				setting : {					ds : "6",					multi : true,					save : "id",					mapping : {						value : "disabilityStatusId"					},					newlineStep : 7,					controlShow : 0,					isDefaultVal : true,					defaultVal : 0				},				requires : {					valEq : 8,					fields : [ "disabilityStatusOther" ]				}			}, {				id : "disabilityStatusOther",				xtype : "input",				setting : {					maxlen : 10,					disabled : true,					size : 10,					caption : "其他残疾"				}			}, {				id : "paymentMode",				xtype : "list",				setting : {					ds : "123",					multi : true,					save : "id",					mapping : {						value : "paymentModeId"					},					newlineStep : 4,					isDefaultVal : true,					defaultVal : 2				},				requires : {					valEq : 8,					fields : [ "paymentModeOther" ]				}			}, {				id : "paymentModeOther",				xtype : "input",				setting : {					maxlen : 10,					disabled : true,					size : 10,					caption : "其他支付方式"				}			}, {				id : "geneticHistory",				xtype : "list",				setting : {					ds : "151",					isDefaultVal : true,					defaultVal : 0				},				requires : {					valEq : 2,					fields : [ "geneticHistoryOther" ]				}			}, {				id : "geneticHistoryOther",				xtype : "input",				setting : {					disabled : true,					maxlen : 10,					size : 10,					caption : "疾病名称"				}			}, {				id : "diseaseHistory",				xtype : "grid",				setting : {					ds : "diseaseHistory",					other_init_param : window.parent.other_init_param,					displayCols : [ "diseaseId", "confirmDate", "remark" ],					displayColNames : [ "疾病名称", "确诊时间", "疾病说明" ],					colXtypes : [ "combo", "input", "input" ],					colSettings : [ {						ds : "38",						multi : false,						model : {							id : "number",							code : "number",							display : "name"						},						displayCols : [ "number", "name" ],						displayColNames : [ "编号", "疾病" ]					}, {						maxlen : 8,						format : "date"					}, {} ],					required : [ "diseaseId" ]				},				errCaption : "疾病"			}, {				id : "address",				xtype : "input",				setting : {					maxlen : 40,					size : 40,					defaultValFunc : window.getLastData				}			}, {				id : "residenceAddress",				xtype : "input",				setting : {					maxlen : 40,					size : 40,					defaultValFunc : window.getLastData				}			}, {				id : "tel0",				xtype : "input",				setting : {					maxlen : 18,					size : 18				}			}, {				id : "township",				xtype : "input",				setting : {					maxlen : 18,					size : 18,					readonly : true				}			}, {				id : "village",				xtype : "input",				setting : {					maxlen : 18,					size : 18,					readonly : true				}			}, {				id : "buildUnit",				xtype : "input",				setting : {					maxlen : 18,					size : 18,					defaultValFunc : window.getLastData				}			}, {				id : "districtNumber",				xtype : "input",				setting : {					readonly : true				}			}, {				id : "buildPerson",				xtype : "input",				setting : {					maxlen : 18,					size : 18,					defaultValFunc : window.getLastData				}			}, {				id : "doctor",				xtype : "input",				setting : {					maxlen : 10,					size : 18,					defaultValFunc : window.getLastData				}			}, {				id : "buildDate",				xtype : "input",				setting : {					maxlen : 8,					format : "date"				},				required : [ true, "建档日期" ]			}, {				id : "matherHistory",				xtype : "list",				setting : {					ds : "148",					multi : true,					save : "id",					newlineStep : 5,					forceNewline : true,					mapping : {						value : "heredityId"					},					controlShow : 0,					isDefaultVal : true,					defaultVal : 0				},				requires : {					valEq : 12,					fields : [ "mhistoryOther" ]				}			}, {				id : "mhistoryOther",				xtype : "input",				setting : {					maxlen : 10,					disabled : true,					size : 10,					caption : "残疾"				}			}, {				id : "fatherHistory",				xtype : "list",				setting : {					ds : "148",					multi : true,					save : "id",					newlineStep : 5,					forceNewline : true,					mapping : {						value : "heredityId"					},					controlShow : 0,					isDefaultVal : true,					defaultVal : 0				},				requires : {					valEq : 12,					fields : [ "fhistoryOther" ]				}			}, {				id : "fhistoryOther",				xtype : "input",				setting : {					maxlen : 10,					disabled : true,					size : 10,					caption : "其他"				}			}, {				id : "brotherHistory",				xtype : "list",				setting : {					ds : "148",					multi : true,					save : "id",					newlineStep : 5,					forceNewline : true,					mapping : {						value : "heredityId"					},					controlShow : 0,					isDefaultVal : true,					defaultVal : 0				},				requires : {					valEq : 12,					fields : [ "bhistoryOther" ]				}			}, {				id : "bhistoryOther",				xtype : "input",				setting : {					maxlen : 10,					disabled : true,					size : 10,					caption : "其他残疾"				}			}, {				id : "familyHistory",				xtype : "list",				setting : {					ds : "148",					multi : true,					save : "id",					newlineStep : 5,					forceNewline : true,					mapping : {						value : "heredityId"					},					controlShow : 0,					isDefaultVal : true,					defaultVal : 0				},				requires : {					valEq : 12,					fields : [ "fmHistoryOther" ]				}			}, {				id : "fmHistoryOther",				xtype : "input",				setting : {					maxlen : 10,					disabled : true,					size : 10,					caption : "其他残疾"				}			}, {				id : "kitchen",				xtype : "list",				setting : {					ds : "1245",					isDefaultVal : true,					defaultVal : 0				}			}, {				id : "bunkers",				xtype : "list",				setting : {					ds : "1250",					isDefaultVal : true,					defaultVal : 4				}			}, {				id : "drinkingWater",				xtype : "list",				setting : {					ds : "1257",					isDefaultVal : true,					defaultVal : 0				}			}, {				id : "toilet",				xtype : "list",				setting : {					ds : "1264",					isDefaultVal : true,					defaultVal : 4				}			}, {				id : "poultry",				xtype : "list",				setting : {					ds : "1270",					isDefaultVal : true,					defaultVal : 0				}			}, {				id : "bornStatus",				xtype : "list",				setting : {					ds : "171",					disabled : true,					scoredisable : true				}			}];	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	console.log(dsArray);
	getBasicInfomation(dsArray,fileNo);
}

function addZero(value){
	if(value < 10){
		return '0' + value;
	}
	return value;
}

PrintHealthFileAndExamClass.prototype.printMedicalExam = function(id){
	var cond = {printType : '1',printWhere : id};
	var healthFileHtml = '<style type="text/css">.printMedicalExam {	font-size: 14px;}.printMedicalExam table {	width: 20.3cm;}.table_page tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.table_page tbody td span{	font-size: 12px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.unitSpace{	padding-left: 5px;	padding-right: 30px;}</style><div class="printMedicalExam">		<table class="table_page" cellpadding="0" cellspacing="0"			style="border-collapse: collapse; margin-top: 20px;">			<thead>				<tr>					<td style="text-align: center; height: 50px; vertical-align: top;"						colspan="7"><span						style="font-size: 20px; font-weight: bolder;">健康体检表</span></td>				</tr>				<tr>					<td style="text-align: right;height: 30px;"><span						style="font-size: 16px; font-weight: bolder;">姓名：</span></td>					<td colspan="4"><span class="Name"></span></td>					<td><span style="font-size: 16px; font-weight: bolder;">编号：</span></td>					<td><span class="FileNo"></span></td>				</tr>			</thead>			<tbody>				<tr>					<td style="width: 60px;">体检日期</td>					<td colspan="3"><span class="ExamDate"></span></td>					<td style="width: 100px;">责任医生</td>					<td colspan="2"><span class="Doctor">12</span></td>				</tr>				<tr>					<td style="font-weight: bold; text-align: center;">内 容</td>					<td colspan="6" style="font-weight: bold; text-align: center;">检						查 项 目</td>				</tr>				<tr>					<td style="text-align: center; height: 45px;">症状</td>					<td colspan="6"><span class="ExamSymptom"></span></td>				</tr>				<tr>					<td rowspan="9" style="text-align: center;">一<br />般<br />状<br />况					</td>					<td style="width: 110px;">体温</td>					<td colspan="2"><span class="General01 unitSpace"></span>℃</td>					<td>脉率</td>					<td colspan="2"><span class="General02 unitSpace"></span>次/分钟</td>				</tr>				<tr>					<td rowspan="2">呼吸频率</td>					<td rowspan="2" colspan="2"><span class="General03 unitSpace"></span>次/分钟</td>					<td rowspan="2">血压</td>					<td style="width: 80px;">左侧</td>					<td><span class="General04" style="padding-left: 5px;padding-right: 5px;"></span>/<span class="General05"  style="padding-left: 5px;padding-right: 5px;"></span>mmHg</td>				</tr>				<tr>					<td>右侧</td>					<td><span class="General06"  style="padding-left: 5px;padding-right: 5px;"></span>/<span class="General07"  style="padding-left: 5px;padding-right: 5px;"></span>mmHg</td>				</tr>				<tr>					<td>身高</td>					<td colspan="2"><span class="General08 unitSpace"></span>cm</td>					<td>体重</td>					<td colspan="2"><span class="General09 unitSpace"></span>kg</td>				</tr>				<tr>					<td>腰围</td>					<td colspan="2"><span class="General10 unitSpace"></span>cm</td>					<td>体质指数（BMI）</td>					<td colspan="2"><span class="General11 unitSpace"></span>Kg/m2</td>				</tr>				<tr>					<td colspan="2">老年人健康状态自我评估*					</td>					<td colspan="4"><span class="OldManHealthEstimate"></span></td>				</tr>				<tr>					<td colspan="2">老年人生活自理能力自我评估*					</td>					<td colspan="4"><span class="OldManLifeEstimate"></span></td>				</tr>				<tr>					<td colspan="2">老年人认知功能*</td>					<td><span class="General14"></span></td>					<td style="height: 45px;">简易智力<br />状态检查					</td>					<td colspan="2">总分<span class="General15"></span></td>				</tr>				<tr>					<td colspan="2">老年人情感状态*</td>					<td><span class="General16"></span></td>					<td style="height: 45px;">老年人抑郁<br />评分检查					</td>					<td colspan="2">总分<span class="General17"></span></td>				</tr>				<tr>					<td rowspan="19"						style="text-align: center; border-bottom: 1px solid #000;">生<br />活<br />方<br />式					</td>					<td rowspan="3">体育锻炼</td>					<td style="width: 100px;">锻炼频率</td>					<td colspan="4"><span class="Life01"></span></td>				</tr>				<tr>					<td>每次锻炼时间</td>					<td><span class="Life02 unitSpace"></span>分钟</td>					<td>坚持锻炼时间</td>					<td colspan="2"><span class="Life03 unitSpace"></span>年</td>				</tr>				<tr>					<td>锻炼方式</td>					<td colspan="4"><span class="Life04"></span></td>				</tr>				<tr>					<td>饮食习惯</td>					<td colspan="5"><span class="EatHabit"></span></td>				</tr>				<tr>					<td rowspan="3">吸烟情况</td>					<td>吸烟状况</td>					<td colspan="4"><span class="Life06"></span></td>				</tr>				<tr>					<td>日吸烟量</td>					<td colspan="4">平均<span class="Life07 unitSpace"></span>支					</td>				</tr>				<tr>					<td>开始吸烟年龄</td>					<td><span class="Life08 unitSpace"></span>岁</td>					<td>戒烟年龄</td>					<td colspan="2"><span class="Life09 unitSpace"></span>岁</td>				</tr>				<tr>					<td rowspan="5">饮酒情况</td>					<td>饮酒频率</td>					<td colspan="4"><span class="Life10"></span></td>				</tr>				<tr>					<td>日饮酒量</td>					<td colspan="4">平均<span class="Life11 unitSpace"></span>两					</td>				</tr>				<tr>					<td>是否戒酒</td>					<td colspan="2"><span class="Life12"></span>					</td>					<td>戒酒年龄</td>					<td><span class="Life13 unitSpace"></span>岁</td>				</tr>				<tr>					<td>开始饮酒年龄</td>					<td><span class="Life14 unitSpace"></span>岁</td>					<td style="height: 45px;">近一年内是否<br />曾醉酒					</td>					<td colspan="2"><span class="Life15"></span></td>				</tr>				<tr>					<td>饮酒种类</td>					<td colspan="4"><span class="DrinkHabit"></span></td>				</tr>				<tr>					<td rowspan="6"						style="border-bottom: 1px solid #000; height: 45px;">职业病危害<br />因素接触史					</td>					<td colspan="5"><span class="Life17"></span><span						style="display: none;">工种<span class="Life18"></span>从业时间<span							class="Life19"></span></span></td>				</tr>				<tr>					<td rowspan="5" style="border-bottom: 1px solid #000;">毒物种类</td>					<td style="width: 120px;">粉尘</td>					<td><span class="Life20"></span></td>					<td>防护措施</td>					<td><span class="Life21"></span></td>				</tr>				<tr>					<td>放射物质</td>					<td><span class="Life22"></span></td>					<td>防护措施</td>					<td><span class="Life23"></span></td>				</tr>				<tr>					<td>物理因素</td>					<td><span class="Life24"></span></td>					<td>防护措施</td>					<td><span class="Life25"></span></td>				</tr>				<tr>					<td>化学物质</td>					<td><span class="Life26"></span></td>					<td>防护措施</td>					<td><span class="Life27"></span></td>				</tr>				<tr>					<td style="border-bottom: 1px solid #000;">其他</td>					<td style="border-bottom: 1px solid #000;"><span						class="Life28"></span></td>					<td style="border-bottom: 1px solid #000;">防护措施</td>					<td style="border-bottom: 1px solid #000;"><span						class="Life29"></span></td>				</tr>			</tbody>		</table>				<table class="table_page" cellpadding="0" cellspacing="0"			style="border-collapse: collapse; margin-top: 60px;">			<tbody>				<tr>					<td rowspan="7" style="width: 60px;text-align: center;">脏<br/>器<br/>功<br/>能</td>					<td rowspan="4" style="width: 100px;">口腔</td>					<td style="width: 100px;">口唇</td>					<td colspan="4"><span class="Viscera01"></span></td>				</tr>				<tr>					<td rowspan="2">齿列</td>					<td rowspan="2"><span class="Viscera02"></span></td>					<td rowspan="2" style="width: 80px;">齿列描述</td>					<td><span class="Viscera02Description"></span></td>					<td><span class="Viscera02Description1"></span></td>				</tr>				<tr>					<td><span class="Viscera02Description2"></span></td>					<td><span class="Viscera02Description3"></span></td>				</tr>				<tr>					<td>咽部</td>					<td colspan="4"><span class="Viscera03"></span></td>				</tr>				<tr>					<td>视力</td>					<td colspan="5">左眼<span class="Viscera04"></span>&nbsp;&nbsp;右眼<span class="Viscera05"></span>&nbsp;&nbsp;(矫正视力：左眼<span class="Viscera06"></span>&nbsp;&nbsp;右眼<span class="Viscera07"></span>)</td>				</tr>				<tr>					<td>听力</td>					<td colspan="5"><span class="Viscera08"></span></td>				</tr>				<tr>					<td>运动能力</td>					<td colspan="5"><span class="Viscera09"></span></td>				</tr>				<tr>					<td rowspan="24">查体</td>					<td>眼底*</td>					<td colspan="5"><span class="Exam29"></span></td>				</tr>				<tr>					<td>皮肤</td>					<td colspan="5"><span class="Body01"></span></td>				</tr>				<tr>					<td>巩膜</td>					<td colspan="5"><span class="Body02"></span></td>				</tr>				<tr>					<td>淋巴结</td>					<td colspan="5"><span class="Body03"></span></td>				</tr>				<tr>					<td rowspan="3">肺</td>					<td>桶状胸</td>					<td colspan="4"><span class="Body04"></span></td>				</tr>				<tr>					<td>呼吸音</td>					<td colspan="4"><span class="Body05"></span></td>				</tr>				<tr>					<td>罗音</td>					<td colspan="4"><span class="Body06"></span></td>				</tr>				<tr>					<td rowspan="2">心脏</td>					<td>心率</td>					<td><span class="Body07 unitSpace"></span>次/分钟</td>					<td>心律</td>					<td colspan="2"><span class="Body08"></span></td>				</tr>				<tr>					<td>杂音</td>					<td colspan="4"><span class="Body09"></span></td>				</tr>				<tr>					<td rowspan="5">腹部</td>					<td>压痛</td>					<td colspan="4"><span class="Body10"></span></td>				</tr>				<tr>					<td>包块</td>					<td colspan="4"><span class="Body12"></span></td>				</tr>				<tr>					<td>肝大</td>					<td colspan="4"><span class="Body13"></span></td>				</tr>				<tr>					<td>脾大</td>					<td colspan="4"><span class="Body14"></span></td>				</tr>				<tr>					<td>移动性浊音</td>					<td colspan="4"><span class="Body15"></span></td>				</tr>				<tr>					<td>下肢水肿</td>					<td colspan="5"><span class="Body16"></span></td>				</tr>				<tr>					<td>足背动脉博动</td>					<td colspan="5"><span class="Body17"></span></td>				</tr>				<tr>					<td>肛门指诊*</td>					<td colspan="5"><span class="Body18"></span></td>				</tr>				<tr>					<td>乳腺*</td>					<td colspan="5"><span class="Galactophore"></span></td>				</tr>				<tr>					<td rowspan="5">妇科</td>					<td>外阴*</td>					<td colspan="4"><span class="Body20"></span></td>				</tr>				<tr>					<td>阴道*</td>					<td colspan="4"><span class="Body21"></span></td>				</tr>				<tr>					<td>宫颈*</td>					<td colspan="4"><span class="Body22"></span></td>				</tr>				<tr>					<td>宫体*</td>					<td colspan="4"><span class="Body23"></span></td>				</tr>				<tr>					<td>附件*</td>					<td colspan="4"><span class="Body24"></span></td>				</tr>				<tr>					<td>其它*</td>					<td colspan="5" ><span class="Body25"></span></td>				</tr>				<tr>					<td rowspan="4" style="border-bottom: 1px solid #000;">辅助<br/>检查</td>					<td rowspan="2" style="border-bottom: 1px solid #000;">血常规*</td>					<td colspan="5">血红蛋白：<span class="Exam03 unitSpace"></span>g/L白细胞：<span class="Exam04 unitSpace"></span>×10<sup>9</sup>/L血小板：<span class="Exam05 unitSpace"></span>×10<sup>9</sup>/L</td>				</tr>				<tr>					<td>其它</td>					<td colspan="4"><span class="Exam06"></span></td>				</tr>				<tr>					<td rowspan="2" style="border-bottom: 1px solid #000;">尿常规*</td>					<td colspan="5">尿蛋白：<span class="Exam07 unitSpace"></span>尿糖：<span class="Exam08 unitSpace"></span>尿酮体：<span class="Exam09 unitSpace"></span></td>				</tr>				<tr>					<td colspan="5" style="border-bottom: 1px solid #000;">尿潜血：<span class="Exam10 unitSpace"></span>其它：<span class="Exam11"></span></td>				</tr>			</tbody>		</table>				<table class="table_page" cellpadding="0" cellspacing="0"			style="border-collapse: collapse; margin-top: 60px;">			<tbody>				<tr>					<td rowspan="26" style="width: 60px; text-align: center;">辅<br/>助<br/>检<br/>查</td>					<td style="width: 140px;">空腹血糖*</td>					<td colspan="2"><span class="Exam01 unitSpace"></span>mmol/L 或 (餐后)<span class="Exam02 unitSpace"></span>mmol/L</td>				</tr>				<tr>					<td>心电图*</td>					<td colspan="2"><span class="Exam30"></span></td>				</tr>				<tr>					<td>尿微量白蛋白*</td>					<td colspan="2"><span class="Exam12"></span></td>				</tr>				<tr>					<td>大便潜血*</td>					<td colspan="2"><span class="Exam13"></span></td>				</tr>				<tr>					<td>糖化血红蛋白*</td>					<td colspan="2"><span class="Exam27"></span></td>				</tr>				<tr>					<td>乙型肝炎表面抗原*</td>					<td colspan="2"><span class="Exam28"></span></td>				</tr>				<tr>					<td rowspan="2">肝功能*</td>					<td colspan="2">血清谷丙转氨酶：<span class="Exam14 unitSpace"></span>U/L血清谷草转氨酶：<span class="Exam15 unitSpace"></span>U/L白蛋白：<span class="Exam16 unitSpace"></span>U/L					</td>				</tr>				<tr>					<td colspan="2">总胆红素：<span class="Exam17 unitSpace"></span>µmol结合胆红素：<span class="Exam18 unitSpace"></span>µmol					</td>				</tr>				<tr>					<td rowspan="2">肾功能*</td>					<td colspan="2">血清肌酐：<span class="Exam19 unitSpace"></span>µmol血尿素氮:<span class="Exam20 unitSpace"></span>mmol					</td>				</tr>				<tr>					<td colspan="2">血钾浓度：<span class="Exam21 unitSpace"></span>mmol血纳浓度：<span class="Exam22 unitSpace"></span>mmol					</td>				</tr>				<tr>					<td rowspan="3">血脂*</td>					<td colspan="2">总胆固醇：<span class="Exam23 unitSpace"></span>mmol/L甘油三酯：<span class="Exam24 unitSpace"></span>mmol/L					</td>				</tr>				<tr>					<td colspan="2">血清低密度脂蛋白胆固醇:<span class="Exam25 unitSpace"></span>mmol/L					</td>				</tr>				<tr>					<td colspan="2">血清高密度脂蛋白胆固醇:<span class="Exam26 unitSpace"></span>mmol/L					</td>				</tr>				<tr>					<td>胸片X线片*</td>					<td colspan="2"><span class="Exam31"></span></td>				</tr>				<tr>					<td>B超*</td>					<td colspan="2"><span class="Exam32"></span></td>				</tr>				<tr>					<td>宫颈涂片*</td>					<td colspan="2"><span class="Exam33"></span></td>				</tr>				<tr>					<td>其他*</td>					<td colspan="2"><span class="Exam34"></span></td>				</tr>				<tr>					<td rowspan="9">中医体质辨识*</td>					<td style="width: 60px;">平和质</td>					<td><span class="CHN01">&nbsp;</span></td>				</tr>				<tr>					<td>气虚质</td>					<td><span class="CHN02"></span></td>				</tr>				<tr>					<td>阳虚质</td>					<td><span class="CHN03"></span></td>				</tr><tr>					<td>阴虚质</td>					<td><span class="CHN04"></span></td>				</tr><tr>					<td>痰湿质</td>					<td><span class="CHN05"></span></td>				</tr><tr>					<td>湿热质</td>					<td><span class="CHN06"></span></td>				</tr><tr>					<td>血瘀质</td>					<td><span class="CHN07"></span></td>				</tr><tr>					<td>气郁质</td>					<td><span class="CHN08"></span></td>				</tr><tr>					<td>特秉质</td>					<td><span class="CHN09"></span></td>				</tr>				<tr>					<td rowspan="7" style="border-bottom: 1px solid #000;">现在<br/>主要<br/>健康<br/>问题</td>					<td style="height: 45px;">脑血管疾病</td>					<td colspan="2"><span class="HarnsSick"></span></td>				</tr>				<tr>					<td style="height: 45px;">肾脏疾病</td>					<td colspan="2"><span class="KidneySick"></span></td>				</tr>				<tr>					<td style="height: 45px;">心脏疾病</td>					<td colspan="2"><span class="HeartSick"></span></td>				</tr>				<tr>					<td style="height: 45px;">血管疾病</td>					<td colspan="2"><span class="VasSick"></span></td>				</tr>				<tr>					<td style="height: 45px;">眼部疾病</td>					<td colspan="2"><span class="EyeSick"></span></td>				</tr>				<tr>					<td>神经系统疾病</td>					<td colspan="2"><span class="Problem06"></span></td>				</tr>				<tr>					<td style="border-bottom: 1px solid #000;">其它系统疾病</td>					<td style="border-bottom: 1px solid #000;" colspan="2"><span class="Problem07"></span></td>				</tr>			</tbody>		</table>				<table class="table_page" cellpadding="0" cellspacing="0"			style="border-collapse: collapse; margin-top: 60px;">			<tbody>				<tr>					<td>住院治疗情况</td>					<td style="height: 100%;">						<table class="Hospitalization childTable" cellpadding="0" cellspacing="0" style="border-collapse: none;width: 100%;">							<thead>								<tr>									<td>住院类型</td>									<td>入院/建床日期</td>									<td>出院/撤床日期</td>									<td>原因</td>									<td>医疗机构名称</td>									<td>病案号</td>								</tr>							</thead>						</table>					</td>				</tr>				<tr>					<td>主要用药情况</td>					<td style="height: 100%;">						<table class="ExamMedication childTable" cellpadding="0" cellspacing="0" style="border-collapse: none;width: 100%;">							<thead>								<tr>									<td>药名</td>									<td>用法</td>									<td>用量</td>									<td>用药时间</td>									<td>服药依从性</td>								</tr>							</thead>						</table>					</td>				</tr>				<tr>					<td>非免疫规划<br/>预防接种史</td>					<td style="height: 100%;">						<table class="VaccinateHistory childTable" cellpadding="0" cellspacing="0" style="border-collapse: none;width: 100%;">							<thead>								<tr>									<td>名称</td>									<td>接种日期</td>									<td>接种机构</td>								</tr>							</thead>						</table>					</td>				</tr>				<tr>					<td rowspan="5">健康评价</td>					<td><span class="Judge01"></span></td>				</tr>				<tr>					<td>异常1:<span class="Judge02"></span></td>				</tr>				<tr>					<td>异常2:<span class="Judge03"></span></td>				</tr>				<tr>					<td>异常3:<span class="Judge04"></span></td>				</tr>				<tr>					<td>异常4:<span class="Judge05"></span></td>				</tr>				<tr>					<td>健康指导</td>					<td><span class="HealthDirect"></span></td>				</tr>				<tr>					<td style="border-bottom: 1px solid #000;">危险因素控制</td>					<td style="border-bottom: 1px solid #000;"><span class="DangerControl"></span></td>				</tr>			</tbody>		</table>	</div>';
	printerService.printer(cond,function(data){
		console.log(data);
		$('#printHealthFile').html(healthFileHtml);
		if(data.length == 1){
			var obj = data[0];
			var listJson = {
				Hospitalization : 'Hospitalization',
				ExamMedication : 'ExamMedication',
				VaccinateHistory : 'VaccinateHistory'
			}
		
			for(var p in obj){
				if (listJson.hasOwnProperty(p)){
					var listArray = Ext.util.JSON.decode(obj[p]);
					if(listArray != null){
						var tbody = "<tbody>";
						for(var i=0;i< listArray.length;i++){
							tbody = tbody + '<tr>';
							var td = '';
							for(var prop in listArray[i]){
								td = td + '<td>' + PrintHealthFileAndExamClass.judgeDate(1,listArray[i][prop]) + '</td>';
							}
							tbody = tbody + td + '</tr>';
						}
						tbody = tbody + '</tbody>';
						$('.' + p).append(tbody);
					}					
				}else{
					$('.' + p).html(PrintHealthFileAndExamClass.judgeDate(0,obj[p]));
				}
			}
			printObj.printHTML($('#printHealthFile').html(),'健康体检记录','12.99cm','30.8cm');
		}else{
			//提示信息 
		}
	});
}
PrintHealthFileAndExamClass.prototype.printHealthFile = function(fileNo){
	var cond = {printType : '0',printWhere : fileNo};
	var healthFileHtml = '<style type="text/css">.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height:60px;	vertical-align: bottom;}.rightTableTd{	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}</style><div class="printHealthFile">		<table class="table_printHealthFile" cellpadding="0" cellspacing="0"			style="width: 20cm; height: 28cm; border-collapse: collapse;">			<tr>				<td					style="text-align: right; font-weight: bolder; border-left: 1px solid #000000; border-right: 1px solid #000000; border-top: 1px solid #000000; font-size: 16px; padding-right: 10px; padding-top: 10px; height: 80px;">编号：					<span class="FileNo"></span></td>			</tr>			<tr>				<td					style="text-align: center; height:100px;font-size: 20px; border-left: 1px solid #000000; border-right: 1px solid #000000; font-weight: bolder; background-color: #FFFFFF">居民健康档案</td>			</tr>			<tr>				<td style="width: 100%;padding-bottom: 40px; border-bottom: 1px solid #000000;border-left: 1px solid #000000;border-right: 1px solid #000000; vertical-align:top;">					<table cellpadding="0" cellspacing="0" class="healthfileBasicInfo"						style="border-collapse: none; width: 70%;margin-left: 60px;">						<tr>							<td style="width:200px;text-align: right;">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</td>							<td class="rightTableTd"><span class="Name">12</span></td>						</tr>						<tr>							<td style="text-align: right;" >现&nbsp;&nbsp;住&nbsp;&nbsp;址：</td>							<td class="rightTableTd" ><span class="Address"></span></td>						</tr>						<tr>							<td style="text-align: right;">户籍地址：</td>							<td class="rightTableTd"><span class="ResidenceAddress"></span></td>						</tr>						<tr>							<td style="text-align: right;">联系电话：</td>								<td class="rightTableTd"><span class="TEL"></span></td>						</tr>						<tr>							<td style="text-align: right;">乡镇（街道）名称：</td>								<td class="rightTableTd"><span class="Township"></span></td>						</tr>						<tr>							<td style="text-align: right;">村（居）委会名称：</td>								<td class="rightTableTd" ><span class="Village"></span></td>						</tr>						<tr>							<td style="height: 150px;">&nbsp;</td>						</tr>						<tr>							<td style="text-align: right;">建档单位：</td>								<td class="rightTableTd" ><span class="BuildUnit"></span></td>						</tr>						<tr>							<td style="text-align: right;">建&nbsp;&nbsp;档&nbsp;&nbsp;人：</td>								<td class="rightTableTd" ><span class="BuildPerson"></span></td>						</tr>						<tr>							<td style="text-align: right;">责任医生：</td>								<td class="rightTableTd" ><span class="Doctor"></span></td>						</tr>						<tr>							<td style="text-align: right;"								>建档日期：</td>							<td class="rightTableTd" ><span class="BuildDate"></span></td>						</tr>					</table>				</td>			</tr>		</table>		<table class="table_personalInfor" cellpadding="0" cellspacing="0"			style="width: 20cm; border-collapse: collapse; margin-top: 60px;">			<thead>				<tr>					<td style="text-align: center; height: 30px;" colspan="7"><span						style="font-size: 20px; font-weight: bolder;">个人基本信息表</span></td>				</tr>				<tr>					<td colspan="2"><span						style="font-size: 16px; font-weight: bolder; text-align: right;">姓名：</span></td>					<td colspan="3"><span class="Name" ></span></td>					<td><span style="font-size: 16px; font-weight: bolder;">编号：</span></td>					<td><span class="FileNo" ></span></td>				</tr>			</thead>			<tbody>				<tr>					<td colspan="2">性别</td>					<td colspan="3"><div class="Sex"></div></td>					<td>出生日期</td>					<td><div class="Birthday"></div></td>				</tr>				<tr>					<td colspan="2">身份证号</td>					<td colspan="3"><div class="IDNumber"></div></td>					<td>工作单位</td>					<td><div class="WorkUnit"></div></td>				</tr>				<tr>					<td colspan="2">本人电话</td>					<td style="width: 150px;"><input class="TEL"						style="border: none; width: 150px;" readonly="readonly"						type="text" /></td>					<td style="width: 80px;">联系人姓名</td>					<td style="width: 150px;"><div class="Linkman"></div></td>					<td style="width: 80px;">联系人电话</td>					<td><div class="LinkmanTEL"></div></td>				</tr>				<tr>					<td colspan="2">常住类型</td>					<td><div class="ResideType"></div></td>					<td>民 族</td>					<td colspan="3"><div class="Folk"></div>						<div class="FolkOther"></div></td>				</tr>				<tr>					<td colspan="2">血型</td>					<td colspan="3"><div class="BloodTypeABO"></div></td>					<td>RH阴性</td>					<td><div class="BloodTypeRH"></div></td>				</tr>				<tr>					<td colspan="2">文化程度</td>					<td colspan="5"><div class="Education"></div></td>				</tr>				<tr>					<td colspan="2">职业</td>					<td colspan="5"><div class="Occupation"></div></td>				</tr>				<tr>					<td colspan="2">婚姻状况</td>					<td colspan="5"><div class="MaritalStatus"></div></td>				</tr>				<tr>					<td colspan="2" style="height: 40px;">医疗费用<br />支付方式					</td>					<td colspan="5"><div class="PaymentMode"></div>						<div class="PaymentModeOther"></div></td>				</tr>				<tr>					<td colspan="2">药物过敏史</td>					<td colspan="5"><div class="AllergiesHistory"></div>						<div class="AllergiesOther"></div></td>				</tr>				<tr>					<td colspan="2">暴露史</td>					<td colspan="5"><div class="ExposeHistory"></div></td>				</tr>				<tr>					<td rowspan="4" style="width: 20px;">既 <br />往<br /> 史					</td>					<td>疾病</td>					<td colspan="5" style="height: 100%;">						<table class="DiseaseHistory childTable" cellpadding="0"							cellspacing="0" style="border-collapse: none; width: 100%;">							<thead>								<tr>									<td>疾病名称</td>									<td>确诊时间</td>									<td>疾病说明</td>								</tr>							</thead>						</table>					</td>				</tr>				<tr>					<td>手 术</td>					<td colspan="5" style="height: 100%;">						<table class="OPSHistory childTable" cellpadding="0"							cellspacing="0" style="border-collapse: none; width: 100%;">							<thead>								<tr>									<td>名称</td>									<td>时间</td>								</tr>							</thead>						</table>					</td>				</tr>				<tr>					<td>外 伤</td>					<td colspan="5" style="height: 100%;">						<table class="TraumaHistory childTable" cellpadding="0"							cellspacing="0" style="border-collapse: none; width: 100%;">							<thead>								<tr>									<td>名称</td>									<td>时间</td>								</tr>							</thead>						</table>					</td>				</tr>				<tr>					<td>输 血</td>					<td colspan="5" style="height: 100%;">						<table class="BloodTrans childTable" cellpadding="0"							cellspacing="0" style="border-collapse: none; width: 100%;">							<thead>								<tr>									<td>名称</td>									<td>时间</td>								</tr>							</thead>						</table>					</td>				</tr>				<tr>					<td rowspan="2">家<br />族<br />史					</td>					<td style="height: 100%;">父亲</td>					<td colspan="2"><div class="FatherHistory"></div>						<div class="fHistoryOther"></div></td>					<td>母 亲</td>					<td colspan="2"><div class="MatherHistory"></div>						<div class="mHistoryOther"></div></td>				</tr>				<tr>					<td style="height: 100%;">兄弟姐妹</td>					<td colspan="2"><div class="BrotherHistor"></div>						<div class="bHistoryOther"></div></td>					<td>子 女</td>					<td colspan="2"><div class="FamilyHistory"></div>						<div class="fmHistoryOther"></div></td>				</tr>				<tr>					<td colspan="2">遗传病史</td>					<td colspan="5"><div class="GeneticHistory"></div>						<div class="GeneticHistoryOther"></div></td>				</tr>				<tr>					<td colspan="2">残疾情况</td>					<td colspan="5"><div class="DisabilityStatus"></div>						<div class="DisabilityStatusOther"></div></td>				</tr>				<tr>					<td rowspan="5" colspan="2" style="border-bottom: 1px solid #000;">生活环境</td>					<td>厨房排风设施</td>					<td colspan="4"><div class="Kitchen"></div></td>				</tr>				<tr>					<td>燃料类型</td>					<td colspan="4"><div class="Bunkers"></div></td>				</tr>				<tr>					<td>饮水</td>					<td colspan="4"><div class="DrinkingWater"></div></td>				</tr>				<tr>					<td>厕所</td>					<td colspan="4"><div class="Toilet"></div></td>				</tr>				<tr>					<td style="border-bottom: 1px solid #000;">禽畜栏</td>					<td colspan="4" style="border-bottom: 1px solid #000;"><div							class="Poultry"></div></td>				</tr>			</tbody>		</table>	</div>';
	printerService.printer(cond,function(data){
		console.log(data);
		$('#printHealthFile').html(healthFileHtml);
		if(data.length == 1){
			var obj = data[0];
			var listJson = {
				BloodTrans : 2,
				DiseaseHistory : 3,
				OPSHistory : 2,
				TraumaHistory : 2
			}
			for(var p in obj){
				if (listJson.hasOwnProperty(p)){
					var column = listJson[p];
					var listArray = Ext.util.JSON.decode(obj[p]);
					if(listArray != null){
						var tbody = "<tbody>";
						for(var i=0;i< listArray.length;i++){
							tbody = tbody + '<tr>';
							var td = '';
							for(var prop in listArray[i]){
								td = td + '<td>' + PrintHealthFileAndExamClass.judgeDate(1,listArray[i][prop]) + '</td>';
							}
							tbody = tbody + td + '</tr>';
						}
						tbody = tbody + '</tbody>';
						$('.' + p).append(tbody);
					}
				}else{
					$('.' + p).html(PrintHealthFileAndExamClass.judgeDate(0,obj[p]));
				}
			}
			console.log(1230);
//			printObj.printHTML($('#printHealthFile').html(),'居民健康档案','12.99cm','30.8cm');
		}else{
			//提示信息 
		}
	});
}
function getBasicInfomation(dsArray,fileNo) {
	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			var convertObj = {
				fatherHistory : 'familyMedicalHistory',
				matherHistory : '',
				brotherHistory : '', 	
				familyHistory : '', 	
			}
			var healthFileHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<center>		<h3>居民健康档案封面</h3>	</center>	<br />	<table class="table_printHealthFile" cellpadding="0" cellspacing="0"		style="width: 19cm; height: 26.15cm; border-collapse: collapse;">		<tr>			<td				style="text-align: right; font-weight: bolder; border-left: 1px solid #000000; border-right: 1px solid #000000; border-top: 1px solid #000000; font-size: 16px; padding-right: 10px; padding-top: 10px; height: 80px;">编号：				<span class="fileNo"></span>			</td>		</tr>		<tr>			<td				style="text-align: center; height: 100px; font-size: 20px; border-left: 1px solid #000000; border-right: 1px solid #000000; font-weight: bolder; background-color: #FFFFFF">居民健康档案</td>		</tr>		<tr>			<td				style="width: 100%; padding-bottom: 40px; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; vertical-align: top;">				<table cellpadding="0" cellspacing="0" class="healthfileBasicInfo"					style="border-collapse: none; width: 70%; margin-left: 60px;">					<tr>						<td style="width: 200px; text-align: right;">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</td>						<td class="rightTableTd"><span class="name">&nbsp;</span></td>					</tr>					<tr>						<td style="text-align: right;">现&nbsp;&nbsp;住&nbsp;&nbsp;址：</td>						<td class="rightTableTd"><span class="address">&nbsp;</span></td>					</tr>					<tr>						<td style="text-align: right;">户籍地址：</td>						<td class="rightTableTd"><span class="residenceAddress">&nbsp;</span></td>					</tr>					<tr>						<td style="text-align: right;">联系电话：</td>						<td class="rightTableTd"><span class="tel0">&nbsp;</span></td>					</tr>					<tr>						<td style="text-align: right;">乡镇（街道）名称：</td>						<td class="rightTableTd"><span class="township">&nbsp;</span></td>					</tr>					<tr>						<td style="text-align: right;">村（居）委会名称：</td>						<td class="rightTableTd"><span class="village">&nbsp;</span></td>					</tr>					<tr>						<td style="height: 100px;">&nbsp;</td>					</tr>					<tr>						<td style="text-align: right;">建档单位：</td>						<td class="rightTableTd"><span class="buildUnit">&nbsp;</span></td>					</tr>					<tr>						<td style="text-align: right;">建&nbsp;&nbsp;档&nbsp;&nbsp;人：</td>						<td class="rightTableTd"><span class="buildPerson">&nbsp;</span></td>					</tr>					<tr>						<td style="text-align: right;">责任医生：</td>						<td class="rightTableTd"><span class="doctor">&nbsp;</span></td>					</tr>					<tr>						<td style="text-align: right;">建档日期：</td>						<td class="rightTableTd"><span class="buildDate">&nbsp;</span></td>					</tr>				</table>			</td>		</tr>	</table> <br/><br/>	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width:19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="7"><span					style="font-size: 20px; font-weight: bolder;">个人基本信息表</span></td>			</tr>			<tr>				<td colspan="2" style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span></td>				<td><span class="name"></span></td>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">编号：</span></td>				<td colspan="3"><span class="fileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td colspan="2" style="width: 150px;">性别</td>				<td colspan="3"><span class="sex"></span></td>				<td>出生日期</td>				<td style="text-align: right;"><span class="birthday"></span></td>			</tr>			<tr>				<td colspan="2">身份证号</td>				<td colspan="3"><span class="idnumber"></span></td>				<td>工作单位</td>				<td><span class="workUnit"></span></td>			</tr>			<tr>				<td colspan="2">本人电话</td>				<td style="width: 150px;"><span class="tel"></span></td>				<td style="width: 80px;">联系人姓名</td>				<td style="width: 150px;"><span class="linkman"></span></td>				<td style="width: 80px;">联系人电话</td>				<td><span class="linkmanTel"></span></td>			</tr>			<tr>				<td colspan="2">常住类型</td>				<td><span class="resideType"></span></td>				<td>民 族</td>				<td colspan="3"><span class="folk"></span><span					class="folkOther"></span></td>			</tr>			<tr>				<td colspan="2">血型</td>				<td colspan="5"><span class="bloodTypeAbo"></span>&nbsp;/&nbsp;RH阴性:<span					class="bloodTypeRh"></span></td>			</tr>			<tr>				<td colspan="2">文化程度</td>				<td colspan="5"><span class="education"></span></td>			</tr>			<tr>				<td colspan="2">职业</td>				<td colspan="5"><span class="occupation"></span></td>			</tr>			<tr>				<td colspan="2">婚姻状况</td>				<td colspan="5"><span class="maritalStatus"></span></td>			</tr>			<tr>				<td colspan="2" style="height: 40px;">医疗费用<br />支付方式				</td>				<td colspan="5"><span class="paymentMode"></span> <span					class="paymentModeOther"></span></td>			</tr>			<tr>				<td colspan="2">药物过敏史</td>				<td colspan="5"><span class="allergiesHistory"></span> <span					class="allergiesOther"></span></td>			</tr>			<tr>				<td colspan="2" >暴露史</td>				<td colspan="5"><span class="exposeHistory"></span></td>			</tr>			<tr>				<td rowspan="4" style="text-align: center;">既 <br />往<br /> 史				</td>				<td>疾病</td>				<td colspan="5" style="height: 100%;"><span					class="diseaseHistory"></span><br /> <br /> <span					class="diseaseHistoryValue"></span></td>			</tr>			<tr>				<td style="text-align: center;">手 术</td>				<td colspan="5" style="height: 100%;"><span class="opshistory"></span>				</td>			</tr>			<tr>				<td style="text-align: center;">外 伤</td>				<td colspan="5" style="height: 100%;"><span					class="traumaHistory"></span></td>			</tr>			<tr>				<td style="text-align: center;">输 血</td>				<td colspan="5" style="height: 100%;"><span class="bloodTrans"></span>				</td>			</tr>			<tr>				<td rowspan="3" style="text-align: center;">家<br />族<br />史				</td>				<td style="height: 100%;">父亲</td>				<td colspan="2"><span class="fatherHistory"></span> <span					class="fhistoryOther"></span></td>				<td>母 亲</td>				<td colspan="2"><span class="matherHistory"></span> <span					class="mhistoryOther"></span></td>			</tr>			<tr>				<td style="height: 100%;">兄弟姐妹</td>				<td colspan="2"><span class="brotherHistory"></span> <span					class="bhistoryOther"></span></td>				<td>子 女</td>				<td colspan="2"><span class="familyHistory"></span> <span					class="fmHistoryOther"></span></td>			</tr>			<tr>				<td colspan="6"><div class="familyMedicalHistory"></div></td>			</tr>			<tr>				<td colspan="2">遗传病史</td>				<td colspan="5"><span class="geneticHistory"></span>					&nbsp;&nbsp;&nbsp;&nbsp;疾病名称<span class="geneticHistoryOther"></span></td>			</tr>			<tr>				<td colspan="2">残疾情况</td>				<td colspan="5"><span class="disabilityStatus"></span> <span					class="disabilityStatusOther"></span></td>			</tr>			<tr>				<td rowspan="5" colspan="2" style="border-bottom: 1px solid #000;">生活环境</td>				<td>厨房排风设施</td>				<td colspan="4"><span class="kitchen"></span></td>			</tr>			<tr>				<td>燃料类型</td>				<td colspan="4"><span class="bunkers"></span></td>			</tr>			<tr>				<td>饮水</td>				<td colspan="4"><span class="drinkingWater"></span></td>			</tr>			<tr>				<td>厕所</td>				<td colspan="4"><span class="toilet"></span></td>			</tr>			<tr>				<td style="border-bottom: 1px solid #000;">禽畜栏</td>				<td colspan="4" style="border-bottom: 1px solid #000;"><span					class="poultry"></span></td>			</tr>		</tbody>	</table></div>';
			$('#printHealthFile').html(healthFileHtml);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(){
								basicValue = basicValue + $(this)[0].number + "&nbsp;" + $(this)[0].name + "&nbsp;&nbsp;&nbsp;&nbsp;";
							});
							if(basicValue != ""){
								basicValue = basicValue.substring(0,basicValue.length - 24);
							}
							if(convertObj.hasOwnProperty(id)){
								if(convertObj[id] != ''){
									$('.' + convertObj[id]).html(basicValue);
								}
							}else{
								$('.' + id).html(basicValue);
							}
							
						}
					});
				}else if(_v.xtype == 'grid'){
					if(_v.setting.colSettings[0].ds != undefined){
						var ds = _v.setting.colSettings[0].ds;
						$.each(data, function(key, values) {
							if(ds == key){
								var id = _v.id;
								var basicValue = "";
								if(id == 'diseaseHistory'){
									$.each(values,function(){
										if($(this)[0].number == 6){
											basicValue = basicValue + $(this)[0].number + "&nbsp;" + $(this)[0].name + "&nbsp;&nbsp;&nbsp;&nbsp;<span class='diseaseHistory06'></span>";
										}else if($(this)[0].number == 12){
											basicValue = basicValue + $(this)[0].number + "&nbsp;" + $(this)[0].name + "&nbsp;&nbsp;&nbsp;&nbsp;<span class='diseaseHistory12'></span>";
										}else if($(this)[0].number == 13){
											basicValue = basicValue + $(this)[0].number + "&nbsp;" + $(this)[0].name + "&nbsp;&nbsp;&nbsp;&nbsp;<span class='diseaseHistory13'></span>&nbsp;&nbsp;&nbsp;&nbsp;";
										}else{
											basicValue = basicValue + $(this)[0].number + "&nbsp;" + $(this)[0].name + "&nbsp;&nbsp;&nbsp;&nbsp;";
										}
										
									});
								}else{
									$.each(values,function(){
										basicValue = basicValue + $(this)[0].number + "&nbsp;" + $(this)[0].name + "&nbsp;&nbsp;&nbsp;&nbsp;";
									});
								}
								if(basicValue != ""){
									basicValue = basicValue.substring(0,basicValue.length - 24);
								}
								if(convertObj.hasOwnProperty(id)){
									if(convertObj[id] != ''){
										$('.' + convertObj[id]).html(basicValue);
									}
								}else{
									$('.' + id).html(basicValue);
								}
								
							}
						});
					}						
				}
			});
			
//			var fileNo = $('.personId').html();
			var cond = {fileNo : fileNo};
			PersonalInfoService.get(cond,function(d){
				if(d != null){
					console.dir(d);
					$.each(d,function(k,v){
						$(window.cfg).each(function(_i, _v) {
							var id = _v.id;
							if (_v.xtype == 'list') {
								if(id == k){
									var ds = _v.setting.ds;
									var listValues = [];
									if(_v.setting.multi != undefined && _v.setting.multi){
										$(v).each(function() {
											$.each($(this)[0],function(_vi,_vv){
												$.each(data, function(key, values) {
													if(ds == key){
														$.each(values,function(){
															if(_vv == $(this)[0].id){
																listValues.push($(this)[0].number);
															}
														});
													}
												});
											});
										});
									}else{
										$.each(data, function(key, values) {
											if(ds == key){
												$.each(values,function(){
													if(v == $(this)[0].name){
														listValues.push($(this)[0].number);
													}
												});
											}
										});
									}
									
//									var lvs = listValues.split('');
									var lvsHtml = '';
									if(listValues.length != 0){
										$(listValues).each(function(_bi,_bv){
											if(_bv == null) _bv = '';
											lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
										});
									}else{
										lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
									}
									
									if(lvsHtml != ''){
										lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
									}
									if(convertObj.hasOwnProperty(id)){
										$('.' + id).prepend(lvsHtml);
									}else{
										$('.' + id).parent('td').append(lvsHtml);
									}
								}
								
							}else if(_v.xtype == 'input'){
								if(k == id){
									if(_v.setting.format != undefined && _v.setting.format == 'date' && v != null){
										if(id == 'buildDate'){
											$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
										}else{
											var birthday = v.getFullYear() + '' + addZero(v.getMonth() + 1) + '' + addZero(v.getDate());
											console.log(birthday);
											var sepBirthday = birthday.split('');
//											console.log(sepBirthday);
											var birthdayHtml = '';
											$(sepBirthday).each(function(_bi,_bv){
												if(_bv == null) _bv = "";
												if(_bi == 3 || _bi == 5){
													birthdayHtml = birthdayHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/>&nbsp;&nbsp;&nbsp;'
												}else{
													birthdayHtml = birthdayHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/>&nbsp;'
												}
												
											});
											$('.' + id).html(birthdayHtml);
										}
									}else if(_v.setting.disabled != undefined && _v.setting.disabled){
										$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
									}else if(v != '' && v != null){
										if(id == 'fileNo'){
											var fileNos = v.split('');
											var fileNoHtml = '';
											$(fileNos).each(function(_bi,_bv){
												if(_bi == 5 || _bi == 8 || _bi == 11){
													fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/>&nbsp;&nbsp;&nbsp;'
												}else{
													fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/>&nbsp;'
												}
												
											});
											$('.' + id).html(fileNoHtml);
										}else{
											$('.' + id).html(v);
										}
										
									}
									
								}
							}else if(_v.xtype == 'grid'){
								if(id == k){
									if(id == 'diseaseHistory'){
										var number = 1;
										var dHistory = '';
										var diseaseHistoryValue06 = '';
										var diseaseHistoryValue12 = '';
										var diseaseHistoryValue13 = '';
										$(v).each(function(_di,_dv){
											console.log(_dv);
											dHistory = dHistory + '&nbsp;<input type="text" class="inputValues" readonly="readonly" value="' + _dv.diseaseId + '"/>'
											var confirmDate = parseDseaseDate(_dv.confirmDate);
											var confirmDateYear = '';
											var confirmDateMonth = '';
											if(confirmDate != null){
												confirmDateYear = confirmDate.year;
												confirmDateMonth = confirmDate.month;
											}
											dHistory = dHistory + '&nbsp;确诊时间<input type="text" class="noneBorder" readonly="readonly" value="' + confirmDateYear + '"/>年<input type="text" class="noneBorder" readonly="readonly" value="' + confirmDateMonth + '"/>月';	
											dHistory = dHistory + '&nbsp;&nbsp;/';
											if(number % 3 == 0){
												dHistory = dHistory.substring(0,dHistory.length - 1);
												dHistory = dHistory + '<br/>';
											}
											number = number + 1;
											
											if(_dv.remark != null && _dv.remark != ''){
												if(_dv.diseaseId == 6){
													diseaseHistoryValue06 = diseaseHistoryValue06 + _dv.remark + ',';
												}else if(_dv.diseaseId == 12){
													diseaseHistoryValue12 = diseaseHistoryValue12 + _dv.remark + ',';
												}else if(_dv.diseaseId == 13){
													diseaseHistoryValue13 = diseaseHistoryValue13 + _dv.remark + ',';
												}
											}
										});
										if(number <= 6){
											for(var i=number;i<=6;i++){
												if((i-1) % 3 == 0){
													dHistory = dHistory.substring(0,dHistory.length - 1);
													dHistory = dHistory + '<br/>';
												}
													
												dHistory = dHistory + '&nbsp;<input type="text" class="inputValues" readonly="readonly"/>&nbsp;确诊时间<input type="text" class="noneBorder" readonly="readonly"/>年<input type="text" class="noneBorder" readonly="readonly"/>月&nbsp;&nbsp;/';
											}
										}
										if(diseaseHistoryValue06 != ''){
											diseaseHistoryValue06 = diseaseHistoryValue06.substring(0,diseaseHistoryValue06.length - 1);
											$('.diseaseHistory06').html( '<input type="text" class="otherOption" readonly="readonly" value="' + diseaseHistoryValue06 + '"/>');
										}else{
											$('.diseaseHistory06').html( '<input type="text" class="otherOption" readonly="readonly"/>');
										}
										if(diseaseHistoryValue12 != ''){
											diseaseHistoryValue12 = diseaseHistoryValue12.substring(0,diseaseHistoryValue12.length - 1);
											$('.diseaseHistory12').html( '<input type="text" class="otherOption" readonly="readonly" value="' + diseaseHistoryValue12 + '"/>');
										}else{
											$('.diseaseHistory12').html( '<input type="text" class="otherOption" readonly="readonly"/>');
										}
										if(diseaseHistoryValue13 != ''){
											diseaseHistoryValue13 = diseaseHistoryValue13.substring(0,diseaseHistoryValue13.length - 1);
											$('.diseaseHistory13').html( '<input type="text" class="otherOption" readonly="readonly" value="' + diseaseHistoryValue13 + '"/>');
										}else{
											$('.diseaseHistory13').html( '<input type="text" class="otherOption" readonly="readonly"/>');
										}
										dHistory = dHistory.substring(0,dHistory.length - 1); 
										$('.diseaseHistoryValue').html(dHistory);
									}else{
										var historyName = {
											reason : 'reason',
											opsname : 'opsname',
											traumaName : 'traumaName'
										};
										var historyDate = {
											transDate : 'transDate',
											opsdate : 'opsdate',
											traumaDate : 'traumaDate'
										};
										if(v.length > 0 ){
											var number = 1;
											var otherHistory = '1 无   2 有：';
											var defaultValue = '';
											$(v).each(function(_gi01,_gv01){
												otherHistory = otherHistory + '名称' + number;
												$.each(_gv01,function(_gKey01,_gValue01){
													if(historyName.hasOwnProperty(_gKey01)){
														if(_gValue01 == null) _gValue01 = '';
														otherHistory = otherHistory + '<input type="text" class="otherOption" readonly="readonly" value="' + _gValue01 + '"/>';
														if(v.length == 1){
															defaultValue = _gValue01;
														}
													}
												});
												otherHistory = otherHistory + '时间';
												$.each(_gv01,function(_gKey01,_gValue01){
													if(historyDate.hasOwnProperty(_gKey01)){
														if(_gValue01 == null) _gValue01 = '';
														otherHistory = otherHistory + '<input type="text" class="otherOption" readonly="readonly" value="' + _gValue01 + '"/>';
													}
												});
												number = number + 1;
												otherHistory = otherHistory + '/';
											});
											if(number <= 2){
												otherHistory = otherHistory + '名称2<input type="text" class="otherOption" readonly="readonly"/>时间<input type="text" class="otherOption" readonly="readonly"/>/';
											}
											var showValue = 2;
											if(v.length == 1 && (defaultValue == '无' || defaultValue == '没有' || defaultValue == '没')){
												showValue = 1; 
											}
											otherHistory = otherHistory.substring(0,otherHistory.length - 1);
											otherHistory = otherHistory + '&nbsp;&nbsp;<input type="text" readonly="readonly" class="inputValues" value="' + showValue + '"/>';
											$('.' + id).html(otherHistory);
										}else{
											$('.' + id).html('1 无   2 有：名称1<input type="text" class="otherOption" readonly="readonly"/>时间<input type="text" class="otherOption" readonly="readonly"/>/名称2<input type="text" class="otherOption" readonly="readonly"/>时间<input type="text" class="otherOption" readonly="readonly"/>&nbsp;&nbsp;<input type="text" readonly="readonly" class="inputValues" value="1"/>');
										}
									}
								}
							}
						});
					});
//					console.log($('#printHealthFile').html());
					printObj.printHTML($('#printHealthFile').html(),'居民健康档案','12.99cm','30.8cm');
				}
				
			});
		}
	});
}
/**
 * 1岁以内、1~2岁儿童体检记录
 */
function getChildrenExamInfomation(dsArray,id,childrenExamHtml) {
	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(childrenExamHtml);
			console.log(window.cfg);
			console.log(data);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
//			var fileNo = $('.personId').html();
			var cond = {id : id};
//			console.log(cond);
			FileNumSearch.getHealthFileInfoByWorkId('1',id,function(d){
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
			});
			
			ChildrenMediExamService.get(cond,function(d){
				if(d != null){
					console.dir(d);
					$.each(d,function(k,v){
						$(window.cfg).each(function(_i, _v) {
							var id = _v.id;
							if (_v.xtype == 'list') {
								if(id == k){
									var ds = _v.setting.ds;
									var listValues = [];
									if(_v.setting.multi != undefined && _v.setting.multi){
										$(v).each(function() {
											$.each($(this)[0],function(_vi,_vv){
												$.each(data, function(key, values) {
													if(ds == key){
														$.each(values,function(){
															if(_vv == $(this)[0].id){
																listValues.push($(this)[0].number);
															}
														});
													}
												});
											});
										});
									}else{
										$.each(data, function(key, values) {
											if(ds == key){
												$.each(values,function(){
													if(v == $(this)[0].name || (v + 1) == $(this)[0].number){
														listValues.push($(this)[0].number);
													}
												});
											}
										});
									}
									
//									var lvs = listValues.split('');
									var lvsHtml = '';
									if(listValues.length != 0){
										$(listValues).each(function(_bi,_bv){
											if(_bv == null) _bv = '';
											lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
										});
									}else{
										lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
									}
									
									if(lvsHtml != ''){
										lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
									}
									$('.' + id).parent('td').append(lvsHtml);
								}
								
							}else if(_v.xtype == 'input'){
								if(k == id){
									if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
										if(id == 'visitDate'){
											$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
										}else{
											$('.' + id).html(v);
										}
									}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
										if(id == 'transReason'){
											$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else if(id == 'transUnit'){
											$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else{
											$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}
										
									}else if(v != '' && v != null){
										if(id == 'fileNo'){
											//...
										}else{
											$('.' + id).html(v);
										}
										
									}
									
								}
							}
						});
					});
//					console.log($('#printInformationContaint').html());
					printObj.printHTML($('#printInformationContaint').html(),'居民健康档案','12.99cm','30.8cm');
				}
				
			});
			
			
		}
	});
}


/**
 * 3~6岁儿童体检记录
 */
function getChildrenExamInfomation3_6(dsArray,id,childrenExamHtml) {

	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(childrenExamHtml);
//			console.log(window.cfg);
//			console.log(data);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
//			var fileNo = $('.personId').html();
			var cond = {id : id};
//			console.log(cond);
			FileNumSearch.getHealthFileInfoByWorkId('2',id,function(d){
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
//					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
			});
			
			ChildrenMediExam36Service.get(cond,function(d){
				if(d != null){
					console.dir(d);
					$.each(d,function(k,v){
						$(window.cfg).each(function(_i, _v) {
							var id = _v.id;
							if (_v.xtype == 'list') {
								if(id == k){
									var ds = _v.setting.ds;
									var listValues = [];
									if(_v.setting.multi != undefined && _v.setting.multi){
										$(v).each(function() {
											$.each($(this)[0],function(_vi,_vv){
												$.each(data, function(key, values) {
													if(ds == key){
														$.each(values,function(){
															if(_vv == $(this)[0].id){
																listValues.push($(this)[0].number);
															}
														});
													}
												});
											});
										});
									}else{
										$.each(data, function(key, values) {
											if(ds == key){
												$.each(values,function(){
													if(v == $(this)[0].name || (v + 1) == $(this)[0].number){
														listValues.push($(this)[0].number);
													}
												});
											}
										});
									}
									
//									var lvs = listValues.split('');
									var lvsHtml = '';
									if(listValues.length != 0){
										$(listValues).each(function(_bi,_bv){
											if(_bv == null) _bv = '';
											lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
										});
									}else{
										lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
									}
									
									if(lvsHtml != ''){
										lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
									}
									$('.' + id).parent('td').append(lvsHtml);
								}
								
							}else if(_v.xtype == 'input'){
								if(k == id){
									if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
										if(id == 'visitDate' || id == 'nextVisitDate'){
											$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
										}else{
											$('.' + id).html(v);
										}
									}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
										if(id == 'transReason'){
											$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else if(id == 'transUnit'){
											$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else{
											$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}
										
									}else if(v != '' && v != null){
										if(id == 'fileNo'){
											//...
										}else{
											$('.' + id).html(v);
										}
										
									}
									
								}
							}
						});
					});
//					console.log($('#printInformationContaint').html());
					printObj.printHTML($('#printInformationContaint').html(),'3~6岁儿童体检记录','12.99cm','30.8cm');
				}
				
			});
		}
	});

}
function getBabyExamInfomation(dsArray,id,childrenExamHtml) {

	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(childrenExamHtml);
//			console.log(window.cfg);
//			console.log(data);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
//			var fileNo = $('.personId').html();
			var cond = {id : id};
//			console.log(cond);
			FileNumSearch.getHealthFileInfoByWorkId('3',id,function(d){
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
//					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
					});
					$('.FileNo').html(fileNoHtml);
					if(d.birthday != null){
						$('.birthday').html(d.birthday.getFullYear() + '年' + addZero(d.birthday.getMonth() + 1) + '月' + addZero(d.birthday.getDate()) + '日');
					}
				}
			});
			
			BabyVisitService.get(cond,function(d){
				if(d != null){
					console.dir(d);
					$.each(d,function(k,v){
						$(window.cfg).each(function(_i, _v) {
							var id = _v.id;
							if (_v.xtype == 'list') {
								if(id == k){
									var ds = _v.setting.ds;
									var listValues = [];
									if(_v.setting.multi != undefined && _v.setting.multi){
										$(v).each(function() {
											$.each($(this)[0],function(_vi,_vv){
												$.each(data, function(key, values) {
													if(ds == key){
														$.each(values,function(){
															if(_vv == $(this)[0].id){
																listValues.push($(this)[0].number);
															}
														});
													}
												});
											});
										});
									}else{
										$.each(data, function(key, values) {
											if(ds == key){
												$.each(values,function(){
													if(v == $(this)[0].name || (v + 1) == $(this)[0].number){
														listValues.push($(this)[0].number);
													}
												});
											}
										});
									}
									
//									var lvs = listValues.split('');
									var lvsHtml = '';
									if(listValues.length != 0){
										$(listValues).each(function(_bi,_bv){
											if(_bv == null) _bv = '';
											lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
										});
									}else{
										lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
									}
									
									if(lvsHtml != ''){
										lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
									}
									$('.' + id).parent('td').append(lvsHtml);
								}
								
							}else if(_v.xtype == 'input'){
								if(k == id){
									if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
										if(id == 'visitDate' || id == 'nextVisitDate'){
											$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
										}else{
											$('.' + id).html(v);
										}
									}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
										if(id == 'transReason'){
											$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else if(id == 'transUnit'){
											$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else{
											$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}
										
									}else if(v != '' && v != null){
										if(id == 'fileNo'){
											//...
										}else{
											$('.' + id).html(v);
										}
										
									}
									
								}
							}
						});
					});
//					console.log($('#printInformationContaint').html());
					printObj.printHTML($('#printInformationContaint').html(),'新生儿访视','12.99cm','30.8cm');
				}
				
			});
		}
	});

}

/**
 * 新生儿
 */
PrintHealthFileAndExamClass.prototype.printBabyVisit = function(id){
	var dsArray = [];
	window.cfg = [		{			id : "name",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				showOnly : true,				readonly : true			}		},		{			id : "districtNumber",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "fileNo",			xtype : "combo",			setting : {				ds : {					search : FileNumSearch.listCodePage,					get : FileNumSearch.getItem				},				local : false,				width : 100,				model : {					id : 0,					code : 0,					display : 1				},				showDisplay : false,				roWhenSet : true,				writeback : [ {					id : "name",					col : 1				}, {					id : "sex",					col : 2				}, {					id : "birthday",					col : 3				}, {					id : "idcardNum",					col : 5				}, {					id : "barCode",					col : 6				},{					id : "foreignId",					col : 8				} ],				mCodePrefixCtrlId : 'districtNumber',				displayCols : [ 1, 2, 3, 7 ],				displayColNames : [ "编号", "", "", "" ]			},			required : [ true, "编号" ]		},		{ 			id : "dietDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		},		{ 			id : "earlyDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		},		{ 			id : "protectDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		},		{			id : "barCode",			xtype : "input",			setting : {				showOnly : true,				readonly : true,				size : 15			}		},		{			id : "sex",			xtype : "list",			setting : {				ds : "111",				newlineStep : 3,				display : "name",				save : "name",				multi : false			}		},		{			id : "birthday",			xtype : "input",			setting : {				disabled : false,				format : 'date',				size : 8						}		},		{			id : "idcardNum",			xtype : "input",			setting : {				maxlen : 18,				size : 18			}		},		{			id : "address",			xtype : "input",			setting : {				maxlen : 50,				size : 30			}		},		{			id : "fname",			xtype : "input",			setting : {				maxlen : 18,				size : 10			}		},		{			id : "foccupation",			xtype : "input",			setting : {				maxlen : 30,				size : 8			}		},		{			id : "fphone",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		},		{			id : "fbirthday",			xtype : "input",			setting : {				format : 'date',				maxlen : 8,				size : 8			}		},		{			id : "mname",			xtype : "input",			setting : {				maxlen : 18,				size : 10			}		},		{			id : "moccupation",			xtype : "input",			setting : {				maxlen : 30,				size : 8			}		},		{			id : "mphone",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		},		{			id : "mbirthday",			xtype : "input",			setting : {				format : 'date',				maxlen : 8,				size : 8			}		},		{			id : "gestationalWeeks",			xtype : "input",			setting : {				maxlen : 30,				size : 8			}		},		{  			id : "pregnantSick",			xtype : "list",			setting : {				ds : "58",				multi : true,				newlineStep : 2,				save : 'id',				mapping : {					value : 'kidneySickId'				}			},			requires : {				valEq : "3",				fields : [ "pregnantSickOther" ]			}	 		},		{ 			id : "pregnantSickOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 50,				caption : "其它疾病描述"			}		},		{ 			id : "hospitalName",			xtype : "input",			setting : {				maxlen : 50,				size : 50			}		},		{ 			id : "bornStatus",			xtype : "list",			requires : {				valEq : "7",				fields : [ "bornStatusOther" ]			},			setting : {				ds : "9",				multi : true,				maxlen : 50,				size : 50,				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				save : 'id',				mapping : {					value : 'bornStatusId'				},				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "bornStatusOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 50,				size : 50			}		},		{ 			id : "sleepy",			xtype : "list",			requires : {				valEq : "2",				fields : [ "sleepyState" ]			},			setting : {				ds : "151",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "sleepyState",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : '窒息描述',				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "monster",			xtype : "list",			requires : {				valEq : "2",				fields : [ "monsterOther" ]			},			setting : {				ds : "151",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "monsterOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : '畸形描述'			}		},		{ 			id : "exam01",			xtype : "list",			setting : {				ds : "108",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{  			id : "exam02",			xtype : "input",			setting : {				maxlen : 20,				size : 5,				format : 'num'			}		},		{ 			id : "exam03",			xtype : "input",			setting : {				maxlen : 20,				format : 'num',				size : 5			}		},		{ 			id : "exam04",			xtype : "list",			setting : {				ds : "98",				newlineStep : 2			}		},		{ 			id : "exam05",			xtype : "input",			setting : {				maxlen : 20,				size : 6,				format : 'num'			}		},		{ 			id : "exam06",			xtype : "input",			setting : {				maxlen : 20,				format : 'int',				size : 10			}		},		{ 			id : "exam07",			xtype : "input",			setting : {				maxlen : 20,				format : 'int',				size : 3			}		},		{ 			id : "faceColor",			xtype : "list",			setting : {				ds : "153",				multi : true,				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "面色" ],				mapping : {					value : 'faceColorId'				},				save : 'id',				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "faceColorOther" ]			}				},		{ 			id : "faceColorOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				width : 120,				caption : "其它面色描述"			}		},		{			id : "exam09",			xtype : "input",			setting : {				maxlen : 30,				format : 'num',				size : 4			}		},		{ 			id : "exam10",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 4			}		},		{ 			id : "exam11",			xtype : "list",			requires : {				valEq : "4",				fields : [ "frontSkullOther" ]			},			setting : {				ds : "154",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "frontSkullOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它描述"			}		},		{ 			id : "exam12",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam12other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam12other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{  			id : "exam19",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam19other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "exam19other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam13",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam13other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam13other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam20",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam20other" ]			},			setting : {				ds : "151",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{  			id : "exam20other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam14",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam14other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam14other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "babySkin",			xtype : "list",			requires : {				valEq : "4",				fields : [ "babySkinsOther" ]			},			setting : {				ds : "61",				multi : true,				newlineStep : 3,				save : 'id',				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "皮肤情况" ],				mapping : {					value : 'babySkinId'				},				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "babySkinsOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam15",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam15other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam15other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam22",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam22other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam22other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam16",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam16other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam16other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{			id : "exam23",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam16other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "exam23other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam17",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam17other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam17other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam24",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam24other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam24other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "exam18",			xtype : "list",			requires : {				valEq : "4",				fields : [ "exam18other" ]			},			setting : {				ds : "65",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam18other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它描述"			}		},		{ 			id : "exam25",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam26", "exam27" ]			},			setting : {				ds : "151",				maxlen : 10,				size : 10,				save : 'isInputValue',				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "exam26",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "原因"			}		},		{ 			id : "exam27",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 30,				caption : "机构及科室"			}		},		{ 			id : "babyDirect",			xtype : "list",			setting : {				ds : "155",				multi : true,				save : 'id',				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				mapping : {					value : 'babyDirectId'				}			}		},		{ 			id : "visitDate",			xtype : "input",			setting : {				format : 'date',				size : 10,				maxlen : 8,				blurFun : true,				fillField : [ 'textarea', 'fileNo span',						[ 'earlyDirect', 'dietDirect', 'protectDirect' ] ]			},			required : [ true, "本次随访日期" ]		}, {			id : "nextVisitDate",			xtype : "input",			setting : {				format : 'date',				size : 10,				maxlen : 8			}		}, { 			id : "nextVisitPlace",			xtype : "input",			setting : {				maxlen : 30,				size : 30			}		}, { 			id : "visitDoctor",			xtype : "input",			setting : {				maxlen : 30,				size : 30			}		}, { 			id : "babyIllnessScreen",			xtype : "list",			setting : {				ds : "1286",				multi : true,				maxlen : 50,				size : 50,				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				save : 'id',				mapping : {					value : 'babyIllnessScreenId'				},				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "exam28Other" ]			}		}, { 			id : "exam28Other",			xtype : "input",			setting : {				disabled : true,				size : 30,				maxlen : 30,				caption : ""			}		}, { 			id : "exam29",			xtype : "input",			setting : {				size : 5,				maxlen : 20,				format : "num"			}		}, { 			id : "exam30",			xtype : "input",			setting : {				size : 3,				maxlen : 20,				format : "num"			}		}, { 			id : "exam31",			xtype : "input",			setting : {				size : 5,				maxlen : 20,				format : "num"			}		}, { 			id : "exam32",			xtype : "list",			setting : {				ds : "151",				save : 'isInputValue',				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam33",			xtype : "list",			setting : {				ds : "1290",				newlineStep : 1			}		}, { 			id : "exam34",			xtype : "input",			setting : {				size : 5,				maxlen : 20,				format : "num"			}		}, { 			id : "exam35",			xtype : "list",			setting : {				ds : "1293"			}		}, { 			id : "highRisk",			xtype : "list",			setting : {				ds : "171",				isDefaultVal : true,				defaultVal : 1			},			requires : {				valEq : 1,				fields : [ 'highRiskRemark', 'highRiskSearch' ]			}		}, { 			id : "highRiskRemark",			xtype : "input",			setting : {				disabled : true,				size : 50			}		}, { 			id : "highRiskSearch",			xtype : "input",			setting : {				disabled : true,				caption : "高危筛选",				maxlen : 30,				size : 14,				isFocus : true,				serviceType : 0,				isSpecial : true			}		}, { 			id : 'pressure',			xtype : 'input',			setting : {				size : 10,				showOnly : true,				readonly : true			}		}, { 			id : 'pleura',			xtype : 'list',			setting : {				ds : "1460",				newlineStep : 4,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "6",				fields : [ "pleuraRemark" ]			}		}, { 			id : 'pleuraRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'mikTooth',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'decayedTooth',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'throatFlat',			xtype : 'list',			setting : {				ds : "1452",				newlineStep : 3,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "4",				fields : [ "throatFlatRemark" ]			}		}, { 			id : 'throatFlatRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'leftEyes',			xtype : 'input',			setting : {				size : 20,				showOnly : true,				readonly : true			}		}, { 			id : 'rightEyes',			xtype : 'input',			setting : {				size : 20,				showOnly : true,				readonly : true			}		}, { 			id : 'lymphNode',			xtype : 'list',			setting : {				ds : "1457",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "lymphNodeRemark" ]			}		}, { 			id : 'lymphNodeRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'lung',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "lungOther" ]			}		}, { 			id : "lungOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, {			id : 'heart',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "heartChildOther" ]			}		}, { 			id : "heartChildOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, {			id : 'liver',			xtype : 'list',			setting : {				ds : "1467",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "liverOther" ]			}		}, {			id : "liverOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它"			}		}, {			id : 'spleen',			xtype : 'list',			setting : {				ds : "1467",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "spleenOther" ]			}		}, {			id : "spleenOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它"			}		}, {			id : 'nerveMental',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "nerveMentalOther" ]			}		}, {			id : "nerveMentalOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'pelvis',			xtype : 'list',			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "pelvisOther" ]			}		}, { 			id : "pelvisOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'illness',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'evaluate',			xtype : 'input',			setting : {				size : 20			}		}, {			id : 'onlinePhoto',			xtype : 'image'		}, {			id : "foreignId",			xtype : "input"		}];
//	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var childrenExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="10"><span					style="font-size: 20px; font-weight: bolder;">新生儿家庭访视记录表</span></td>			</tr>			<tr>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span></td>				<td colspan="3"><span class="Name"></span></td>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">编号：</span></td>				<td colspan="4"><span class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">性别</td>				<td colspan="4"><span class="sex"></span></td>				<td class="header">出生日期</td>				<td colspan="5"><span class="birthday"></span></td>			</tr>			<tr>				<td class="header">身份证号码</td>				<td colspan="2"><span class="idcardNum"></span></td>				<td>家庭住址</td>				<td colspan="5"><span class="address"></span></td>			</tr>			<tr>				<td class="header">父亲</td>				<td class="header">姓名</td>				<td><span class="fname"></span></td>				<td class="header">职业</td>				<td><span class="foccupation"></span></td>				<td class="header">联系电话</td>				<td><span class="fphone"></span></td>				<td class="header">出生日期</td>				<td colspan="3"><span class="fbirthday"></span></td>			</tr>			<tr>				<td class="header">母亲</td>				<td class="header">姓名</td>				<td><span class="mname"></span></td>				<td class="header">职业</td>				<td><span class="moccupation"></span></td>				<td class="header">联系电话</td>				<td><span class="mphone"></span></td>				<td class="header">出生日期</td>				<td colspan="3"><span class="mbirthday"></span></td>			</tr>			<tr>				<td><span>出生孕周</span></td>				<td colspan="3"><span class="gestationalWeeks"></span>周</td>				<td colspan="2">母亲妊娠期患病疾病情况</td>				<td colspan="5"><span class="pregnantSick"></span><span class="pregnantSickOther"></span></td>			</tr>			<tr>				<td class="header">助产机构名称</td>				<td colspan="3"><span class="hospitalName"></span></td>				<td class="header">出生情况</td>				<td colspan="4"><span class="bornStatus"></span><span					class="bornStatusOther"></span></td>			</tr>			<tr>				<td class="header">新生儿窒息</td>				<td colspan="3"><span class="sleepy"></span><span					class="sleepyState"></span></td>				<td class="header">是否有畸形</td>				<td colspan="4"><span class="monster"></span><span					class="monsterOther"></span></td>			</tr>			<tr>				<td class="header">新生儿听力筛查</td>				<td colspan="8"><span class="exam01"></span></td>			</tr>			<tr>				<td class="header">新生儿疾病筛查</td>				<td colspan="8">						<span class="babyIllnessScreen"></span><span class="exam28Other"></span>					</td>			</tr>			<tr>				<td class="header">新生儿出生体重</td>				<td colspan="2"><span class="exam02"></span>kg</td>				<td class="header">目前体重</td>				<td colspan="2"><span class="exam29"></span>kg</td>				<td class="header">出生身长</td>				<td colspan="2"><span class="exam03"></span>cm</td>			</tr>			<tr>				<td class="header">喂养方式</td>				<td colspan="2"><span class="exam04"></span></td>				<td class="header">吃奶量</td>				<td colspan="2"><span class="exam30"></span>ml/次</td>				<td class="header">吃奶次数</td>				<td colspan="2"><span class="exam31"></span>次/日</td>			</tr>			<tr>				<td class="header">呕吐</td>				<td colspan="2"><span class="exam32"></span></td>				<td class="header">大便</td>				<td colspan="2"><span class="exam33"></span></td>				<td class="header">大便次数</td>				<td colspan="2"><span class="exam34"></span>次/日</td>			</tr>			<tr>				<td class="header">体温</td>				<td colspan="2"><span class="exam05"></span>℃</td>				<td class="header">脉率</td>				<td colspan="2"><span class="exam07"></span>次/分</td>				<td class="header">呼吸频率</td>				<td colspan="2"><span class="exam06"></span>次/分</td>			</tr>			<tr>				<td class="header">面色</td>				<td colspan="3"><span class="faceColor"></span><span					id="faceColorOther"></span></td>				<td class="header">黄疸部位</td>				<td colspan="4"><span class="exam35"></span></td>			</tr>			<tr>				<td class="header">前卤</td>				<td colspan="3"><span class="exam09"></span>cm x <span					class="exam10"></span>cm</td>				<td class="header">前卤形状</td>				<td colspan="4"><span class="exam11"></span><br /> <span					class="frontSkullOther"></span></td>			</tr>			<tr>				<td class="header">眼外观</td>				<td colspan="3"><span class="exam12"></span><span					class="exam12other"></span></td>				<td class="header">四肢活动度</td>				<td colspan="4"><span class="exam19"></span><span					class="exam19other"></span></td>			</tr>			<tr>				<td class="header">耳外观</td>				<td colspan="3"><span class="exam13"></span><span					class="exam13other"></span></td>				<td class="header">颈部包块</td>				<td colspan="4"><span class="exam20"></span><span					class="exam20other"></span></td>			</tr>			<tr>				<td class="header">鼻</td>				<td colspan="3"><span class="exam14"></span><span					class="exam14other"></span></td>				<td class="header">皮肤</td>				<td colspan="4"><span class="babySkin"></span><span					class="babySkinsOther"></span></td>			</tr>			<tr>				<td class="header">口腔</td>				<td colspan="3"><span class="exam15"></span><span					class="exam15other"></span></td>				<td class="header">肛门</td>				<td colspan="4"><span class="exam22"></span><span					class="exam22other"></span></td>			</tr>			<tr>				<td class="header">心肺听诊</td>				<td colspan="3"><span class="exam16"></span><span					class="exam16other"></span></td>				<td class="header">外生殖器</td>				<td colspan="4"><span class="exam23"></span><span					class="exam23other"></span></td>			</tr>			<tr>				<td class="header">腹部触诊</td>				<td colspan="3"><span class="exam17"></span><span					class="exam17other"></span></td>				<td class="header">脊柱</td>				<td colspan="4"><span class="exam24"></span><span					class="exam24other"></span></td>			</tr>			<tr>				<td class="header">脐带</td>				<td colspan="8"><span class="exam18"></span><span					class="exam18other"></span></td>			</tr>			<tr>				<td class="header">转诊</td>				<td colspan="8"><span class="exam25"></span><span					class="exam26"></span><span class="exam27"></span></td>			</tr>			<tr>				<td class="header">指导</td>				<td colspan="8"><span class="babyDirect"></span></td>			</tr>			<tr>				<td class="header">本次访视日期</td>				<td colspan="3"><span class="visitDate"></span></td>				<td class="header">下次随访地点</td>				<td colspan="4"><span class="nextVisitPlace"></span></td>			</tr>			<tr>				<td class="header" style="border-bottom: 1px solid #000;">下次随访日期</td>				<td colspan="3" style="border-bottom: 1px solid #000;"><span					class="nextVisitDate"></span></td>				<td class="header" style="border-bottom: 1px solid #000;">随访医生签名</td>				<td colspan="4" style="border-bottom: 1px solid #000;"><span					class="visitDoctor"></span></td>			</tr>		</tbody>	</table></div>';
	getBabyExamInfomation(dsArray,id,childrenExamHtml);
}
function parseDseaseDate(date){
	var d = {};
	if(date!= null && date.length == 8){
		d.year = date.substring(0,4);
		d.month = date.substring(4,6);
	}else{
		return null;
	}
	return d;
}

/**
 * 1岁以内儿童体检记录
 */
PrintHealthFileAndExamClass.prototype.printChildrenExam = function(id){
	var dsArray = [];
	window.cfg = [		{			id : "name",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				showOnly : true,				readonly : true			}		},		{			id : "districtNumber",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "fileNo",			xtype : "combo",			setting : {				ds : {					search : FileNumSearch.listCodePage,					get : FileNumSearch.getItem				},				local : false,				width : 100,				model : {					id : 0,					code : 0,					display : 1				},				showDisplay : false,				roWhenSet : true,				writeback : [ {					id : "name",					col : 1				}, {					id : "barCode",					col : 6				},{					id : "foreignId",					col : 8				} ],				mCodePrefixCtrlId : 'districtNumber',				displayCols : [ 1, 2, 3, 7 ],				displayColNames : [ "编号", "", "", "" ]			},			required : [ true, "编号" ]		},		{			id : "barCode",			xtype : "input",			setting : {				showOnly : true,				readonly : true			}		},		{ 			id : "checkItem",			xtype : "list",			setting : {				ds : "173",				newlineStep : 8			},			required : [ true, "检查月龄" ]		},		{ 			id : "visitDate",			xtype : "input",			setting : {				maxlen : 8,				size : 10,				format : 'date',				blurFun : true,				fillField : [ 'textarea', 'fileNo span',						[ 'earlyDirect', 'dietDirect', 'protectDirect' ] ]			}		},		{ 			id : "weight",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : 'num',				evaluate : true,				evaluateItem : 'weight',				fileInput : [ 'weightScore', 'fileNo', 'height',						'evaluateChild','heightWeightScore' ]			}		},		{ 			id : "weightScore",			xtype : "list",			setting : {				ds : "172",				disabled : true,				scoredisable : true			}		},		{ 			id : "height",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : 'num',				evaluate : true,				evaluateItem : 'height',				fileInput : [ 'heightScore', 'fileNo', 'weight',						'evaluateChild','heightWeightScore' ]			}		}, { 			id : "heightScore",			xtype : "list",			setting : {				ds : "172",				disabled : true,				scoredisable : true			}		}, { 			id : "heightWeightScore",			xtype : "list",			setting : {				ds : "172",				disabled : true,				scoredisable : true			}		}, { 			id : "nextVisitDate",			xtype : "input",			setting : {				maxlen : 8,				size : 10,				format : 'date'			}		}, { 			id : "face",			xtype : "list",			setting : {				ds : "153",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "faceOther" ]			}		 		}, { 			id : "faceOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 50,				caption : "其它面色描述"			}		}, { 			id : "exam01",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "exam01other" ]			}		 		}, { 			id : "exam01other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 50,				caption : "异常描述"			}		}, { 			id : "exam02",			xtype : "list",			setting : {				ds : "68",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam03",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : "num"			}		}, { 			id : "exam04",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : "num"			}		}, { 			id : "eyes",			xtype : "list",			requires : {				valEq : "2",				fields : [ "eyesOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "eyesOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "ears",			xtype : "list",			requires : {				valEq : "2",				fields : [ "earsOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "earsOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam05",			xtype : "input",			setting : {				maxlen : 30,				size : 20,				format : "int"			}		}, { 			id : "heart",			xtype : "list",			requires : {				valEq : "2",				fields : [ "heartOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "heartOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam06",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam06other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam06other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam07",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam07other" ]			},			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam07other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam08",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam08other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam08other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, {			id : "childrenMediExamExam09",			xtype : "list",			setting : {				ds : "32",				multi : true,				save : 'id',				controlShow : 0,				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				mapping : {					value : 'childrenMediExamExam09id'				},				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "childrenMediExamExam10",			xtype : "list",			setting : {				ds : "31",				controlShow : 0,				maxlen : 10,				size : 10,				newlineStep : 6,				multi : true,				save : 'id',				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				mapping : {					value : 'childrenMediExamExam10id'				},				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam11",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam11other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam11other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam12",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		}, {  			id : "activityTime",			xtype : "input",			setting : {				maxlen : 10,				size : 5,				format : "num"			}		}, { 			id : "wdcount",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				format : "num"			}		}, { 			id : "evaluate",			xtype : "list",			setting : {				ds : "188",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "evaluateOther" ]			}		}, { 			id : "evaluateOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "描述"			}		}, { 			id : "state",			xtype : "list",			setting : {				ds : "189",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "other",			xtype : "input",			setting : {				maxlen : 30,				size : 50			}		}, { 			id : "transfer",			xtype : "list",			requires : {				valEq : "2",				fields : [ "transReason", "transUnit" ]			},			setting : {				ds : "151",				maxlen : 10,				size : 10,				save : "isInputValue",				isDefaultVal : true,				defaultVal : 0			},			required : [ true, "是否转诊" ]		}, { 			id : "transReason",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "原因"			}		}, { 			id : "transUnit",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "机构及科室"			}		}, { 			id : "checkDirect",			xtype : "list",			setting : {				ds : "155",				multi : true,				save : 'id',				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				mapping : {					value : 'checkDirectId'				}			}		}, { 			id : "directOther",			xtype : "input",			setting : {				maxlen : 30,				size : 20			}		}, { 			id : "nextVisitDate",			xtype : "input",			setting : {				format : 'date',				maxlen : 8,				size : 10			}		}, { 			id : "visitDoctor",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		}, {			id : "dataType",			xtype : "input",			setting : {				disabled : true,				defaultVal : "0"			}		}, { 			id : "head",			xtype : "input",			setting : {				format : "num",				size : 10,				maxlen : 20			}		}, { 			id : "exam13",			xtype : "list",			setting : {				ds : "151",				save : "isInputValue",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam14",			xtype : "list",			setting : {				ds : "188",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam15",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "exam15Other" ]			}		}, {			id : "exam15Other",			xtype : "input",			setting : {				disabled : true,				size : 20,				maxlen : 40,				caption : "异常描述"			}		}, {			id : "exam16",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "exam16Other" ]			}		}, {			id : "exam16Other",			xtype : "input",			setting : {				disabled : true,				size : 20,				maxlen : 40,				caption : "异常描述"			}		}, { 			id : "highRisk",			xtype : "list",			setting : {				ds : "171",				isDefaultVal : true,				defaultVal : 1			},			requires : {				valEq : 1,				fields : [ 'highRiskRemark', 'highRiskSearch' ]			}		}, { 			id : "highRiskRemark",			xtype : "input",			setting : {				disabled : true,				size : 50			}		}, { 			id : "highRiskSearch",			xtype : "input",			setting : {				disabled : true,				caption : "高危筛选",				maxlen : 30,				size : 14,				isFocus : true,				serviceType : 0,				isSpecial : true			}		}, { 			id : 'pressure',			xtype : 'input',			setting : {				size : 10,				showOnly : true,				readonly : true			}		}, {			id : 'pleura',			xtype : 'list',			setting : {				ds : "1460",				newlineStep : 4,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "6",				fields : [ "pleuraRemark" ]			}		}, { 			id : 'pleuraRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'mikTooth',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'decayedTooth',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'throatFlat',			xtype : 'list',			setting : {				ds : "1452",				newlineStep : 3,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "4",				fields : [ "throatFlatRemark" ]			}		}, { 			id : 'throatFlatRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'leftEyes',			xtype : 'input',			setting : {				size : 20,				showOnly : true,				readonly : true			}		}, { 			id : 'rightEyes',			xtype : 'input',			setting : {				size : 20,				showOnly : true,				readonly : true			}		}, { 			id : 'lymphNode',			xtype : 'list',			setting : {				ds : "1457",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "lymphNodeRemark" ]			}		}, { 			id : 'lymphNodeRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'lung',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "lungOther" ]			}		}, { 			id : "lungOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'heartChild',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "heartChildOther" ]			}		}, { 			id : "heartChildOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'liver',			xtype : 'list',			setting : {				ds : "1467",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "liverOther" ]			}		}, { 			id : "liverOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它"			}		}, { 			id : 'spleen',			xtype : 'list',			setting : {				ds : "1467",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "spleenOther" ]			}		}, { 			id : "spleenOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它"			}		}, { 			id : 'nerveMental',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "nerveMentalOther" ]			}		}, { 			id : "nerveMentalOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'pelvis',			xtype : 'list',			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "pelvisOther" ]			}		}, { 			id : "pelvisOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'illness',			xtype : 'input',			setting : {				size : 50			}		}, { 			id : 'evaluateChild',			xtype : 'input',			setting : {				size : 50			}		}, {			id : 'onlinePhoto',			xtype : 'image'		}, { 			id : "dietDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, { 			id : "earlyDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, { 			id : "protectDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, {			id : "nose",			xtype : "list",			requires : {				valEq : "2",				fields : [ "noseother" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "noseother",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "hearing",			xtype : "list",			setting : {				ds : "108",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "backbone",			xtype : "list",			requires : {				valEq : "2",				fields : [ "backboneOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "backboneOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, {			id : "breastMilk",			xtype : "list",			setting : {				ds : "98"			}		}, {			id : "foreignId",			xtype : "input"		}, { 			id : "tcmserviceForChildren",			xtype : "list",			setting : {				ds : "2017",				newlineStep : 1,				maxlen : 10,				size : 10,				multi : true,				save : 'id',				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				mapping : {					value : 'manageServiceId'				}			},			requires : {				valEq : "4",				fields : [ "tcmServiceOther" ]			}		}, {			id : "tcmServiceOther",			xtype : "input",			setting : {				disabled : true,				size : 50			}		} ];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var childrenExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="4"><span					style="font-size: 20px; font-weight: bolder;">1岁以内儿童健康检查记录表</span></td>			</tr>			<tr>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span></td>				<td><span class="Name"></span></td>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">编号：</span></td>				<td><span class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">月龄</td>				<td colspan="3"><span class="checkItem"></span></td>			</tr>			<tr>				<td class="header">随访日期</td>				<td colspan="3"><span class="visitDate"></span></td>			</tr>			<tr>				<td class="header">体重(kg)</td>				<td><span class="weight"></span></td>				<td colspan="2"><span class="weightScore"></span></td>			</tr>			<tr>				<td class="header">身长(cm)</td>				<td><span class="height"></span></td>				<td colspan="2"><span class="heightScore"></span></td>			</tr>			<tr>				<td class="header">身高的体重</td>				<td colspan="3"><span class="heightWeightScore"></span></td>			</tr>			<tr>				<td class="header">头围(cm)</td>				<td colspan="3"><span class="head"></span></td>			</tr>			<tr>				<td rowspan="16">体格检查</td>				<td class="header">面色</td>				<td colspan="2"><span class="face"></span></td>			</tr>			<tr>				<td class="header">皮肤</td>				<td colspan="2"><span class="exam01"></span>					<span class="exam01other"></span></td>			</tr>			<tr>				<td class="header">前卤</td>				<td><span class="exam02"></span></td>				<td><span class="exam03"></span>cm x					<span class="exam04"></span>cm</td>			</tr>			<tr>				<td class="header">颈部包块</td>				<td colspan="2"><span class="exam13"></span></td>			</tr>			<tr>				<td class="header">眼外观</td>				<td colspan="2"><span class="eyes"></span>					<span class="eyesOther"></span></td>			</tr>			<tr>				<td class="header">耳外观</td>				<td colspan="2"><span class="ears"></span>					<span class="earsOther"></span></td>			</tr>			<tr>				<td class="header">听力</td>				<td colspan="2"><span class="exam14"></span></td>			</tr>			<tr>				<td class="header">口腔</td>				<td colspan="2"><span class="exam15"></span>					<span class="exam15Other"></span></td>			</tr>			<tr>				<td class="header">心肺</td>				<td colspan="2"><span class="heart"></span>					<span class="heartOther"></span></td>			</tr>			<tr>				<td class="header">腹部</td>				<td colspan="2"><span class="exam06"></span>					<span class="exam06other"></span></td>			</tr>			<tr>				<td class="header">脐部</td>				<td colspan="2"><span class="exam07"></span>					<span class="exam07other"></span></td>			</tr>			<tr>				<td class="header">四肢</td>				<td colspan="2"><span class="exam16"></span>					<span class="exam16Other"></span></td>			</tr>			<tr>				<td class="header">可疑佝偻病症状</td>				<td colspan="2"><span class="childrenMediExamExam09"></span></td>			</tr>			<tr>				<td class="header">可疑佝偻病体征</td>				<td colspan="2"><span class="childrenMediExamExam10"></span></td>			</tr>			<tr>				<td class="header">肛门 / 外生殖器</td>				<td colspan="2"><span class="exam11"></span>					<span class="exam11other"></span></td>			</tr>			<tr>				<td class="header">血红蛋白值(g/L)</td>				<td colspan="2"><span class="exam12"></span></td>			</tr>			<tr>				<td class="header">户外活动</td>				<td colspan="3"><span class="activityTime"></span>小时/日</td>			</tr>			<tr>				<td class="header">服用维生素D</td>				<td colspan="3"><span class="wdcount"></span>IU/日</td>			</tr>			<tr>				<td class="header">发育评估</td>				<td colspan="3"><span class="evaluate"></span>					<span class="evaluateOther"></span></td>			</tr>			<tr>				<td class="header">两次访问间患病情况</td>				<td colspan="3"><span class="state"></span></td>			</tr>			<tr>				<td class="header">其它</td>				<td colspan="3"><span class="other"></span></td>			</tr>			<tr>				<td class="header">转诊</td>				<td colspan="3"><span class="transfer"></span>					<span class="transReason"></span>					<span class="transUnit"></span></td>			</tr>			<tr>				<td class="header">指导</td>				<td colspan="3"><span class="checkDirect"></span></td>			</tr>			<tr>				<td class="header">6个月内母乳喂养情况</td>				<td colspan="3"><span class="breastMilk"></span></td>			</tr>			<tr>				<td class="header" style="border-bottom: 1px solid #000;">下次随访日期</td>				<td style="border-bottom: 1px solid #000;"><span						class="nextVisitDate"></span></td>				<td class="header" style="border-bottom: 1px solid #000;">随访医生签名</td>				<td style="border-bottom: 1px solid #000;"><span						class="visitDoctor"></span></td>			</tr>		</tbody>	</table></div>';
//	console.log(dsArray);
	getChildrenExamInfomation(dsArray,id,childrenExamHtml);
}

/**
 * 1~2岁以内儿童体检记录
 */
PrintHealthFileAndExamClass.prototype.printChildrenExam1_2 = function(id){
	var dsArray = [];
	window.cfg = [				{			id : "name",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				showOnly : true,				readonly : true			}		},		{			id : "districtNumber",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "fileNo",			xtype : "combo",			setting : {				ds : {					search : FileNumSearch.listCodePage,					get : FileNumSearch.getItem				},				local : false,				width : 100,				model : {					id : 0,					code : 0,					display : 1				},				showDisplay : false,				roWhenSet : true,				writeback : [ {					id : "name",					col : 1				}, {					id : "barCode",					col : 6				},{					id : "foreignId",					col : 8				} ],				mCodePrefixCtrlId : 'districtNumber',				displayCols : [ 1, 2, 3, 7 ],				displayColNames : [ "编号", "", "", "" ]			},			required : [ true, "编号" ]		},		{			id : "barCode",			xtype : "input",			setting : {				showOnly : true,				readonly : true			}		},		{ 			id : "checkItem",			xtype : "list",			setting : {				ds : "174",				newlineStep : 7			},			required : [ true, "检查月龄" ]		},		{ 			id : "visitDate",			xtype : "input",			setting : {				maxlen : 8,				size : 10,				format : 'date',				blurFun : true,				fillField : [ 'textarea', 'fileNo span',						[ 'earlyDirect', 'dietDirect', 'protectDirect' ] ]			}		},		{ 			id : "weight",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : "num",				evaluate : true,				evaluateItem : 'weight',				fileInput : [ 'weightScore', 'fileNo', 'height',						'evaluateChild' ]			}		},		{ 			id : "weightScore",			xtype : "list",			setting : {				ds : "172",				disabled : true,				scoredisable : true			}		},		{ 			id : "height",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : "num",				evaluate : true,				evaluateItem : 'height',				fileInput : [ 'heightScore', 'fileNo', 'weight',						'evaluateChild' ]			}		}, {			id : "heightScore",			xtype : "list",			setting : {				ds : "172",				disabled : true,				scoredisable : true			}		}, { 			id : "face",			xtype : "list",			setting : {				ds : "153",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "faceOther" ]			}		 		}, { 			id : "faceOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 50,				caption : "其它面色描述"			}		}, { 			id : "exam01",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "exam01other" ]			}		 		}, { 			id : "exam01other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 50,				caption : "异常描述"			}		}, { 			id : "exam02",			xtype : "list",			setting : {				ds : "68",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam03",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : "num"			}		}, {  			id : "exam04",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : "num"			}		}, { 			id : "eyes",			xtype : "list",			requires : {				valEq : "2",				fields : [ "eyesOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "eyesOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "ears",			xtype : "list",			requires : {				valEq : "2",				fields : [ "earsOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "earsOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam05",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : "int"			}		}, { 			id : "exam17",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				format : "int"			}		}, {  			id : "heart",			xtype : "list",			requires : {				valEq : "2",				fields : [ "heartOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "heartOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam06",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam06other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam06other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "walk",			xtype : "list",			requires : {				valEq : "2",				fields : [ "walkOther" ]			},			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "walkOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam08",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam08other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, {			id : "exam08other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam09",			xtype : "list",			setting : {				ds : "32"			}		}, { 			id : "exam10",			xtype : "list",			setting : {				ds : "1299",				maxlen : 10,				size : 10,				newlineStep : 6			}		}, { 			id : "exam11",			xtype : "list",			requires : {				valEq : "2",				fields : [ "exam11other" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "exam11other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "exam12",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		}, {			id : "activityTime",			xtype : "input",			setting : {				maxlen : 10,				size : 5,				format : "num"			}		}, { 			id : "wdcount",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				format : "num"			}		}, { 			id : "evaluate",			xtype : "list",			setting : {				ds : "188",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "state",			xtype : "list",			setting : {				ds : "189",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 50			}		}, { 			id : "transfer",			xtype : "list",			requires : {				valEq : "2",				fields : [ "transReason", "transUnit" ]			},			setting : {				ds : "151",				maxlen : 10,				size : 10,				save : "isInputValue",				isDefaultVal : true,				defaultVal : 0			},			required : [ true, "是否转诊" ]		}, { 			id : "transReason",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "原因"			}		}, { 			id : "transUnit",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "机构及科室"			}		}, { 			id : "checkDirect",			xtype : "list",			setting : {				ds : "155",				multi : true,				save : 'id',				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				mapping : {					value : 'checkDirectId'				}			}		}, { 			id : "directOther",			xtype : "input",			setting : {				maxlen : 30,				size : 20			}		}, { 			id : "nextVisitDate",			xtype : "input",			setting : {				maxlen : 8,				format : 'date'			}		}, { 			id : "visitDoctor",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		}, {			id : "dataType",			xtype : "input",			setting : {				disabled : true,				defaultVal : "1"			}		}, {			id : "other",			xtype : "input",			setting : {				size : 50,				maxlen : 50			}		}, {			id : "exam14",			xtype : "list",			setting : {				ds : "188",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "highRisk",			xtype : "list",			setting : {				ds : "171",				isDefaultVal : true,				defaultVal : 1			},			requires : {				valEq : 1,				fields : [ 'highRiskRemark', 'highRiskSearch' ]			}		}, { 			id : "highRiskRemark",			xtype : "input",			setting : {				disabled : true,				size : 50			}		}, { 			id : "highRiskSearch",			xtype : "input",			setting : {				disabled : true,				caption : "高危筛选",				maxlen : 30,				size : 14,				isFocus : true,				serviceType : 0,				isSpecial : true			}		}, { 			id : 'pressure',			xtype : 'input',			setting : {				size : 10,				showOnly : true,				readonly : true			}		}, { 			id : 'pleura',			xtype : 'list',			setting : {				ds : "1460",				newlineStep : 4,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "6",				fields : [ "pleuraRemark" ]			}		}, { 			id : 'pleuraRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'mikTooth',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'decayedTooth',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'throatFlat',			xtype : 'list',			setting : {				ds : "1452",				newlineStep : 3,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "4",				fields : [ "throatFlatRemark" ]			}		}, { 			id : 'throatFlatRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'leftEyes',			xtype : 'input',			setting : {				size : 20,				showOnly : true,				readonly : true			}		}, { 			id : 'rightEyes',			xtype : 'input',			setting : {				size : 20,				showOnly : true,				readonly : true			}		}, { 			id : 'lymphNode',			xtype : 'list',			setting : {				ds : "1457",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "lymphNodeRemark" ]			}		}, { 			id : 'lymphNodeRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'lung',			xtype : 'list',			setting : {				ds : "1467",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "lungOther" ]			}		}, { 			id : "lungOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它"			}		}, { 			id : 'heartChild',			xtype : 'list',			setting : {				ds : "1467",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "heartChildOther" ]			}		}, { 			id : "heartChildOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它"			}		}, { 			id : 'liver',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "liverOther" ]			}		}, { 			id : "liverOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'spleen',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "spleenOther" ]			}		}, { 			id : "spleenOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'nerveMental',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "nerveMentalOther" ]			}		}, { 			id : "nerveMentalOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'pelvis',			xtype : 'list',			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "pelvisOther" ]			}		}, { 			id : "pelvisOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'illness',			xtype : 'input',			setting : {				size : 50			}		}, { 			id : 'evaluateChild',			xtype : 'input',			setting : {				size : 50			}		}, {			id : 'onlinePhoto',			xtype : 'image'		}, { 			id : "dietDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, { 			id : "earlyDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, { 			id : "protectDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, { 			id : "nose",			xtype : "list",			requires : {				valEq : "2",				fields : [ "noseother" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "noseother",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "hearing",			xtype : "list",			setting : {				ds : "11",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "hearingOther" ]			}		}, { 			id : "hearingOther",			xtype : "input",			setting : {				disabled : true,				size : 30,				maxlen : 30,				caption : ""			}		}, { 			id : "backbone",			xtype : "list",			requires : {				valEq : "2",				fields : [ "backboneOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, {  			id : "backboneOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, {  			id : "genitals",			xtype : "list",			requires : {				valEq : "2",				fields : [ "genitalsOther" ]			},			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "genitalsOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, {			id : "foreignId",			xtype : "input"		}, { 			id : "tcmserviceForChildren",			xtype : "list",			setting : {				ds : "2020",				newlineStep : 1,				maxlen : 10,				size : 10,				multi : true,				save : 'id',				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				mapping : {					value : 'manageServiceId'				}			},			requires : {				valEq : "6",				fields : [ "tcmServiceOther" ]			}		}, {			id : "tcmServiceOther",			xtype : "input",			setting : {				disabled : true,				size : 50			}		} ];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var childrenExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="4"><span					style="font-size: 20px; font-weight: bolder;">1～2岁儿童健康检查记录表</span></td>			</tr>			<tr>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span></td>				<td><span class="Name"></span></td>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">编号：</span></td>				<td><span class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">月龄</td>				<td colspan="3"><span class="checkItem"></span></td>			</tr>			<tr>				<td class="header">随访日期</td>				<td colspan="3"><span class="visitDate"></span></td>			</tr>			<tr>				<td class="header">体重(kg)</td>				<td><span class="weight"></span></td>				<td colspan="2"><span class="weightScore"></span></td>			</tr>			<tr>				<td class="header">身长(cm)</td>				<td><span class="height"></span></td>				<td colspan="2"><span class="heightScore"></span></td>			</tr>			<tr>				<td rowspan="13">体格检查</td>				<td class="header">面色</td>				<td colspan="2"><span class="face"></span></td>			</tr>			<tr>				<td class="header">皮肤</td>				<td colspan="2"><span class="exam01"></span> <span					class="exam01other"></span></td>			</tr>			<tr>				<td class="header">前卤</td>				<td><span class="exam02"></span></td>				<td><span class="exam03"></span>cm x <span class="exam04"></span>cm</td>			</tr>			<tr>				<td class="header">眼外观</td>				<td colspan="2"><span class="eyes"></span> <span					class="eyesOther"></span></td>			</tr>			<tr>				<td class="header">耳外观</td>				<td colspan="2"><span class="ears"></span> <span					class="earsOther"></span></td>			</tr>			<tr>				<td class="header">听力</td>				<td colspan="2"><span class="exam14"></span></td>			</tr>			<tr>				<td class="header">出牙/龋齿数（颗）</td>				<td colspan="2"><span id="exam05"></span>/<span id="exam17"></span></td>			</tr>			<tr>				<td class="header">心肺</td>				<td colspan="2"><span class="heart"></span> <span					class="heartOther"></span></td>			</tr>			<tr>				<td class="header">腹部</td>				<td colspan="2"><span class="exam06"></span> <span					class="exam06other"></span></td>			</tr>			<tr>				<td class="header">四肢</td>				<td colspan="2"><span class="exam08"></span> <span					class="exam08other"></span></td>			</tr>			<tr>				<td class="header">步态</td>				<td colspan="2"><span class="walk"></span> <span					class="walkOther"></span></td>			</tr>			<tr>				<td class="header">可疑佝偻病体征</td>				<td colspan="2"><span class="exam10"></span></td>			</tr>			<tr>				<td class="header">血红蛋白值(g/L)</td>				<td colspan="2"><span class="exam12"></span></td>			</tr>			<tr>				<td class="header">户外活动</td>				<td colspan="3"><span class="activityTime"></span>小时/日</td>			</tr>			<tr>				<td class="header">服用维生素D</td>				<td colspan="3"><span class="wdcount"></span>IU/日</td>			</tr>			<tr>				<td class="header">发育评估</td>				<td colspan="3"><span class="evaluate"></span> </td>			</tr>			<tr>				<td class="header">两次访问间患病情况</td>				<td colspan="3"><span class="state"></span></td>			</tr>			<tr>				<td class="header">其它</td>				<td colspan="3"><span class="other"></span></td>			</tr>			<tr>				<td class="header">转诊建议</td>				<td colspan="3"><span class="transfer"></span> <span					class="transReason"></span> <span class="transUnit"></span></td>			</tr>			<tr>				<td class="header">指导</td>				<td colspan="3"><span class="checkDirect"></span></td>			</tr>			<tr>				<td class="header" style="border-bottom: 1px solid #000;">下次随访日期</td>				<td style="border-bottom: 1px solid #000;"><span					class="nextVisitDate"></span></td>				<td class="header" style="border-bottom: 1px solid #000;">随访医生签名</td>				<td style="border-bottom: 1px solid #000;"><span					class="visitDoctor"></span></td>			</tr>		</tbody>	</table></div>';

	getChildrenExamInfomation(dsArray,id,childrenExamHtml);
}

/**
 * 3~6岁以内儿童体检记录
 */
PrintHealthFileAndExamClass.prototype.printChildrenExam3_6 = function(id){
	var dsArray = [];
	window.cfg = [			{			id : "name",			xtype : "input",			setting : {				maxlen : 8,				size : 8,				width : 60,				showOnly : true,								readonly : true			}		},		{			id : "districtNumber",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "fileNo",			xtype : "combo",			setting : {				ds : {					search : FileNumSearch.listCodePage,					get : FileNumSearch.getItem				},				local : false,				width : 100,				model : {					id : 0,					code : 0,					display : 1				},				showDisplay : false,				roWhenSet : true,				writeback : [ {					id : "name",					col : 1				}, {					id : "barCode",					col : 6				},{					id : "foreignId",					col : 8				} ],				mCodePrefixCtrlId : 'districtNumber',				displayCols : [ 1, 2, 3, 7 ],				displayColNames : [ "编号", "疾病", "", "" ]			},			required : [ true, "编号" ]		},		{			id : "barCode",			xtype : "input",			setting : {				showOnly : true,				readonly : true			}		},		{						id : "checkItem",			xtype : "list",			setting : {				ds : "190",				newlineStep : 10			},			required : [ true, "项目" ]		},		{			id : "visitDate",			xtype : "input",			setting : {				format : 'date',				defaultVal : new Date(),				maxlen : 8,				size : 10,				blurFun : true,				fillField : [ 'textarea', 'fileNo span',						[ 'earlyDirect', 'dietDirect', 'protectDirect' ] ]			},			required : [ true, "随访日期" ]		},		{			id : "weight",			xtype : "input",			setting : {				maxlen : 10,				size : 10,				format : "num",				evaluate : true,				evaluateItem : 'weight',				fileInput : [ 'weightScore', 'fileNo', 'height', 'evaluate' ]			}		},		{			id : 'weightScore',			xtype : 'list',			setting : {				ds : "172",				disabled : true,				scoredisable : true			}		},		{			id : "height",			xtype : "input",			setting : {				maxlen : 10,				size : 10,				format : "num",				evaluate : true,				evaluateItem : 'height',				fileInput : [ 'heightScore', 'fileNo', 'weight', 'evaluate' ]			}		},		{			id : 'heightScore',			xtype : 'list',			setting : {				ds : "172",				disabled : true,				scoredisable : true			}		},		{			id : 'body',			xtype : 'list',			setting : {				ds : "89",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : 'sight',			xtype : 'input',			setting : {				format : 'num'			}		},		{			id : 'hearing',			xtype : 'list',			setting : {				ds : '188',				isDefaultVal : true,				defaultVal : 0			}		},		{			id : 'tooth',			xtype : 'input',			setting : {				format : 'num',				size : 10			}		},		{			id : 'caries',			xtype : 'input',			setting : {				format : 'num',				size : 10			}		},		{			id : 'heart',			xtype : 'list',			setting : {				ds : '96',				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "heartOther" ]			}		},		{			id : 'heartOther',			xtype : 'input',			setting : {				disabled : true,				maxlen : 10,				size : 10			}		},		{			id : 'venter',			xtype : 'list',			setting : {				ds : '22',				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "venterOther" ]			}		},		{			id : 'venterOther',			xtype : 'input',			setting : {				disabled : true,				maxlen : 10,				size : 10			}		},		{			id : 'hemoglobin',			xtype : 'input',			setting : {				format : 'num'			}		},		{			id : 'other',			xtype : 'input',			setting : {				size : 40,				maxlen : 50			}		},		{			id : 'checkSickness',			xtype : 'list',			setting : {				ds : '151',				save : 'isInputValue',				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "pneumonia", "scour", "wound", "checkSicknessOther" ]			}		},		{			id : 'pneumonia',			xtype : 'input',			setting : {				disabled : true,				format : 'int',				maxlen : 5,				size : 5,				caption : "肺炎（ 次）"			}		},		{			id : 'scour',			xtype : 'input',			setting : {				disabled : true,				format : 'int',				maxlen : 5,				size : 5,				caption : "腹泻（ 次）"			}		},		{			id : 'wound',			xtype : 'input',			setting : {				disabled : true,				format : 'int',				maxlen : 5,				size : 5,				caption : "外伤（ 次）"			}		},		{			id : 'checkSicknessOther',			xtype : 'input',			setting : {				disabled : true,				maxlen : 50,				size : 50,				caption : "其它"			}		},		{			id : 'transfer',			xtype : 'list',			setting : {				ds : '151',				save : 'isInputValue',				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "transReason", "transUnit" ]			}		},		{			id : 'transReason',			xtype : 'input',			setting : {				disabled : true,				maxlen : 20,				size : 20,				caption : "转诊原因"			}		},		{			id : 'transUnit',			xtype : 'input',			setting : {				disabled : true,				maxlen : 20,				size : 20,				caption : "转诊机构及科室"			}		},		{			id : "checkDirect36",			xtype : "list",			setting : {				ds : "157",				multi : true,				save : "id",				newlineStep : 5,				forceNewline : true,				mapping : {					value : 'checkDirect36id'				}			}		},		{			id : "nextVisitDate",			xtype : "input",			setting : {				format : 'date',				maxlen : 8,				size : 10,				defaultVal : new Date((new Date()).getFullYear() + 1,						(new Date()).getMonth(), (new Date()).getDate())			}		}, {			id : "visitDoctor",			xtype : "input",			setting : {				maxlen : 10,				size : 10			}		}, { 			id : "highRisk",			xtype : "list",			setting : {				ds : "171",				isDefaultVal : true,				defaultVal : 1			},			requires : {				valEq : 1,				fields : [ 'highRiskRemark', 'highRiskSearch' ]			}		}, { 			id : "highRiskRemark",			xtype : "input",			setting : {				disabled : true,				size : 50			}		}, { 			id : "highRiskSearch",			xtype : "input",			setting : {				disabled : true,				caption : "高危筛选",				maxlen : 30,				size : 14,				isFocus : true,				serviceType : 0,				isSpecial : true			}		}, { 			id : 'pressure',			xtype : 'input',			setting : {				size : 10			}		}, { 			id : 'pleura',			xtype : 'list',			setting : {				ds : "1460",				newlineStep : 4,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "6",				fields : [ "pleuraRemark" ]			}		}, { 			id : 'pleuraRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, {			id : 'beforeSkull01',			xtype : 'input',			setting : {				size : 5			}		}, {			id : 'beforeSkull02',			xtype : 'input',			setting : {				size : 5			}		}, { 			id : 'skins',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "skinsOther" ]			}		}, { 			id : "skinsOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'throatFlat',			xtype : 'list',			setting : {				ds : "1452",				newlineStep : 3,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "4",				fields : [ "throatFlatRemark" ]			}		}, { 			id : 'throatFlatRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'leftEyes',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'rightEyes',			xtype : 'input',			setting : {				size : 20			}		}, { 			id : 'lymphNode',			xtype : 'list',			setting : {				ds : "1457"			},			requires : {				valEq : "2",				fields : [ "lymphNodeRemark" ]			}		}, { 			id : 'lymphNodeRemark',			xtype : 'input',			setting : {				disabled : true,				size : 10,				caption : "其它"			}		}, { 			id : 'lung',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "lungOther" ]			}		}, {			id : "lungOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'heartChild',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "heartChildOther" ]			}		}, { 			id : "heartChildOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'liver',			xtype : 'list',			setting : {				ds : "1467",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "liverOther" ]			}		}, { 			id : "liverOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它"			}		}, { 			id : 'spleen',			xtype : 'list',			setting : {				ds : "1467",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "spleenOther" ]			}		}, { 			id : "spleenOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它"			}		}, { 			id : 'nerveMental',			xtype : 'list',			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "nerveMentalOther" ]			}		}, { 			id : "nerveMentalOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'pelvis',			xtype : 'list',			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "2",				fields : [ "pelvisOther" ]			}		}, { 			id : "pelvisOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : 'illness',			xtype : 'input',			setting : {				size : 50			}		}, { 			id : 'evaluate',			xtype : 'input',			setting : {				size : 50			}		}, {			id : 'onlinePhoto',			xtype : 'image'		}, { 			id : "dietDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, { 			id : "earlyDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, { 			id : "protectDirect",			xtype : "input",			setting : {				multiline : true,				width : '400px',				height : '100px'			}		}, { 			id : "nose",			xtype : "list",			requires : {				valEq : "2",				fields : [ "noseother" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "noseother",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "hearingChild",			xtype : "list",			setting : {				ds : "108",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : "3",				fields : [ "hearingOther" ]			}		}, { 			id : "hearingOther",			xtype : "input",			setting : {				disabled : true,				size : 30,				maxlen : 30,				caption : ""			}		}, {  			id : "backbone",			xtype : "list",			requires : {				valEq : "2",				fields : [ "backboneOther" ]			},			setting : {				ds : "96",				maxlen : 10,				size : 10,				isDefaultVal : true,				defaultVal : 0			}		}, {  			id : "backboneOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "genitals",			xtype : "list",			requires : {				valEq : "2",				fields : [ "genitalsOther" ]			},			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "genitalsOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "ears",			xtype : "list",			requires : {				valEq : "2",				fields : [ "earsOther" ]			},			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "earsOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, { 			id : "fourLimbs",			xtype : "list",			requires : {				valEq : "2",				fields : [ "fourLimbsOther" ]			},			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "fourLimbsOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		}, {			id : "foreignId",			xtype : "input"		}, { 			id : "tcmserviceForChildren36",			xtype : "list",			setting : {				ds : "2019",				newlineStep : 1,				maxlen : 10,				size : 10,				multi : true,				save : 'id',				displayCols : [ 'number', 'name' ],				displayColNames : [ "编号", "方式" ],				mapping : {					value : 'manageService36id'				}			},			requires : {				valEq : "4",				fields : [ "tcmService36Other" ]			}		}, { 			id : "tcmService36Other",			xtype : "input",			setting : {				disabled : true,				size : 50			}		}];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var childrenExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="4"><span					style="font-size: 20px; font-weight: bolder;">3～6岁儿童健康检查记录表</span></td>			</tr>			<tr>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span></td>				<td><span class="Name"></span></td>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">编号：</span></td>				<td><span class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">月龄</td>				<td colspan="3"><span class="checkItem"></span></td>			</tr>			<tr>				<td class="header">随访日期</td>				<td colspan="3"><span class="visitDate"></span></td>			</tr>			<tr>				<td class="header">体重(kg)</td>				<td><span class="weight"></span></td>				<td colspan="2"><span class="weightScore"></span></td>			</tr>			<tr>				<td class="header">身长(cm)</td>				<td><span class="height"></span></td>				<td colspan="2"><span class="heightScore"></span></td>			</tr>			<tr>				<td class="header">体格发育评价</td>				<td colspan="3"><span class="body"></span></td>			</tr>			<tr>				<td rowspan="7">体格检查</td>				<td class="header">视力</td>				<td colspan="2"><span class="sight"></span></td>			</tr>			<tr>				<td class="header">听力</td>				<td colspan="2"><span class="hearing"></span></td>			</tr>			<tr>				<td class="header">牙数（颗）/龋齿数</td>				<td colspan="2"><span id="tooth"></span>/<span id="caries"></span></td>			</tr>			<tr>				<td class="header">心肺</td>				<td colspan="2"><span class="heart"></span> <span					class="heartOther"></span></td>			</tr>			<tr>				<td class="header">腹部</td>				<td colspan="2"><span class="venter"></span> <span					class="venterOther"></span></td>			</tr>			<tr>				<td class="header">血红蛋白值(g/L)</td>				<td colspan="2"><span class="hemoglobin"></span></td>			</tr>			<tr>				<td class="header">其他</td>				<td colspan="2"><span class="other"></span></td>			</tr>						<tr>				<td class="header">两次随访间患病情况</td>				<td colspan="3"><span id="checkSickness"></span> <span							id="pneumonia"></span><span id="scour"></span><span id="wound"></span><br />							<span id="checkSicknessOther"></span></td>			</tr>			<tr>				<td class="header">其它</td>				<td colspan="3"><span class="other"></span></td>			</tr>			<tr>				<td class="header">转诊建议</td>				<td colspan="3"><span class="transfer"></span> <span					class="transReason"></span> <span class="transUnit"></span></td>			</tr>			<tr>				<td class="header">指导</td>				<td colspan="3"><span class="checkDirect36"></span></td>			</tr>			<tr>				<td class="header" style="border-bottom: 1px solid #000;">下次随访日期</td>				<td style="border-bottom: 1px solid #000;"><span					class="nextVisitDate"></span></td>				<td class="header" style="border-bottom: 1px solid #000;">随访医生签名</td>				<td style="border-bottom: 1px solid #000;"><span					class="visitDoctor"></span></td>			</tr>		</tbody>	</table></div>';
	getChildrenExamInfomation3_6(dsArray,id,childrenExamHtml);
}
/**
 * 第一次产前随访
 */
PrintHealthFileAndExamClass.prototype.printFirstVisitExam = function(id){
	var dsArray = [];
	window.cfg = [	{			id : "name",			xtype : "input",			setting : {				maxlen : 20,				size : 10,				readonly : true,				showOnly : true			}		},		{			id : "bornAge",			xtype : "input",			setting : {				maxlen : 20,				size : 10			}		},		{			id : "districtNumber",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "fileNo",			xtype : "combo",			setting : {				ds : {					search : FileNumSearch.listCodePage,					get : FileNumSearch.getItem				},				local : false,				width : 100,				model : {					id : 0,					code : 0,					display : 1				},				showDisplay : false,				roWhenSet : true,				writeback : [ {					id : "name",					col : 1				}, {					id : "bornAge",					col : 4				}, {					id : "barCode",					col : 6				}, {					id : "foreignId",					col : 8				} ],				showHistoryRecordSingle : {					foreignIdCol : 8,					foreignIdName : "foreignId"				},				mCodePrefixCtrlId : "districtNumber",				displayCols : [ 1, 2, 3, 7 ],				displayColNames : [ "编号", "", "", "" ]			},			required : [ true, "编号" ]		},		{			id : "barCode",			xtype : "input",			setting : {				showOnly : true,				readonly : true			}		},		{			id : "visitDate",			xtype : "input",			setting : {				format : "date",				maxlen : 20,				size : 10,				defaultVal : new Date()			},			required : [ true, "访视日期" ]		},		{			id : "weeks",			xtype : "input",			setting : {				maxlen : 10,				size : 10			}		},		{			id : "husbandName",			xtype : "input",			setting : {				maxlen : 10,				size : 10			}		},		{			id : "husbandAge",			xtype : "input",			setting : {				format : "int",				size : 10			}		},		{			id : "husbandTel",			xtype : "input",			setting : {				maxlen : 11,				size : 11			}		},		{			id : "gravidity",			xtype : "input",			setting : {				format : "int",				size : 10,				gravidityEvent : {					fileNo : "fileNo span",					tableName : "FirstVistBeforeBorn"				}			},			required : [ true, "孕次" ]		},		{			id : "parity",			xtype : "input",			setting : {				format : "int",				size : 5			}		},		{			id : "parity1",			xtype : "input",			setting : {				format : "int",				size : 5			}		},		{			id : "lastMenses",			xtype : "input",			setting : {				format : "date",				maxlen : 8,				size : 10,				isCalculateTime : [ [ "edc", 281 ], [ "nextVisitDate", 141 ] ]			}		},		{			id : "edc",			xtype : "input",			setting : {				format : "date",				maxlen : 8,				size : 10			}		},		{			id : "femePastHistory",			xtype : "list",			setting : {				ds : "158",				multi : true,				save : "id",				mapping : {					value : "femePastHistoryId"				},				forceNewline : true,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 8,				fields : [ "pastHistoryOther" ]			}		},		{			id : "pastHistoryOther",			xtype : "input",			setting : {				disabled : true,				caption : "其他既往病史描述",				maxlen : 50,				size : 50			}		},		{			id : "femeFamilyHistory",			xtype : "list",			setting : {				ds : "44",				multi : true,				save : "id",				mapping : {					value : "femeFamilyHistoryId"				},				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ "familyHistoryOther" ]			}		},		{			id : "familyHistoryOther",			xtype : "input",			setting : {				disabled : true,				caption : "其他家族病史描述",				maxlen : 50,				size : 50			}		},		{			id : "opshistory",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "opshistoryOther" ]			}		},		{			id : "opshistoryOther",			xtype : "input",			setting : {				disabled : true,				caption : "妇科手术史描述",				maxlen : 50,				size : 50			}		},		{			id : "pregnant1",			xtype : "input",			setting : {				format : "int",				maxlen : 10,				size : 15			}		},		{			id : "pregnant2",			xtype : "input",			setting : {				format : "int",				maxlen : 10,				size : 15			}		},		{			id : "pregnant3",			xtype : "input",			setting : {				format : "int",				maxlen : 10,				size : 15			}		},		{			id : "pregnant4",			xtype : "input",			setting : {				format : "int",				maxlen : 10,				size : 15			}		},		{			id : "pregnant5",			xtype : "input",			setting : {				format : "int",				maxlen : 10,				size : 15			}		},		{			id : "height",			xtype : "input",			setting : {				format : "num"			}		},		{			id : "weight",			xtype : "input",			setting : {				format : "num"			}		},		{			id : "habitus",			xtype : "input",			setting : {								maxlen : 30,				size : 5,				readonly : true,				asLabel : true			}	}, {			id : "diastolicPressure",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "systolicPressure",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam01",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "exam01other" ]			}		}, {			id : "exam01other",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "exam02",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "exam02other" ]			}		}, {			id : "exam02other",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "exam03",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "exam03other" ]			}		}, {			id : "exam03other",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "exam04",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "exam04other" ]			}		}, {			id : "exam04other",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "exam05",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "exam05other" ]			}		}, {			id : "exam05other",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "exam06",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "exam06other" ]			}		}, {			id : "exam06other",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "exam07",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "exam07other" ]			}		}, {			id : "exam07other",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "exam08",			xtype : "input",			setting : {						}		}, {			id : "exam09",			xtype : "input",			setting : {				format : "num",				size : 8			}		}, {			id : "exam10",			xtype : "input",			setting : {				format : "num",				size : 8			}		}, {			id : "exam11",			xtype : "input",			setting : {				maxlen : 30,				size : 30			}		}, {			id : "exam12",			xtype : "input",			setting : {				maxlen : 20,				size : 20			}		}, {			id : "exam13",			xtype : "input",			setting : {				maxlen : 20,				size : 20			}		}, {			id : "exam14",			xtype : "input",			setting : {				maxlen : 20,				size : 20			}		}, {			id : "exam15",			xtype : "input",			setting : {				maxlen : 20,				size : 20			}		}, {			id : "exam16",			xtype : "input",			setting : {				maxlen : 20,				size : 20			}		}, {			id : "exam17",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam18",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam19",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam20",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam21",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam22",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam23",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam24",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "exam25",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "femeSecretion",			xtype : "list",			setting : {				ds : "127",				multi : true,				save : "id",				mapping : {					value : "femeSecretionId"				},				forceNewline : true,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 5,				fields : [ "exam26other" ]			}		}, {			id : "exam26other",			xtype : "input",			setting : {				disabled : true,				caption : "其他分泌物描述",				maxlen : 20,				size : 20			}		}, {			id : "exam27",			xtype : "list",			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			}		}, {			id : "exam28",			xtype : "list",			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			}		}, {			id : "evaluation",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "beforeBornDirectOther" ]			}		}, {			id : "beforeBornDirectOther",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述"			}		}, {			id : "transfer",			xtype : "list",			setting : {				save : "isInputValue",				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "transReason", "transUnit" ]			}		}, {			id : "transReason",			xtype : "input",			setting : {				disabled : true,				caption : "原因",				maxlen : 30,				size : 30			}		}, {			id : "transUnit",			xtype : "input",			setting : {				disabled : true,				caption : "机构及科室",				maxlen : 30,				size : 30			}		}, {			id : "nextVisitDate",			xtype : "input",			setting : {				format : "date",				maxlen : 8,				size : 10			}		}, {			id : "visitDoctor",			xtype : "input",			setting : {				maxlen : 20,				size : 20			}		}, { 			id : "personalHistory",			xtype : "list",			setting : {				ds : "1300",				multi : true,				save : "id",				mapping : {					value : "personalHistoryId"				},				forceNewline : true,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 7,				fields : [ "personalHistoryOther" ]			}		}, { 			id : "personalHistoryOther",			xtype : "input",			setting : {				disabled : true,				caption : "其他个人病史描述",				maxlen : 50,				size : 50			}		}, { 			id : "bloodTypeAbo",			xtype : "list",			setting : {				ds : "115"			}		}, {			id : "bloodTypeRh",			xtype : "list",			setting : {				ds : "3",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "femeClean",			xtype : "list",			setting : {				ds : "1307"			}		}, { 			id : "hepatitis01",			xtype : "list",			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "hepatitis02",			xtype : "list",			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "hepatitis03",			xtype : "list",			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "hepatitis04",			xtype : "list",			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			}		}, { 			id : "hepatitis05",			xtype : "list",			setting : {				ds : "11",				isDefaultVal : true,				defaultVal : 0			}		}, {			id : "exam29",			xtype : "input",			setting : {				size : 50			}		}, { 			id : "bloodSugar",			xtype : "input",			setting : {				size : 20,				format : "num"			}		}, { 			id : "beforeBornCheckDirect",			xtype : "list",			setting : {				ds : "1347",				multi : true,				save : "id",				mapping : {					value : "beforeBornCheckDirectId"				},								newlineStep : 5			},			requires : {				valEq : 6,				fields : [ "beforeBornCheckDirectOther" ]			}		}, { 			id : "beforeBornCheckDirectOther",			xtype : "input",			setting : {				disabled : true,				caption : "其它指导",				maxlen : 10,				size : 10			}		}, { 			id : "highRisk",			xtype : "list",			setting : {				ds : "171",				isDefaultVal : true,				defaultVal : 1			},			requires : {				valEq : 1,				fields : [ "highRiskRemark", "highRiskSearch" ]			}		}, { 			id : "highRiskRemark",			xtype : "input",			setting : {				disabled : true,				size : 50			}		}, {			id : "highRiskSearch",			xtype : "input",			setting : {				disabled : true,				caption : "高危筛选",				maxlen : 30,				size : 14,				isFocus : true,				serviceType : 1,				isSpecial : true			}		}, {			id : "vacuumExtraction",			xtype : "input",			setting : {				format : "int",				size : 5			}		}, {			id : "forceps",			xtype : "input",			setting : {				format : "int",				size : 5			}		}, {			id : "breech",			xtype : "input",			setting : {				format : "int",				size : 5			}		}, {			id : "presentIllnessHistory",			xtype : "input",			setting : {				size : 80			}		}, {			id : "menarcheAge",			xtype : "input",			setting : {				format : "int",				size : 10			}		}, {			id : "cycleOne",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "cycleTwo",			xtype : "input",			setting : {				format : "num",				size : 10			}		}, {			id : "endChildbirthDate",			xtype : "input",			setting : {				format : "date",				maxlen : 8,				size : 10			}		}, {			id : "heartRate",			xtype : "input",			setting : {				format : "int",				size : 10			}		}, {			id : "breathingRate",			xtype : "input",			setting : {				format : "int",				size : 10			}		}, {			id : "liver",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "liverOther" ]			}		}, {			id : "liverOther",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "spleen",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "spleenOther" ]			}		}, {			id : "spleenOther",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "breast",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "breastOther" ]			}		}, {			id : "breastOther",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "otherExam",			xtype : "list",			setting : {				ds : "96",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ "otherExamOther" ]			}		}, {			id : "otherExamOther",			xtype : "input",			setting : {				disabled : true,				caption : "异常描述",				maxlen : 20,				size : 20			}		}, {			id : "hivdetectDate",			xtype : "input",			setting : {			    maxlen : 8,				format : "date"			}		}, {			id : "syphilisDetectDate",			xtype : "input",			setting : {			    maxlen : 8,				format : "date"			}		}, {			id : "hepatitisBdetectDate",			xtype : "input",			setting : {			    maxlen : 8,				format : "date"			}		}, {			id : "diagnosisRemark",			xtype : "input",			setting : {				size : 40			}		}, {			id : "complicationHistory",			xtype : "input",			setting : {				size : 30			}		}, {			id : "survivalMale",			xtype : "input",			setting : {				size : 15,				format : "int"			}		}, {			id : "survivalFemale",			xtype : "input",			setting : {				size : 15,				format : "int"			}		}, {			id : "prematureBirth",			xtype : "input",			setting : {				size : 15,				format : "int"			}		}, {			id : "endAbortionDate",			xtype : "input",			setting : {			    maxlen : 8,				format : "date"			}		}, {			id : "contraceptiveHistory",			xtype : "list",			setting : {				ds : "2004",				multi : true,				save : "id",				mapping : {					value : "contraceptiveId"				},				forceNewline : true			},			requires : {				valEq : 6,				fields : [ "contraceptiveHistoryOther" ]			}		}, {			id : "contraceptiveHistoryOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 50,				size : 50			}		}, {			id : "foreignId",			xtype : "input"		}];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var womanExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="10"><span					style="font-size: 20px; font-weight: bolder;">第1次产前随访服务记录表</span></td>			</tr>			<tr>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span></td>				<td colspan="3"><span class="Name"></span></td>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">编号：</span></td>				<td colspan="4"><span class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">填表日期</td>				<td><span class="visitDate"></span></td>				<td class="header">填表孕周</td>				<td colspan="3"><span class="weeks"></span>周</td>			</tr>			<tr>				<td class="header">孕妇年龄</td>				<td colspan="5"><span class="bornAge"></span>岁</td>			</tr>			<tr>				<td class="header">丈夫姓名</td>				<td><span class="husbandName"></span></td>				<td class="header">丈夫年龄</td>				<td><span class="husbandAge"></span></td>				<td class="header">丈夫电话</td>				<td><span class="husbandTel"></span></td>			</tr>			<tr>				<td class="header">孕 次</td>				<td><span class="gravidity"></span></td>				<td class="header">产 次</td>				<td colspan="3">阴道分娩<span class="parity"></span>次&nbsp;&nbsp;剖宫产<span					class="parity1"></span>次				</td>			</tr>			<tr>				<td class="header">末次月经</td>				<td><span class="lastMenses"></span></td>				<td class="header">预 产 期</td>				<td colspan="3"><span class="edc"></span></td>			</tr>			<tr>				<td class="header">既往史</td>				<td colspan="5"><span class="femePastHistory"></span><span					class="pastHistoryOther"></span></td>			</tr>			<tr>				<td class="header">家族史</td>				<td colspan="5"><span class="femeFamilyHistory"></span><span					class="familyHistoryOther"></span></td>			</tr>			<tr>				<td class="header">个人史</td>				<td colspan="5"><span class="personalHistory"></span><span					class="personalHistoryOther"></span></td>			</tr>			<tr>				<td class="header">妇科手术史</td>				<td colspan="5"><span class="opshistory"></span><span					class="opshistoryOther"></span></td>			</tr>			<tr>				<td class="header">孕产史</td>				<td colspan="5">1.流产<span class="pregnant1"></span>次&nbsp; 2.死胎<span					class="pregnant2"></span>次&nbsp; 3.死产<span class="pregnant3"></span>次&nbsp;					4.新生儿死亡<span class="pregnant4"></span>次&nbsp; 5.出生缺陷儿<span					class="pregnant5"></span>次&nbsp;				</td>			</tr>			<tr>				<td class="header">身 高</td>				<td colspan="2"><span class="height"></span>cm</td>				<td class="header">体重</td>				<td colspan="2"><span class="weight"></span>kg</td>			</tr>			<tr>				<td class="header">体质指数</td>				<td colspan="2"><span class="habitus"></span></td>				<td class="header">血压</td>				<td colspan="2"><span class="diastolicPressure"></span>/<span					class="systolicPressure"></span>mmHg</td>			</tr>			<tr>				<td class="header">听诊</td>				<td colspan="2">心脏：<span class="heartRate"></span><span					class="exam01"></span><span class="exam01other"></span></td>				<td colspan="3">肺部：<span class="breathingRate"></span><span					class="exam02"></span><span class="exam02other"></span></td>			</tr>			<tr>				<td class="header" rowspan="3">妇科检查</td>				<td colspan="2">外阴：<span class="exam03"></span><span					class="exam03other"></span></td>				<td colspan="3">阴道：<span class="exam04"></span><span					class="exam04other"></span></td>			</tr>			<tr>				<td colspan="2">宫颈：<span class="exam05"></span><span					class="exam05other"></span></td>				<td colspan="3">子宫：<span class="exam06"></span><span					class="exam06other"></span></td>			</tr>			<tr>				<td colspan="5">附件：<span class="exam07"></span><span					class="exam07other"></span></td>			</tr>			<tr>				<td class="header" rowspan="16">辅助检查</td>				<td><div>血常规</div></td>				<td colspan="4">血红蛋白值<span class="exam08"></span>g/L <br />					白细胞计数值<span class="exam09"></span>×10<sup>9</sup>/L 血小板计数值<span					class="exam10"></span>×10<sup>9</sup>/L <br />其他<span					class="exam11"></span></td>			</tr>			<tr>				<td><div>尿常规*</div></td>				<td colspan="4">尿蛋白 <span class="exam12"></span> 尿糖 <span					class="exam13"></span> <br /> 尿酮体 <span class="exam14"></span> 尿潜血					<span class="exam15"></span> <br />其他 <span class="exam16"></span>				</td>			</tr>			<tr>				<td rowspan="2">血型</td>				<td colspan="4"><span class="bloodTypeAbo"></span></td>			</tr>			<tr>				<td colspan="4">RH阴性*:<span class="bloodTypeRh"></span></td>			</tr>			<tr>				<td>血糖*</td>				<td colspan="4"><span class="bloodSugar"></span>mmol/L</td>			</tr>			<tr>				<td>肝功能*</td>				<td colspan="4">血清谷丙转氨酶 <span class="exam17"></span> U/L					血清谷草转氨酶 <span class="exam18"></span> U/L<br /> 白蛋白 <span					class="exam19"></span> g/L 总胆红素 <span class="exam20"></span> μmol/L<br />					结合胆红素 <span class="exam21"></span> μmol/L				</td>			</tr>			<tr>				<td>肾功能*</td>				<td colspan="4">血清肌酐 <span class="exam22"></span> μmol/L 血尿素氮 <span					class="exam23"></span> mmol/L <br /> 血钾浓度 <span class="exam24"></span>					mmol/L 血钠浓度 <span class="exam25"></span> mmol/L				</td>			</tr>			<tr>				<td rowspan="2">阴道分泌物*</td>				<td colspan="4"><span class="femeSecretion"></span><span					class="exam26other"></span></td>			</tr>			<tr>				<td colspan="4">阴道清洁度：<span class="femeClean"></span></td>			</tr>			<tr>				<td rowspan="4">乙型肝炎五项</td>				<td style="width: 140px;">乙型肝炎表面抗原</td>				<td><span class="hepatitis01"></span></td>				<td>乙型肝炎表面抗体</td>				<td><span class="hepatitis02"></span></td>			</tr>			<tr>				<td>乙型肝炎e抗原</td>				<td><span class="hepatitis03"></span></td>				<td>乙型肝炎e抗体</td>				<td><span class="hepatitis04"></span></td>			</tr>			<tr>				<td>乙型肝炎核心抗体</td>				<td colspan="3"><span class="hepatitis05"></span></td>			</tr>			<tr>				<td class="header">乙肝病源学检测时间</td>				<td colspan="3" class="hepatitisBdetectDate"></td>			</tr>			<tr>				<td>梅毒血清学试验*</td>				<td colspan="4"><span class="exam27"></span></td>			</tr>			<tr>				<td>HIV抗体检测*</td>				<td colspan="4"><span class="exam28"></span></td>			</tr>			<tr>				<td>B超*</td>				<td colspan="4"><span class="exam29"></span></td>			</tr>			<tr>				<td class="header">总体评估</td>				<td colspan="5"><span class="evaluation"></span><span					class="beforeBornDirectOther"></span></td>			</tr>			<tr>				<td class="header">总体评估诊断</td>				<td colspan="5"><span class="diagnosisRemark"></span></td>			</tr>			<tr>				<td class="header">保健指导</td>				<td colspan="5"><span class="beforeBornCheckDirect"></span><span					class="beforeBornCheckDirectOther"></span></td>			</tr>			<tr>				<td class="header">转诊</td>				<td colspan="5"><span class="transfer"></span><span					class="transReason"></span><span class="transUnit"></span></td>			</tr>			<tr>				<td class="header" style="border-bottom: 1px solid #000;">下次随访日期</td>				<td colspan="2" style="border-bottom: 1px solid #000;"					class="nextVisitDate"></td>				<td class="header" style="border-bottom: 1px solid #000;">随访医生签名</td>				<td colspan="2" style="border-bottom: 1px solid #000;"><span					class="visitDoctor"></span></td>			</tr>		</tbody>	</table></div>';
	getWomanFirstVisitExamInfomation(dsArray,id,womanExamHtml);
}
function getWomanFirstVisitExamInfomation(dsArray,id,womanExamHtml) {

	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(womanExamHtml);
			console.log(window.cfg);
			console.log(data);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							if(id == 'exam01'){
								console.log(values);
								console.log(basicValue);
							}
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
//			var fileNo = $('.personId').html();
			var cond = {id : id};
//			console.log(cond);
			FileNumSearch.getHealthFileInfoByWorkId('4',id,function(d){
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
			});
			
			FirstVistBeforeBornService.get(cond,function(d){
				if(d != null){
					console.dir(d);
					$.each(d,function(k,v){
						$(window.cfg).each(function(_i, _v) {
							var id = _v.id;
							if (_v.xtype == 'list') {
								if(id == k){
									var ds = _v.setting.ds;
									var listValues = [];
									if(_v.setting.multi != undefined && _v.setting.multi){
										$(v).each(function() {
											$.each($(this)[0],function(_vi,_vv){
												$.each(data, function(key, values) {
													if(ds == key){
														$.each(values,function(){
															if(_vv == $(this)[0].id){
																listValues.push($(this)[0].number);
															}
														});
													}
												});
											});
										});
									}else{
										$.each(data, function(key, values) {
											if(ds == key){
												$.each(values,function(){
													if(v == $(this)[0].name || (v + 1) == $(this)[0].number){
														listValues.push($(this)[0].number);
													}
												});
											}
										});
									}
									
//									var lvs = listValues.split('');
									var lvsHtml = '';
									if(listValues.length != 0){
										$(listValues).each(function(_bi,_bv){
											if(_bv == null) _bv = '';
											lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
										});
									}else{
										lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
									}
									
									if(lvsHtml != ''){
										lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
									}
									$('.' + id).parent('td').append(lvsHtml);
								}
								
							}else if(_v.xtype == 'input'){
								if(k == id){
									if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
										if(id == 'visitDate' || id == 'nextVisitDate' || id == 'lastMenses' || id == 'edc'){
											$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
										}else{
											$('.' + id).html(v);
										}
									}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
										if(id == 'transReason'){
											$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else if(id == 'transUnit'){
											$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else{
											$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}
										
									}else if(v != '' && v != null){
										if(id == 'fileNo'){
											//...
										}else{
											$('.' + id).html(v);
										}
										
									}
									
								}
							}
						});
					});
//					console.log($('#printInformationContaint').html());
					printObj.printHTML($('#printInformationContaint').html(),'第1次产前随访','12.99cm','30.8cm');
				}
				
			});
		}
	});

}
/**
 * 第2~5次产前随访
 */
PrintHealthFileAndExamClass.prototype.printVisitBeforeBornExam = function(id){
	var dsArray = [];
	window.cfg = [	{	id : "name",	xtype : "input",	setting : {		size : 10,		showOnly : true,		readonly : true	}}, {	id : "districtNumber",	xtype : "input",	setting : {		showOnly : true,		asLabel : true	}}, {	id : "fileNo",	xtype : "combo",	setting : {		ds : {			search : FileNumSearch.listCodePage,			get : FileNumSearch.getItem		},		local : false,		width : 100,		model : {			id : 0,			code : 0,			display : 1		},		showDisplay : false,		roWhenSet : true,		writeback : [ {			id : "name",			col : 1		}, {			id : "barCode",			col : 6		},{			id : "foreignId",			col : 8		} ],		showHistoryRecord : {			foreignIdCol : 8,			foreignIdName : 'foreignId'		},		mCodePrefixCtrlId : 'districtNumber',		displayCols : [ 1, 2, 3, 7,9 ],		displayColNames : [ "编号", "疾病", "", "地址","建册时间" ]	},	required : [ true, "编号" ]}, {	id : "barCode",	xtype : "input",	setting : {		showOnly : true,		readonly : true	}}, {	id : "item",	xtype : "input",	setting : {		width : 50,		format : 'int',		womanItem : true,		fileInput : [ 'foreignId input', 'showItemInfo', 'nextVisitDate' ]	},	required : [ true, "项目" ]}, {	id : "visitDate",	xtype : "input",	setting : {		format : 'date',		maxlen : 8,		size : 10,		defaultVal : new Date()	}}, {	id : "weeks",	xtype : "input"}, {	id : "cc",	xtype : "input"}, {	id : "weight",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "exam01",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "exam02",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "exam03",	xtype : "input"}, {	id : "diastolicPressure",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "systolicPressure",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "exam04",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "exam05",	xtype : "input"}, {	id : "exam06",	xtype : "input"}, {	id : "result",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "resultOther" ]	}}, {	id : "resultOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "beforeBornDirect",	xtype : "list",	setting : {		ds : "159",		multi : true,		save : "id",		mapping : {			value : 'beforeBornDirectId'		},		forceNewline : true	},	requires : {		valEq : 8,		fields : [ "beforeBornDirectOther" ]	}}, {	id : "beforeBornDirectOther",	xtype : "input",	setting : {		disabled : true,		caption : "其它"	}}, {	id : "transfer",	xtype : "list",	setting : {		save : "isInputValue",		ds : "151",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "transReason", "transUnit" ]	}}, {	id : "transReason",	xtype : "input",	setting : {		disabled : true,		size : "10",		caption : "原因"	}}, {	id : "transUnit",	xtype : "input",	setting : {		disabled : true,		caption : "机构及科室"	}}, {	id : "nextVisitDate",	xtype : "input",	setting : {		format : 'date',		maxlen : 8,		size : 10	}}, {	id : "visitDoctor",	xtype : "input"}, { 	id : "exam07",	xtype : "input"}, {	id : "highRisk",	xtype : "list",	setting : {		ds : "171",		isDefaultVal : true,		defaultVal : 1	},	requires : {		valEq : 1,		fields : [ 'highRiskRemark', 'highRiskSearch' ]	}}, { 	id : "highRiskRemark",	xtype : "input",	setting : {		disabled : true,		size : 50	}}, { 	id : "highRiskSearch",	xtype : "input",	setting : {		disabled : true,		caption : "高危筛选",		maxlen : 30,		size : 14,		isFocus : true,		serviceType : 1,		isSpecial : true	}}/*, {	id : "gravidity",	xtype : "input",	setting : {		format : 'int',		size : 10,		gravidityEvent : {			fileNo : 'fileNo span',			tableName : 'VisitBeforeBorn'		}	},	required : [ true, "孕次" ]}*/, {	id : "edema",	xtype : "input"}, {	id : "diagnosisRemark",	xtype : "input",	setting : {		size : 40	}}, {	id : "bornBirthAddressPlan",	xtype : "list",	setting : {		ds : "2003"	}}, {	id : "pelvis01",	xtype : "input",	setting : {		format : "num"	}}, {	id : "pelvis02",	xtype : "input",	setting : {		format : "num"	}}, {	id : "pelvis03",	xtype : "input",	setting : {		format : "num"	}}, {	id : "pelvis04",	xtype : "input",	setting : {		format : "num"	}}, {	id : "foreignId",	xtype : "input"}];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var womanExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="10"><span					style="font-size: 20px; font-weight: bolder;">第2～5次产前随访服务记录表</span></td>			</tr>			<tr>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span></td>				<td><span class="Name"></span></td>				<td><span					style="font-size: 16px; font-weight: bolder;">编号：</span><span class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td colspan="2" class="header">项 目</td>				<td>第<span class="item"></span>次</td>			</tr>			<tr>				<td colspan="2" class="header">随访日期</td>				<td><span class="visitDate"></span></td>			</tr>			<tr>				<td colspan="2" class="header">孕周(周)</td>				<td><span class="weeks"></span></td>			</tr>			<tr>				<td colspan="2" class="header">主 诉</td>				<td><span class="cc"></span></td>			</tr>			<tr>				<td colspan="2" class="header">体重 （kg）</td>				<td><span class="weight"></span></td>			</tr>			<tr>				<td class="header" rowspan="4">产<br />科<br />检<br />查				</td>				<td class="header">宫底高度（cm）</td>				<td><span class="exam01"></span></td>			</tr>			<tr>				<td class="header">腹围（cm）</td>				<td><span class="exam02"></span></td>			</tr>			<tr>				<td class="header">胎位</td>				<td><span class="exam07"></span></td>			</tr>			<tr>				<td class="header">胎心率（次/分钟）</td>				<td><span class="exam03"></span></td>			</tr>			<tr>				<td colspan="2" class="header">血压（mmHg）</td>				<td><span class="diastolicPressure"></span>/<span					class="systolicPressure"></span></td>			</tr>			<tr>				<td colspan="2" class="header">血红蛋白值（g/L）				</td>				<td><span class="exam04"></span></td>			</tr>			<tr>				<td colspan="2" class="header">尿蛋白*				</td>				<td><span class="exam05"></span></td>			</tr>			<tr>				<td colspan="2" class="header">其他辅助检查*</td>				<td><span class="exam06"></span></td>			</tr>			<tr>				<td colspan="2" class="header">分 类</td>				<td><span class="result"></span><span class="resultOther"></span></td>			</tr>			<tr>				<td colspan="2" class="header">指 导</td>				<td><span class="beforeBornDirect"></span><span					class="beforeBornDirectOther"></span></td>			</tr>			<tr>				<td colspan="2" class="header">转 诊</td>				<td><span class="transfer"></span><span					class="transReason"></span><span class="transUnit"></span></td>			</tr>			<tr>				<td style="border-bottom: 1px #000 solid;" colspan="2" class="header">下次随访日期</td>				<td style="border-bottom: 1px #000 solid;" ><span class="nextVisitDate"></span></td>			</tr>			<tr>				<td style="border-bottom: 1px #000 solid;"  colspan="2" class="header">随访医生签名</td>				<td style="border-bottom: 1px #000 solid;" ><span class="visitDoctor"></span></td>			</tr>		</tbody>	</table></div>';
	getWomanVisitBeforeBornExamInfomation(dsArray,id,womanExamHtml);
}
function getWomanVisitBeforeBornExamInfomation(dsArray,id,womanExamHtml) {

	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(womanExamHtml);
			console.log(window.cfg);
			console.log(data);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
//			var fileNo = $('.personId').html();
			var cond = {id : id};
//			console.log(cond);
			FileNumSearch.getHealthFileInfoByWorkId('5',id,function(d){
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
			});
			
			VisitBeforeBornService.get(cond,function(d){
				if(d != null){
					console.dir(d);
					$.each(d,function(k,v){
						$(window.cfg).each(function(_i, _v) {
							var id = _v.id;
							if (_v.xtype == 'list') {
								if(id == k){
									var ds = _v.setting.ds;
									var listValues = [];
									if(_v.setting.multi != undefined && _v.setting.multi){
										$(v).each(function() {
											$.each($(this)[0],function(_vi,_vv){
												$.each(data, function(key, values) {
													if(ds == key){
														$.each(values,function(){
															if(_vv == $(this)[0].id){
																listValues.push($(this)[0].number);
															}
														});
													}
												});
											});
										});
									}else{
										$.each(data, function(key, values) {
											if(ds == key){
												$.each(values,function(){
													if(v == $(this)[0].name || (v + 1) == $(this)[0].number){
														listValues.push($(this)[0].number);
													}
												});
											}
										});
									}
									
//									var lvs = listValues.split('');
									var lvsHtml = '';
									if(listValues.length != 0){
										$(listValues).each(function(_bi,_bv){
											if(_bv == null) _bv = '';
											
											lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
										});
									}else{
										lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
									}
									
									if(lvsHtml != ''){
										lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
									}
									$('.' + id).parent('td').append(lvsHtml);
									console.log(id);
								}
								
							}else if(_v.xtype == 'input'){
								if(k == id){
									if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
										if(id == 'visitDate' || id == 'nextVisitDate'){
											$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
										}else{
											$('.' + id).html(v);
										}
									}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
										if(id == 'transReason'){
											$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else if(id == 'transUnit'){
											$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else{
											$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}
										
									}else if(v != '' && v != null){
										if(id == 'fileNo'){
											//...
										}else{
											
											$('.' + id).html(v);
										}
										
									}
									
								}
							}
						});
					});
//					console.log($('#printInformationContaint').html());
					printObj.printHTML($('#printInformationContaint').html(),'第2~5次产前随访','12.99cm','30.8cm');
				}
				
			});
		}
	});

}
/**
 * 产后访视
 */
PrintHealthFileAndExamClass.prototype.printVisitAfterBornExam = function(id){
	var dsArray = [];
	window.cfg = [	{	id : "name",	xtype : "input",	setting : {		showOnly : true,		readonly : true,		width : 60	}}, {	id : "districtNumber",	xtype : "input",	setting : {		showOnly : true,		asLabel : true	}}, {	id : "fileNo",	xtype : "combo",	setting : {		ds : {			search : FileNumSearch.listCodePage,			get : FileNumSearch.getItem		},		local : false,		width : 100,		model : {			id : 0,			code : 0,			display : 1		},		showDisplay : false,		roWhenSet : true,		writeback : [ {			id : "name",			col : 1		}, {			id : "barCode",			col : 6		},{			id : "foreignId",			col : 8		} ],		mCodePrefixCtrlId : 'districtNumber',		displayCols : [ 1, 2, 3, 7 ],		displayColNames : [ "编号", "疾病", "", "" ]	},	required : [ true, "编号" ]}, {	id : "barCode",	xtype : "input",	setting : {		showOnly : true,		readonly : true	}}, {	id : "item",	xtype : "list",	setting : {		ds : "1478",		isDefaultVal : true,		defaultVal : 0	}}, {	id : "visitDate",	xtype : "input",	setting : {		format : 'date',		maxlen : 8,		defaultVal : new Date()	},	required : [ true, "随访日期" ]}, {	id : "bodyHeat",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "health",	xtype : "input"}, {	id : "mind",	xtype : "input"}, {	id : "diastolicPressure",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "systolicPressure",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "breast",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "breastOther" ]	}}, {	id : "breastOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "lochia",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "lochiaOther" ]	}}, {	id : "lochiaOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "metra",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "metraOther" ]	}}, {	id : "metraOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "wound",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "woundOther" ]	}}, {	id : "woundOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "other",	xtype : "input"}, {	id : "result",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "resultOther" ]	}}, {	id : "resultOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "afterBornDirect",	xtype : "list",	setting : {		ds : "160",		multi : true,		save : "id",		newlineStep : 5,		mapping : {			value : 'afterBornDirectId'		}	},	requires : {		valEq : 6,		fields : [ "afterBornDirectOther" ]	}}, {	id : "afterBornDirectOther",	xtype : "input",	setting : {		disabled : true,		caption : "其它指导"	}}, {	id : "transfer",	xtype : "list",	setting : {		save : "isInputValue",		ds : "151",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "transReason", "transUnit" ]	}}, {	id : "transReason",	xtype : "input",	setting : {		disabled : true,		caption : "原因"	}}, {	id : "nextVisitDate",	xtype : "input",	setting : {		format : 'date',		maxlen : 8,	}}, {	id : "transUnit",	xtype : "input",	setting : {		disabled : true,		caption : "机构及科室"	}}, {	id : "visitDoctor",	xtype : "input"}, {	id : "recordType",	xtype : 'input',	setting : {		disabled : true,		defaultVal : "0"	}},{	id : "pulseRate",	xtype : "input",	setting : {		format : 'int'	}}, {	id : "milk",	xtype : "list",	setting : {		ds : "2001"	}}, {	id : "swelling",	xtype : "list",	setting : {		ds : "151"	}}, {	id : "nipple",	xtype : "list",	setting : {		ds : "151"	}},{	id : "palaceHeight",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "woundHealing",	xtype : "list",	setting : {		ds : "2002"	}}, {	id : "foreignId",	xtype : "input"}];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var womanExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="10"><span					style="font-size: 20px; font-weight: bolder;">产后访视记录表</span></td>			</tr>			<tr>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span></td>				<td><span class="Name"></span></td>				<td><span style="font-size: 16px; font-weight: bolder;">编号：</span><span					class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">项目</td>				<td><span class="item"></span></td>								<td>随访日期：<span class="visitDate"></span></td>			</tr>			<tr>				<td class="header">体温</td>				<td colspan="2"><span class="bodyHeat"></span>℃</td>			</tr>			<tr>				<td class="header">一般健康情况</td>				<td colspan="2"><span class="health"></span></td>			</tr>			<tr>				<td class="header">一般心理状况</td>				<td colspan="2"><span class="mind"></span></td>			</tr>			<tr>				<td class="header">血压</td>				<td id="bloodPressure" colspan="2"><span class="diastolicPressure"></span>/<span					class="systolicPressure"></span>mmHg</td>			</tr>			<tr>				<td class="header">乳房</td>				<td colspan="2"><span class="breast"></span><span class="breastOther"></span></td>			</tr>			<tr>				<td class="header">恶露</td>				<td colspan="2"><span class="lochia"></span><span class="lochiaOther"></span></td>			</tr>			<tr>				<td class="header">子宫</td>				<td colspan="2"><span class="metra"></span><span class="metraOther"></span></td>			</tr>			<tr>				<td class="header">伤口</td>				<td colspan="2"><span class="wound"></span><span class="woundOther"></span></td>			</tr>			<tr>				<td class="header">其他</td>				<td colspan="2"><span class="other"></span></td>			</tr>			<tr>				<td class="header">分类</td>				<td colspan="2"><span class="result"></span><span class="resultOther"></span></td>			</tr>			<tr>				<td class="header">指导</td>				<td colspan="2"><span class="afterBornDirect"></span><br /> <span					class="afterBornDirectOther"></span></td>			</tr>			<tr>				<td class="header">转诊</td>				<td colspan="2"><span class="transfer"></span><span					class="transReason"></span><span class="transUnit"></span></td>			</tr>			<tr>				<td class="header">下次随访日期</td>				<td colspan="2"><span class="nextVisitDate"></span></td>			</tr>			<tr>				<td style="border-bottom: 1px #000 solid;" class="header">随访医生签名</td>				<td style="border-bottom: 1px #000 solid;" class="visitDoctor"					colspan="2"></td>			</tr>		</tbody>	</table></div>';
	getWomanVisitAfterBornExamInfomation(dsArray,id,womanExamHtml);
}
function getWomanVisitAfterBornExamInfomation(dsArray,id,womanExamHtml) {

	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(womanExamHtml);
			console.log(window.cfg);
			console.log(data);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
//			var fileNo = $('.personId').html();
			var cond = {id : id};
//			console.log(cond);
			FileNumSearch.getHealthFileInfoByWorkId('6',id,function(d){
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
			});
			
			VisitAfterBornService.get(cond,function(d){
				if(d != null){
					console.dir(d);
					$.each(d,function(k,v){
						$(window.cfg).each(function(_i, _v) {
							var id = _v.id;
							if (_v.xtype == 'list') {
								if(id == k){
									var ds = _v.setting.ds;
									var listValues = [];
									if(_v.setting.multi != undefined && _v.setting.multi){
										$(v).each(function() {
											$.each($(this)[0],function(_vi,_vv){
												$.each(data, function(key, values) {
													if(ds == key){
														$.each(values,function(){
															if(_vv == $(this)[0].id){
																listValues.push($(this)[0].number);
															}
														});
													}
												});
											});
										});
									}else{
										$.each(data, function(key, values) {
											if(ds == key){
												$.each(values,function(){
													if(v == $(this)[0].name || (v + 1) == $(this)[0].number){
														listValues.push($(this)[0].number);
													}
												});
											}
										});
									}
									
//									var lvs = listValues.split('');
									var lvsHtml = '';
									if(listValues.length != 0){
										$(listValues).each(function(_bi,_bv){
											if(_bv == null) _bv = '';
											lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
										});
									}else{
										lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
									}
									
									if(lvsHtml != ''){
										lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
									}
									$('.' + id).parent('td').append(lvsHtml);
								}
								
							}else if(_v.xtype == 'input'){
								if(k == id){
									if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
										if(id == 'visitDate' || id == 'nextVisitDate'){
											$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
										}else{
											$('.' + id).html(v);
										}
									}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
										if(id == 'transReason'){
											$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else if(id == 'transUnit'){
											$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else{
											$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}
										
									}else if(v != '' && v != null){
										if(id == 'fileNo'){
											//...
										}else{
											$('.' + id).html(v);
										}
										
									}
									
								}
							}
						});
					});
//					console.log($('#printInformationContaint').html());
					printObj.printHTML($('#printInformationContaint').html(),'产后访视','12.99cm','30.8cm');
				}
				
			});
		}
	});

}
/**
 * 产后42访视
 */
PrintHealthFileAndExamClass.prototype.printVisitAfterBornExam42 = function(id){
	var dsArray = [];
	window.cfg = [	{	id : "name",	xtype : "input",	setting : {		showOnly : true,		readonly : true,		width : 60	}}, {	id : "districtNumber",	xtype : "input",	setting : {		showOnly : true,		asLabel : true	}}, {	id : "fileNo",	xtype : "combo",	setting : {		ds : {			search : FileNumSearch.listCodePage,			get : FileNumSearch.getItem		},		local : false,		width : 100,		model : {			id : 0,			code : 0,			display : 1		},		showDisplay : false,		roWhenSet : true,		writeback : [ {			id : "name",			col : 1		}, {			id : "barCode",			col : 6		},{			id : "foreignId",			col : 8		} ],		showHistoryRecordSingle : {			foreignIdCol : 8,			foreignIdName : 'foreignId'		},		mCodePrefixCtrlId : 'districtNumber',		displayCols : [ 1, 2, 3, 7 ],		displayColNames : [ "编号", "疾病", "", "" ]	},	required : [ true, "编号" ]}, {	id : "barCode",	xtype : "input",	setting : {		showOnly : true,		readonly : true	}}, {	id : "visitDate",	xtype : "input",	setting : {		format : 'date',		maxlen : 8,		size : 10,		defaultVal : new Date()	},	required : [ true, "随访日期" ]}, {	id : "health",	xtype : "input"}, {	id : "mind",	xtype : "input"}, {	id : "diastolicPressure",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "systolicPressure",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "breast",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "breastOther" ]	}}, {	id : "breastOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "lochia",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "lochiaOther" ]	}}, {	id : "lochiaOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "metra",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "metraOther" ]	}}, {	id : "metraOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "wound",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "woundOther" ]	}}, {	id : "woundOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "other",	xtype : "input"}, {	id : "result",	xtype : "list",	setting : {		ds : "161",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "resultOther" ]	}}, {	id : "resultOther",	xtype : "input",	setting : {		disabled : true,		caption : "未恢复描述"	}}, {	id : "afterBornDirect",	xtype : "list",	setting : {		ds : "139",		multi : true,		save : "id",		mapping : {			value : 'afterBornDirectId'		}	},	requires : {		valEq : 4,		fields : [ 'afterBornDirectOther' ]	}}, {	id : "afterBornDirectOther",	xtype : "input",	setting : {		disabled : true,		caption : "其他指导内容"	}}, {	id : "transfer",	xtype : "list",	setting : {		save : "isInputValue",		ds : "162",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "transReason", "transUnit" ]	}}, {	id : "transReason",	xtype : "input",	setting : {		disabled : true,		caption : "原因"	}}, {	id : "transUnit",	xtype : "input",	setting : {		disabled : true,		caption : "机构及科室"	}}, {	id : "visitDoctor",	xtype : "input"}, {	id : "recordType",	xtype : 'input',	setting : {		disabled : true,		defaultVal : "1"	}},{	id : "postnatalDays",	xtype : "input",	setting : {		format : 'int'	}}, {	id : "weight",	xtype : "input",	setting : {		format : 'num'	}}, {	id : "cervix",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "cervixOther" ]	}}, {	id : "cervixOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "attachment",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "attachmentOther" ]	}}, {	id : "attachmentOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "vulva",	xtype : "list",	setting : {		ds : "96",		isDefaultVal : true,		defaultVal : 0	},	requires : {		valEq : 2,		fields : [ "vulvaOther" ]	}}, {	id : "vulvaOther",	xtype : "input",	setting : {		disabled : true,		caption : "异常描述"	}}, {	id : "foreignId",	xtype : "input"}];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var womanExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="10"><span					style="font-size: 20px; font-weight: bolder;">产后42天健康检查记录表</span></td>			</tr>			<tr>				<td style="text-align: right;"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span><span class="Name"></span></td>				<td><span style="font-size: 16px; font-weight: bolder;">编号：</span><span					class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">随访日期</td>				<td><span class="visitDate"></span></td>			</tr>			<tr>				<td class="header">一般健康情况</td>				<td><span class="health"></span></td>			</tr>			<tr>				<td class="header">一般心理状况</td>				<td><span class="mind"></span></td>			</tr>			<tr>				<td align="center">血压</td>				<td><span class="diastolicPressure"></span>/<span					class="systolicPressure"></span>mmHg</td>			</tr>			<tr>				<td class="header">乳房</td>				<td><span class="breast"></span><span class="breastOther"></span></td>			</tr>			<tr>				<td class="header">恶露</td>				<td><span class="lochia"></span><span class="lochiaOther"></span></td>			</tr>			<tr>				<td class="header">子宫</td>				<td><span class="metra"></span><span class="metraOther"></span></td>			</tr>			<tr>				<td class="header">伤口</td>				<td><span class="wound"></span><span class="woundOther"></span></td>			</tr>			<tr>				<td class="header">其他</td>				<td><span class="other"></span></td>			</tr>			<tr>				<td class="header">分类</td>				<td><span class="result"></span><span class="resultOther"></span></td>			</tr>			<tr>				<td class="header">指导</td>				<td><span class="afterBornDirect"></span><span					class="afterBornDirectOther"></span></td>			</tr>			<tr>				<td class="header">处理</td>				<td><span class="transfer"></span><span					class="transReason"></span><span class="transUnit"></span></td>			</tr>			<tr>				<td style="border-bottom: 1px #000 solid;" class="header">随访医生签名</td>				<td style="border-bottom: 1px #000 solid;" colspan="2"					class="visitDoctor"></td>			</tr>		</tbody>	</table></div>';
	getWomanVisitAfterBornExamInfomation(dsArray,id,womanExamHtml);
}
/**
 * 高血压随访
 */
PrintHealthFileAndExamClass.prototype.printHypVisitExam = function(id){
	var dsArray = [];
	window.cfg = [	   {            id : "name",            xtype : "input",            setting : {              showOnly: true,              readonly : true            }        },        {          id : "districtNumber",          xtype : "input",          setting : {                           showOnly : true,              asLabel : true          }      },        {            id : "fileNo",            xtype : "combo",            setting : {                ds :  {search:FileNumSearch.listCodePage, get:FileNumSearch.getItem},                local : false,                width : 100,                model : {                    id : 0,                    code : 0,                    display : 1                },                showDisplay: false,                roWhenSet : true,                writeback : [{id:"name", col: 1},{id:"barCode", col: 6}],                mCodePrefixCtrlId : 'districtNumber',                displayCols : [1,2,3,7],                displayColNames : ["编号", "疾病", "", ""]            },            required : [true, "编号"]        },{            id : "barCode",            xtype : "input",            setting : {            	showOnly : true,                readonly : true            }          },        {            id : "visitDate",            xtype : "input",            setting : {                format: 'date',                maxlen : 8,                size : 10            },            required : [true, "随访日期"]        },        {            id : "visitKind",            xtype : "list",            setting : {                ds : "86"            }        },        {            id : "hypertensionSymptom",            xtype : "list",            setting : {                ds : "136",                multi : true,                save : "id",                mapping : {                  value : 'hypertensionSymptomId'                  },                forceNewline : true,                newlineStep : 7,                controlShow : 0,                isDefaultVal : true,                defaultVal : 0            },            requires : { valEq : 10 , fields : ["symptomOther"] }        },        {            id : "symptomOther",            xtype : "input",            setting : {               disabled : true,                caption: "症状其他描述"            }        },        {            id : "diastolicPressure",            xtype : "input",            setting: {              format: 'num'            }        },        {            id : "systolicPressure",            xtype : "input",            setting: {              format: 'num'            }        },        {            id : "weight",            xtype : "input",            setting: {              format: 'num'            }        },        {            id : "habitus",            xtype : "input",            setting: {              format: 'num'            }        },        {            id : "heartRate",            xtype : "input",            setting: {              format: 'int'            }        },        {            id : "other",            xtype : "input"        },        {            id : "smoke",            xtype : "input",            setting: {              format: 'int'            }        },        {            id : "drink",            xtype : "input"        },        {            id : "sportTimes",            xtype : "input",            setting: {              format: 'int',              size : 15            }        },        {            id : "sportDuration",            xtype : "input",            setting: {              format: 'int',              size : 15            }        },        {            id : "salt",            xtype : "list",            setting: {            	ds : "1343"            }        },        {            id : "mindStatus",            xtype : "list",            setting : {                ds : "104",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "action",            xtype : "list",            setting : {                ds : "147",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "assistantExam",            xtype : "input"        },        {            id : "compliance",            xtype : "list",            setting : {                ds : "18",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "adr",            xtype : "list",            setting : {                ds : "151",                isDefaultVal : true,                defaultVal : 0            },            requires : { valEq : 2 , fields : ["adrother"] }        },        {            id : "adrother",            xtype : "input",            setting : {               disabled : true,                caption: "不良反应描述"            }        },        {            id : "visitType",            xtype : "list",            setting : {                ds : "163",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "hypertensionMedications",            xtype : "grid",            setting : {                ds : "HypertensionMedications",                displayCols : ['drugName','usage', 'dosage'],                displayColNames : ["药物名称", "用法（次/日）", "用量（mg/次）"],                colXtypes : ['input', 'input', 'input'],                colSettings : [                    {},                    {},                    {}                ]            }        },        {            id : "transReason",            xtype : "input"        },        {            id : "transUnit",            xtype : "input"        },        {            id : "nextVistDate",            xtype : "input",            setting : {                format: 'date',                maxlen : 8,                size : 10            }        },        {            id : "visitDoctor",            xtype : "input"        }    ];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var hypVisitHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="10"><span					style="font-size: 20px; font-weight: bolder;">高血压患者随访服务记录表</span></td>			</tr>			<tr>				<td colspan="3"><span style="font-size: 16px; font-weight: bolder;">姓名：</span><span					class="Name"></span> <span style="font-size: 16px; font-weight: bolder;">编号：</span><span					class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">随访日期</td>				<td colspan="2"><span class="visitDate"></span></td>			</tr>			<tr>				<td class="header">随访方式</td>				<td colspan="2"><span class="visitKind"></span></td>			</tr>			<tr>				<td class="header">症状</td>				<td colspan="2"><span class="hypertensionSymptom"></span><span					class="symptomOther"></span></td>			</tr>			<tr>				<td class="header" rowspan="5">体征</td>				<td class="header">血压（mmHg）</td>				<td><span class="diastolicPressure"></span>/<span					class="systolicPressure"></span></td>			</tr>			<tr>				<td class="header">体重 （kg）</td>				<td><span class="weight"></span></td>			</tr>			<tr>				<td class="header">体质指数</td>				<td><span class="habitus"></span></td>			</tr>			<tr>				<td class="header">心 率</td>				<td><span class="heartRate"></span>次/分</td>			</tr>			<tr>				<td class="header">其 他</td>				<td><span class="other"></span></td>			</tr>			<tr>				<td class="header" rowspan="6">生活方式指导</td>				<td class="header">日吸烟量（支）</td>				<td><span class="smoke"></span></td>			</tr>			<tr>				<td class="header">日饮酒量（两）</td>				<td><span class="drink"></span></td>			</tr>			<tr>				<td class="header">运 动</td>				<td><span class="sportTimes"></span> 次/周 <span					class="sportDuration"></span> 分钟/次</td>			</tr>			<tr>				<td class="header">摄盐情况（咸淡）</td>				<td><span class="salt"></span></td>			</tr>			<tr>				<td class="header">心理调整</td>				<td><span class="mindStatus"></span></td>			</tr>			<tr>				<td class="header">遵医行为</td>				<td><span class="action"></span></td>			</tr>			<tr>				<td class="header">辅助检查*</td>				<td colspan="2"><span class="assistantExam"></span></td>			</tr>			<tr>				<td class="header">服药依从性</td>				<td colspan="2"><span class="compliance"></span></td>			</tr>			<tr>				<td class="header">药物不良反应</td>				<td colspan="2"><span class="adr"></span><span class="adrother"></span></td>			</tr>			<tr>				<td class="header">此次随访分类</td>				<td colspan="2"><span class="visitType"></span></td>			</tr>			<tr>				<td class="header">用药情况</td>				<td colspan="2" style="padding: 0px;"><div						class="hypertensionMedications"></div></td>			</tr>			<tr>				<td class="header" rowspan="2">转 诊</td>				<td><span class="transReason"></span></td>				<td></td>			</tr>			<tr>				<td>机构及科别</td>				<td><span class="transUnit"></span></td>			</tr>			<tr>				<td class="header">下次随访日期</td>				<td colspan="2" class="nextVistDate"></td>			</tr>			<tr>				<td style="border-bottom: 1px #000 solid;" class="header">随访医生签名</td>				<td colspan="2" style="border-bottom: 1px #000 solid;"					class="visitDoctor"></td>			</tr>		</tbody>	</table></div>';
	getHypVisitInfomation(dsArray,id,hypVisitHtml);
}
function getHypVisitInfomation(dsArray,id,hypVisitHtml) {
	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(hypVisitHtml);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
			FileNumSearch.getHealthFileInfoByWorkId('7',id,function(d){
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
			});
			
//			var fileNo = $('.personId').html();
			var cond = {id : id};
			HypertensionVisitService.get(cond,function(d){
				if(d != null){
					console.dir(d);
					$.each(d,function(k,v){
						$(window.cfg).each(function(_i, _v) {
							var id = _v.id;
							if (_v.xtype == 'list') {
								if(id == k){
									var ds = _v.setting.ds;
									var listValues = [];
									if(_v.setting.multi != undefined && _v.setting.multi){
										$(v).each(function() {
											$.each($(this)[0],function(_vi,_vv){
												$.each(data, function(key, values) {
													if(ds == key){
														$.each(values,function(){
															if(_vv == $(this)[0].id){
																listValues.push($(this)[0].number);
															}
														});
													}
												});
											});
										});
									}else{
										$.each(data, function(key, values) {
											if(ds == key){
												$.each(values,function(){
													if(v == $(this)[0].name){
														listValues.push($(this)[0].number);
													}
												});
											}
										});
									}
									
//									var lvs = listValues.split('');
									var lvsHtml = '';
									if(listValues.length != 0){
										$(listValues).each(function(_bi,_bv){
											if(_bv == null) _bv = '';
											lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
										});
									}else{
										lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
									}
									
									if(lvsHtml != ''){
										lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
									}
									$('.' + id).parent('td').append(lvsHtml);
								}
								
							}else if(_v.xtype == 'input'){
								if(k == id){
									
									if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
										if(id == 'visitDate' || id == 'nextVistDate'){
											$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
										}else{
											$('.' + id).html(v);
										}	
										
									}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
										if(id == 'transReason'){
											$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else if(id == 'transUnit'){
											$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}else{
											$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
										}
										
									}else if(v != '' && v != null){
										if(id == 'fileNo'){
											//...
										}else{
											$('.' + id).html(v);
										}
									}else if(v != null){
										$('.' + id).html(v);
									}
								}
							}else if(_v.xtype == 'grid'){
								if(id == k){
									if(id == 'hypertensionMedications'){
										var number = 1;
										var hypMedicationsTables = '<table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">';
										
										$(v).each(function(_di,_dv){
											console.log(_dv);
											hypMedicationsTables = hypMedicationsTables + '<tr>							<td style="width: 100px;">药物名称' + number + '</td>							<td colspan="2">' + _dv.drugName + '</td>						</tr>						<tr>							<td>用法用量</td>							<td>每日' + _dv.usage + '次</td>							<td>每次' + _dv.dosage + 'mg</td>						</tr>';
											number = number + 1;
										});
										while(number < 5){
											hypMedicationsTables = hypMedicationsTables + '<tr>							<td style="width: 100px;">药物名称' + number + '</td>							<td colspan="2"></td>						</tr>						<tr>							<td>用法用量</td>							<td></td>							<td></td>						</tr>';
											number = number + 1;
										}
										hypMedicationsTables = hypMedicationsTables + '</table>';
										console.log(hypMedicationsTables);
										$('.hypertensionMedications').html(hypMedicationsTables);
									}
								}
							}
						});
					});
//					console.log($('#printInformationContaint').html());
					printObj.printHTML($('#printInformationContaint').html(),'高血压随访','12.99cm','30.8cm');
				}
				
			});
		}
	});
}
/**
 * 糖尿病随访
 */
PrintHealthFileAndExamClass.prototype.printT2dmVisitExam = function(id){
	var dsArray = [];
	window.cfg = [	{            id : "name",            xtype : "input",            setting : {                maxlen : 18,                size : 18,                showOnly: true,                readonly : true,                width:60            }        },        {          id : "districtNumber",          xtype : "input",          setting : {                           showOnly : true,              asLabel : true          }      },        {            id : "fileNo",            xtype : "combo",            setting : {                ds :  {search:FileNumSearch.listCodePage, get:FileNumSearch.getItem},                local : false,                width : 100,                model : {                    id : 0,                    code : 0,                    display : 1                },                showDisplay: false,                roWhenSet : true,                writeback : [{id:"name", col: 1},{id:"barCode", col: 6}],                mCodePrefixCtrlId : 'districtNumber',                displayCols : [1,2,3,7],                displayColNames : ["编号", "疾病", "", ""]            },            required : [true, "编号"]        },{            id : "barCode",            xtype : "input",            setting : {            	showOnly : true,                readonly : true            }          },        {            id : "visitDate",            xtype : "input",            setting : {                format: "date",                maxlen: 8,                size : 10            },            required : [true, "随访日期"]         },        {            id : "visitKind",            xtype : "list",            setting : {            	ds : "86"            },            required : [true, "随访方式"]         },        {            id : "diabetesSymptom",            xtype : "list",            setting : {                ds : "164",                multi : true,                save : "id",                mapping : {                        value : 'diabetesSymptomId'                  },                newlineStep : 7,                controlShow : 0,                isDefaultVal : true,                defaultVal : 0            },            requires : { valEq : 10 , fields : ['symptomOther'] }        },        {            id : "symptomOther",            xtype : "input",            setting : {                maxlen : 50,                disabled : true,                size : 18,                caption : "其他症状描述"            }        },         {            id : "diastolicPressure",            xtype : "input",            setting : {              format: 'num',                size : 10            }        },         {            id : "systolicPressure",            xtype : "input",            setting : {              format: 'num',                size : 10            }        },        {            id : "weight",            xtype : "input",            setting : {              format: 'num',                size : 10            }        },        {            id : "habitus",            xtype : "input",            setting : {              format: 'num',                size : 10            }        },        {            id : "heartRate",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },         {            id : "exam06",            xtype : "list",            setting : {                ds : "165",                isDefaultVal : true,                defaultVal : 0            }        },         {            id : "other",            xtype : "input",            setting : {                maxlen : 50,                size : 10            }        },        {            id : "smoke",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },        {            id : "drink",            xtype : "input",            setting : {                maxlen : 20,                size : 10            }        },         {            id : "sportTimes",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },         {            id : "sportDuration",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },         {            id : "food",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },         {            id : "mindStatus",            xtype : "list",            setting : {                ds : "104",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "action",            xtype : "list",            setting : {                ds : "147",                isDefaultVal : true,                defaultVal : 0            }        },         {            id : "exam01",            xtype : "input",            setting : {              format: 'num',                size : 10            },            required : [true, "空腹血糖值"]         },        {            id : "exam02",            xtype : "input",            setting : {              format: 'num',                size : 10            }         },        {            id : "exam03",            xtype : "input",            setting : {                format: "date",                maxlen: 8,                size : 10            }        },        {            id : "exam04",            xtype : "input",            setting : {                maxlen : 50,                size : 10            }        },         {            id : "compliance",            xtype : "list",            setting : {                ds : "18",                isDefaultVal : true,                defaultVal : 0            }        },      {            id : "adr",            xtype : "list",            setting : {                ds : "151",                forceNewline : true,                isDefaultVal : true,                defaultVal : 0            },            requires : { valEq : 2 , fields : ['adrother'] }        },        {            id : "adrother",            xtype : "input",            setting : {                maxlen : 50,                disabled : true,                size : 18,                caption : "不良反应描述:"            }        },         {            id : "exam05",            xtype : "list",            setting : {                ds : "12",                isDefaultVal : true,                defaultVal : 0            }        },         {            id : "visitType",            xtype : "list",            setting : {                ds : "163",                isDefaultVal : true,                defaultVal : 0            }        },                  {            id : "diabetesMedications",            xtype : "grid",            setting : {                ds : "DiabetesMedications",                displayCols : ['drugName','usage', 'dosage'],                displayColNames : ["药物名称", "用法（次/日）", "用量（mg/次）"],                colXtypes : ['input', 'input', 'input'],                colSettings : [                    {},                    {},                    {}                ]            }        },         {            id : "transReason",            xtype : "input",            setting : {                maxlen : 30,                size : 30            }        },        {            id : "transUnit",            xtype : "input",            setting : {                maxlen : 30,                size : 30            }        },                 {            id : "nextVistDate",            xtype : "input",            setting : {                format: 'date',                size : 10,                maxlen : 8            }        },        {            id : "visitDoctor",            xtype : "input",            setting : {                maxlen : 30,                size : 10            }        }            ];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var t2dmVisitHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="3"><span					style="font-size: 20px; font-weight: bolder;">2型糖尿病患者随访服务记录表</span></td>			</tr>			<tr>				<td colspan="3"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span><span					class="Name"></span><span					style="font-size: 16px; font-weight: bolder;margin-left:10px;">编号：</span><span					class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">随访日期:</td>				<td colspan="2"><span class="visitDate"></span></td>			</tr>			<tr>				<td class="header">随访方式:</td>				<td colspan="2"><span class="visitKind"></span></td>			</tr>			<tr>				<td class="header">症状:</td>				<td colspan="2"><span class="diabetesSymptom"></span> <span					class="symptomOther"></span></td>			</tr>			<tr>				<td class="header" rowspan="5">体征:</td>				<td class="header">血压（mmHg）:</td>				<td><span class="diastolicPressure"></span>/<span					class="systolicPressure"></span>mmHg</td>			</tr>			<tr>				<td class="header">体重（kg）:</td>				<td><span class="weight"></span></td>			</tr>			<tr>				<td class="header">体质指数:</td>				<td><span class="habitus"></span></td>			</tr>			<tr>				<td class="header">足背动脉搏动:</td>				<td><span class="exam06"></span></td>			</tr>			<tr>				<td class="header">其他:</td>				<td><span class="other"></span></td>			</tr>			<tr>				<td class="header" rowspan="6">生活方式指导:</td>				<td class="header">日吸烟量:</td>				<td><span class="smoke"></span>支</td>			</tr>			<tr>				<td class="header">日饮酒量:</td>				<td><span class="drink"></span>两</td>			</tr>			<tr>				<td class="header">运动:</td>				<td><span class="sportTimes"></span> 次/周<span					class="sportDuration"></span>分钟/次</td>			</tr>			<tr>				<td class="header">主食（克/天）:</td>				<td><span class="food"></span></td>			</tr>			<tr>				<td class="header">心理调整:</td>				<td><span class="mindStatus"></span></td>			</tr>			<tr>				<td class="header">遵医行为:</td>				<td><span class="action"></span></td>			</tr>			<tr>				<td class="header" rowspan="2" id="assistantExam">辅助检查:</td>				<td class="header">空腹血糖值:</td>				<td><span class="exam01"></span> mmol/L(餐后)</td>			</tr>			<tr>				<td class="header">其他检查*:</td>				<td>糖化血红蛋白<span class="exam02"></span>% <br /> 检查日期：<span					class="exam03"></span><br /> 其他:<span class="exam04"></span>				</td>			</tr>			<tr>				<td class="header">服药依从性:</td>				<td colspan="2"><span class="compliance"></span></td>			</tr>			<tr>				<td class="header">药物不良反应:</td>				<td colspan="2"><span class="adr"></span> <span					class="adrother"></span></td>			</tr>			<tr>				<td class="header">低血糖反应:</td>				<td colspan="2"><span class="exam05"></span></td>			</tr>			<tr>				<td class="header">此次随访分类:</td>				<td colspan="2"><span class="visitType"></span></td>			</tr>			<tr>				<td class="header">用药情况:</td>				<td colspan="2"><div class="diabetesMedications"></div></td>			</tr>			<tr>				<td class="header" rowspan="2" id="transfer">转诊:</td>				<td class="header">原因:</td>				<td><span class="transReason"></span></td>			</tr>			<tr>				<td class="header">机构及科别:</td>				<td><span class="transUnit"></span></td>			</tr>			<tr>				<td class="header">下次随访日期:</td>				<td colspan="2"><span class="nextVistDate"></span></td>			</tr>			<tr>				<td class="header" style="border-bottom: 1px solid #000;">随访医生签名:</td>				<td colspan="2" style="border-bottom: 1px solid #000;"><span					class="visitDoctor"></span></td>			</tr>		</tbody>	</table></div>';
	getT2dmVisitInfomation(dsArray,id,t2dmVisitHtml);
}
function getT2dmVisitInfomation(dsArray,id,t2dmVisitHtml) {
	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(t2dmVisitHtml);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
			FileNumSearch.getHealthFileInfoByWorkId('8',id,function(d){
				console.log(d);
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
				
				var cond = {id : id};
				DiabetesVisitService.get(cond,function(d){
					if(d != null){
						console.dir(d);
						$.each(d,function(k,v){
							$(window.cfg).each(function(_i, _v) {
								var id = _v.id;
								if (_v.xtype == 'list') {
									if(id == k){
										var ds = _v.setting.ds;
										var listValues = [];
										if(_v.setting.multi != undefined && _v.setting.multi){
											$(v).each(function() {
												$.each($(this)[0],function(_vi,_vv){
													$.each(data, function(key, values) {
														if(ds == key){
															$.each(values,function(){
																if(_vv == $(this)[0].id){
																	listValues.push($(this)[0].number);
																}
															});
														}
													});
												});
											});
										}else{
											$.each(data, function(key, values) {
												if(ds == key){
													$.each(values,function(){
														if(v == $(this)[0].name){
															listValues.push($(this)[0].number);
														}
													});
												}
											});
										}
										
//										var lvs = listValues.split('');
										var lvsHtml = '';
										if(listValues.length != 0){
											$(listValues).each(function(_bi,_bv){
												if(_bv == null) _bv = '';
												lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
											});
										}else{
											lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
										}
										
										if(lvsHtml != ''){
											lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
										}
										$('.' + id).parent('td').append(lvsHtml);
									}
									
								}else if(_v.xtype == 'input'){
									if(k == id){
										
										if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
											if(id == 'visitDate' || id == 'nextVistDate'){
												$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
											}else{
												$('.' + id).html(v);
											}	
											
										}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
											if(id == 'transReason'){
												$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
											}else if(id == 'transUnit'){
												$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
											}else{
												$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
											}
											
										}else if(v != '' && v != null){
											if(id == 'fileNo'){
												//...
											}else{
												$('.' + id).html(v);
											}
										}else if(v != null){
											$('.' + id).html(v);
										}
									}
								}else if(_v.xtype == 'grid'){
									if(id == k){
										if(id == 'diabetesMedications'){
											var number = 1;
											var t2dmMedicationsTables = '<table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">';
											
											$(v).each(function(_di,_dv){
												console.log(_dv);
												t2dmMedicationsTables = t2dmMedicationsTables + '<tr>							<td style="width: 100px;">药物名称' + number + '</td>							<td colspan="2">' + _dv.drugName + '</td>						</tr>						<tr>							<td>用法用量</td>							<td>每日' + _dv.usage + '次</td>							<td>每次' + _dv.dosage + 'mg</td>						</tr>';
												number = number + 1;
											});
											while(number < 5){
												t2dmMedicationsTables = t2dmMedicationsTables + '<tr>							<td style="width: 100px;">药物名称' + number + '</td>							<td colspan="2"></td>						</tr>						<tr>							<td>用法用量</td>							<td></td>							<td></td>						</tr>';
												number = number + 1;
											}
											t2dmMedicationsTables = t2dmMedicationsTables + '</table>';
											console.log(t2dmMedicationsTables);
											$('.diabetesMedications').html(t2dmMedicationsTables);
										}
									}
								}
							});
						});
//						console.log($('#printInformationContaint').html());
						printObj.printHTML($('#printInformationContaint').html(),'2型糖尿病随访','12.99cm','30.8cm');
					}
					
				});
			});
			
//			var fileNo = $('.personId').html();
			
		}
	});
}

/**
 * 重性精神病随访
 */
PrintHealthFileAndExamClass.prototype.printFuriousVisitExam = function(id){
	var dsArray = [];
	window.cfg = [  {            id : "name",            xtype : "input",            setting : {                maxlen : 18,                size : 18,                showOnly: true,                readonly : true            }        },        {          id : "districtNumber",          xtype : "input",          setting : {                           showOnly : true,              asLabel : true          }      },        {            id : "fileNo",            xtype : "combo",            setting : {                ds :  {search:FileNumSearch.listCodePage, get:FileNumSearch.getItem},                local : false,                width : 100,                model : {                    id : 0,                    code : 0,                    display : 1                },                showDisplay: false,                roWhenSet : true,                writeback : [{id:"name", col: 1},{id:"barCode", col:6}],                mCodePrefixCtrlId : 'districtNumber',                displayCols : [1,2,3,7],                displayColNames : ["编号", "疾病", "", ""]            },            required : [true, "编号"]        },{            id : "barCode",            xtype : "input",            setting : {            	showOnly : true,                readonly : true            }          },        {          id : "visitDate",          xtype : "input",          setting : {              maxlen : 8,              format: 'date',              size : 10          }        },        {            id : "furiousVisitSymptom",            xtype : "list",            setting : {                ds : "59",                multi : true,                save : "id",                mapping : {                    value : 'furiousVisitSymptomId'                  },                forceNewline : true,                newlineStep : 7            },            requires : { valEq : 12 , fields : ['symptomOther'] }        },        {            id : "symptomOther",            xtype : "input",            setting : {                maxlen : 50,                disabled : true,                size : 18,                caption : "其他症状描述:"            }        },        {            id : "status01",            xtype : "list",            setting : {                ds : "143",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "status02",            xtype : "list",            setting : {                ds : "83",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "status03",            xtype : "list",            setting : {                ds : "131",                isDefaultVal : true,                defaultVal : 0            }        },         {            id : "status04",            xtype : "list",            setting : {                ds : "27",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "status05",            xtype : "list",            setting : {                ds : "43",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "status06",            xtype : "list",            setting : {                ds : "76",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "status07",            xtype : "list",            setting : {                ds : "113",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "status08",            xtype : "list",            setting : {                ds : "72",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "effect1",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },        {            id : "effect2",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },        {            id : "effect3",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },        {            id : "effect4",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },        {            id : "effect5",            xtype : "input",            setting : {              format: 'int',                size : 10            }        },        {            id : "examine",            xtype : "input",            setting : {                maxlen : 30,                size : 18            }        },        {            id : "compliance",            xtype : "list",            setting : {                ds : "18",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "adr",            xtype : "list",            setting : {                ds : "151",                isDefaultVal : true,                defaultVal : 0            },            requires : { valEq : 2 , fields : ['adrother'] }        },        {            id : "adrother",            xtype : "input",            setting : {                maxlen : 50,                disabled : true,                size : 18,                caption : "不良反应描述:"            }        },        {            id : "cureStatus",            xtype : "list",            setting : {                ds : "146",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "visitType",            xtype : "list",            setting : {                ds : "166",                isDefaultVal : true,                defaultVal : 0            }        },        {            id : "transfer",            xtype : "list",            setting : {                ds : "151",                save: "isInputValue"            },            requires : { valEq : 2 , fields : ['transReason',"transUnit"] }        },        {            id : "transReason",            xtype : "input",            setting : {                maxlen : 30,                disabled : true,                size : 18,                caption : "原因:"            }        },        {            id : "transUnit",            xtype : "input",            setting : {                maxlen : 30,                size : 30,                disabled : true,                caption : "机构及科室"            }        },        {            id : "furiousMedications",            xtype : "grid",            setting : {                ds : "FuriousMedications",                displayCols : ['drugName','usage', 'dosage'],                displayColNames : ["药物名称", "用法（次/日）", "用量（mg/次）"],                colXtypes : ['input', 'input', 'input'],                colSettings : [                    {},                    {},                    {}                ]            }        },                 {            id : "furiousHealing",            xtype : "list",            setting : {                ds : "48",                multi : true,                save : "id",                mapping : {                        value : 'furiousHealingId'                  }            },            requires : { valEq : 5 , fields : ['measureOther'] }        },        {            id : "measureOther",            xtype : "input",            setting : {                maxlen : 30,                disabled : true,                size : 18,                caption : "其他康复措施:"            }        },        {            id : "nextVistDate",            xtype : "input",            setting : {                maxlen : 8,                format: 'date',                size : 10            }        },         {            id : "visitDoctor",            xtype : "input",            setting : {                maxlen : 30,                size : 10            }        },{        	id : "danger",        	xtype : "list",        	setting : {        		ds : "1332"        	}        },{             id : "lockStatus",            xtype : "list",            setting : {                ds : "33"            }        },{         	id : "hospitalCourse",            xtype : "list",            setting : {                ds : "1339"            }        },{        	id : "hospotalEndDate",        	xtype : "input",        	setting : {        		format : "date",        		maxlen: 8,        	}        }           ];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var furiousVisitHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="4"><span					style="font-size: 20px; font-weight: bolder;">重性精神疾病患者随访服务记录表</span></td>			</tr>			<tr>				<td colspan="4"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span><span					class="Name"></span><span					style="font-size: 16px; font-weight: bolder;margin-left:10px;">编号：</span><span					class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">随访日期:</td>				<td colspan="3"><span class="visitDate"></span></td>			</tr>			<tr>				<td class="header">危险性:</td>				<td colspan="3"><span class="danger"></span></td>			</tr>			<tr>				<td class="header">目前症状:</td>				<td colspan="3"><span class="furiousVisitSymptom"></span> <span					class="symptomOther"></span></td>			</tr>			<tr>				<td class="header">自知力:</td>				<td colspan="3"><span class="status01"></span></td>			</tr>			<tr>				<td class="header">睡眠情况:</td>				<td colspan="3"><span class="status02"></span></td>			</tr>			<tr>				<td class="header">饮食情况:</td>				<td colspan="3"><span class="status03"></span></td>			</tr>			<tr>				<td class="header" rowspan="5">社会功能情况:</td>				<td class="header">个人生活料理:</td>				<td colspan="2"><span class="status04"></span></td>			</tr>			<tr>				<td class="header">家务劳动:</td>				<td colspan="2"><span class="status05"></span></td>			</tr>			<tr>				<td class="header">生产劳动及工作:</td>				<td colspan="2"><span class="status06"></span></td>			</tr>			<tr>				<td class="header">学习能力:</td>				<td colspan="2"><span class="status07"></span></td>			</tr>			<tr>				<td class="header">社会人际交往:</td>				<td colspan="2"><span class="status08"></span></td>			</tr>			<tr>				<td class="header" rowspan="2">患病对家庭社会的影响:</td>				<td>1 轻度滋事<span class="effect1"></span>次				</td>				<td>2 肇事<span class="effect2"></span>次				</td>				<td>3 肇祸<span class="effect3"></span>次				</td>			</tr>			<tr>				<td>4 自伤<span class="effect4"></span>次				</td>				<td>5 自杀未遂<span class="effect5"></span>次				</td>				<td></td>			</tr>			<tr>				<td class="header">关锁情况:</td>				<td colspan="3"><span class="lockStatus"></span></td>			</tr>			<tr>				<td class="header">住院情况:</td>				<td colspan="3"><span class="hospitalCourse"></span><br />					末次出院时间：<span class="hospotalEndDate"></span></td>			</tr>			<tr>				<td class="header">实验室检查:</td>				<td colspan="3"><span class="examine"></span></td>			</tr>			<tr>				<td class="header">服药依从性:</td>				<td colspan="3"><span class="compliance"></span></td>			</tr>			<tr>				<td class="header">药物不良反应:</td>				<td colspan="3"><span class="adr"></span> <span					class="adrother"></span></td>			</tr>			<tr>				<td class="header">治疗效果:</td>				<td colspan="3"><span class="cureStatus"></span></td>			</tr>			<tr>				<td class="header">此次随访分类:</td>				<td colspan="3"><span class="visitType"></span></td>			</tr>			<tr>				<td class="header">是否转诊:</td>				<td colspan="3"><span class="transfer"></span><span					class="transReason"></span><span class="transUnit"></span></td>			</tr>			<tr>				<td class="header">用药情况:</td>				<td colspan="3"><div class="furiousMedications"></div></td>			</tr>			<tr>				<td>康复措施:</td>				<td colspan="3"><span class="furiousHealing"></span> <span					class="measureOther"></span></td>			</tr>			<tr>				<td class="header" style="border-bottom: 1px solid #000;">下次随访日期:</td>				<td style="border-bottom: 1px solid #000;"><span					class="nextVistDate"></span></td>				<td class="header" style="border-bottom: 1px solid #000;">随访医生签名:</td>				<td style="border-bottom: 1px solid #000;"><span					class="visitDoctor"></span></td>			</tr>		</tbody>	</table></div>';
	getFuriousVisitInfomation(dsArray,id,furiousVisitHtml);
}
function getFuriousVisitInfomation(dsArray,id,furiousVisitHtml) {
	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printInformationContaint').html(furiousVisitHtml);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
			FileNumSearch.getHealthFileInfoByWorkId('9',id,function(d){
				console.log(d);
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
				
				var cond = {id : id};
				FuriousVisitService.get(cond,function(d){
					if(d != null){
						console.dir(d);
						$.each(d,function(k,v){
							$(window.cfg).each(function(_i, _v) {
								var id = _v.id;
								if (_v.xtype == 'list') {
									if(id == k){
										var ds = _v.setting.ds;
										var listValues = [];
										if(_v.setting.multi != undefined && _v.setting.multi){
											$(v).each(function() {
												$.each($(this)[0],function(_vi,_vv){
													$.each(data, function(key, values) {
														if(ds == key){
															$.each(values,function(){
																if(_vv == $(this)[0].id){
																	listValues.push($(this)[0].number);
																}
															});
														}
													});
												});
											});
										}else{
											$.each(data, function(key, values) {
												if(ds == key){
													$.each(values,function(){
														if(v == $(this)[0].name){
															listValues.push($(this)[0].number);
														}
													});
												}
											});
										}
										
//										var lvs = listValues.split('');
										var lvsHtml = '';
										if(listValues.length != 0){
											$(listValues).each(function(_bi,_bv){
												if(_bv == null) _bv = '';
												lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
											});
										}else{
											lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
										}
										
										if(lvsHtml != ''){
											lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
										}
										$('.' + id).parent('td').append(lvsHtml);
									}
									
								}else if(_v.xtype == 'input'){
									if(k == id){
										
										if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
											if(id == 'visitDate' || id == 'nextVistDate'){
												$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
											}else{
												$('.' + id).html(v);
											}	
											
										}else if(_v.setting != undefined && _v.setting.disabled != undefined && _v.setting.disabled){
											if(id == 'transReason'){
												$('.' + id).html('原因：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
											}else if(id == 'transUnit'){
												$('.' + id).html('机构及科室：<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
											}else{
												$('.' + id).html('<input type="text" class="otherOption" readonly="readonly" value="' + v + '"/>');
											}
											
										}else if(v != '' && v != null){
											if(id == 'fileNo'){
												//...
											}else{
												$('.' + id).html(v);
											}
										}else if(v != null){
											$('.' + id).html(v);
										}
									}
								}else if(_v.xtype == 'grid'){
									if(id == k){
										if(id == 'furiousMedications'){
											var number = 1;
											var t2dmMedicationsTables = '<table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">';
											
											$(v).each(function(_di,_dv){
												console.log(_dv);
												t2dmMedicationsTables = t2dmMedicationsTables + '<tr>							<td style="width: 100px;">药物名称' + number + '</td>							<td colspan="2">' + _dv.drugName + '</td>						</tr>						<tr>							<td>用法用量</td>							<td>每日' + _dv.usage + '次</td>							<td>每次' + _dv.dosage + 'mg</td>						</tr>';
												number = number + 1;
											});
											while(number < 5){
												t2dmMedicationsTables = t2dmMedicationsTables + '<tr>							<td style="width: 100px;">药物名称' + number + '</td>							<td colspan="2"></td>						</tr>						<tr>							<td>用法用量</td>							<td></td>							<td></td>						</tr>';
												number = number + 1;
											}
											t2dmMedicationsTables = t2dmMedicationsTables + '</table>';
											console.log(t2dmMedicationsTables);
											$('.furiousMedications').html(t2dmMedicationsTables);
										}
									}
								}
							});
						});
//						console.log($('#printInformationContaint').html());
						printObj.printHTML($('#printInformationContaint').html(),'重性精神病随访','12.99cm','30.8cm');
					}
					
				});
			});
			
//			var fileNo = $('.personId').html();
			
		}
	});
}

/**
 * 健康体检记录
 */
PrintHealthFileAndExamClass.prototype.printMediaExam = function(id){
	var dsArray = [];
	//window.cfg = [  {			id : "name",			xtype : "input",			setting : {				maxlen : 18,				size : 18,				showOnly : true,				readonly : true,				width : 60			}		},		{			id : "districtNumber",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "medicalExamSex",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "fileNo",			xtype : "combo",			setting : {				ds : {					search : FileNumSearch.listCodePage,					get : FileNumSearch.getItem				},				local : false,				width : 100,				model : {					id : 0,					code : 0,					display : 1				},				showDisplay : false,				roWhenSet : true,				writeback : [ {					id : "name",					col : 1				}, {					id : "medicalExamSex",					col : 2				}, {					id : "barCode",					col : 6				} ],				mCodePrefixCtrlId : 'districtNumber',				displayCols : [ 1, 2, 3, 7 ],				displayColNames : [ "编号", "姓名", "", "" ]			},			required : [ true, "编号" ]		},		{			id : "barCode",			xtype : "input",			setting : {				showOnly : true,				readonly : true			}		},		{			id : "examDate",			xtype : "input",			setting : {				maxlen : 8,				format : 'date'			},			required : [ true, "体检日期" ]		},		{			id : "doctor",			xtype : "input",			setting : {				maxlen : 18,				size : 18			}		},		{			id : "examSymptom",			xtype : "list",			setting : {				ds : "149",				multi : true,				mapping : {					value : 'examSymptomId'				},				save : 'id',				newlineStep : 7,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 25,				fields : [ 'symptomOther' ]			}		},		{			id : "symptomOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 30,				caption : '其它症状'			}		},		{			id : "general01",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				range : 'range',				minVal : 0,				maxVal : 40			}		},		{			id : "general02",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5,				range : 'range',				minVal : 0,				maxVal : 130			}		},		{			id : "general03",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 18			}		},		{			id : "general04",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general05",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general06",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general07",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general08",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "general09",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "general10",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "general11",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				readonly : true,				asLabel : true			},			valFormula : $F('general09').div(					$F('general08').multi($F('general08')).div($F(10000)))		},		{			id : "general12",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "general13",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				asLabel : true			},			valFormula : $F('general10').div($F('general12'))		},		{			id : "general14",			xtype : "list",			setting : {				ds : "52"			}		},		{			id : "general15",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general16",			xtype : "list",			setting : {				ds : "52"			}		},		{			id : "general17",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life01",			xtype : "list",			setting : {				ds : "13",				controlShow : 2,				controlShowVal : 'life02,life03,life04'			}		},		{			id : "life02",			xtype : "input",			setting : {				maxlen : 30,				size : 5			}		},		{			id : "life03",			xtype : "input",			setting : {				maxlen : 30,				size : 5			}		},		{			id : "life04",			xtype : "input",			setting : {				maxlen : 30,				size : 20			}		},		{			id : "eatHabit",			xtype : "list",			setting : {				ds : "132",				multi : true,				save : "id",				mapping : {					value : 'eatHabitId'				}			}		},		{			id : "life06",			xtype : "list",			setting : {				ds : "100",				controlShow : 1,				controlShowVal : 'life07,life08,life09'			}		},		{			id : "life07",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life08",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life09",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life10",			xtype : "list",			setting : {				ds : "129",				controlShow : 1,				controlShowVal : 'life11,life12,life13,life14,life15,drinkHabit'			}		},		{			id : "life11",			xtype : "input",			setting : {				maxlen : 30,				size : 5			}		},		{			id : "life12",			xtype : "list",			setting : {				ds : "78"			}		},		{			id : "life13",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life14",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life15",			xtype : "list",			setting : {				format : 'int',				ds : "171",				save : "isInputValue"			}		},		{			id : "drinkHabit",			xtype : "list",			setting : {				ds : "130",				mapping : {					value : 'drinkHabitId'				},				save : 'id',				multi : true			},			requires : {				valEq : 5,				fields : [ 'life16other' ]			}		},		{			id : "life16other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它酒类"			}		},		{			id : "life17",			xtype : "list",			setting : {				format : 'int',				ds : "151",				controlShow : 1,				controlShowVal : 'life20,life21,life22,life23,life24,life25,life26,life27,life28,life29'			},			requires : {				valEq : 2,				fields : [ 'life18', 'life19' ]			}		},		{			id : "life18",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "工种"			}		},		{			id : "life19",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "从业时间"			}		},		{			id : "life20",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		},		{			id : "life21",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life21other' ]			}		},		{			id : "life21other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		},		{			id : "life22",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		},		{			id : "life23",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life23other' ]			}		},		{			id : "life23other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		},		{			id : "life24",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		},		{			id : "life25",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life25other' ]			}		},		{			id : "life25other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		},		{			id : "viscera01",			xtype : "list",			setting : {				ds : "49",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "viscera02",			xtype : "list",			setting : {				ds : "8",				newlineStep : 3,				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "viscera02description",			xtype : "input",			setting : {				size : 5			}		},		{			id : "viscera02description1",			xtype : "input",			setting : {				size : 5			}		},		{			id : "viscera02description2",			xtype : "input",			setting : {				size : 5			}		},		{			id : "viscera02description3",			xtype : "input",			setting : {				size : 5			}		},		{			id : "viscera03",			xtype : "list",			setting : {				ds : '117',				maxlen : 30,				size : 5,				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "viscera04",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "viscera05",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "viscera06",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "viscera07",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "viscera08",			xtype : "list",			setting : {				ds : "90",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "viscera09",			xtype : "list",			setting : {				ds : "135",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "body01",			xtype : "list",			setting : {				ds : "150",				isDefaultVal : true,				defaultVal : 0			},			required : [ true, '健康体检记录的《查体》选项还没有录！' ],			requires : {				valEq : 7,				fields : [ 'body01other' ]			}		},		{			id : "body01other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20			}		},		{			id : "body02",			xtype : "list",			setting : {				ds : "30",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ 'body02other' ]			}		},		{			id : "body02other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它描述"			}		},		{			id : "body03",			xtype : "list",			setting : {				ds : "53",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ 'body03other' ]			}		},		{			id : "body03other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它描述"			}		},		{			id : "body04",			xtype : "list",			setting : {				format : 'int',				ds : "80",				save : "isInputValue",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "body05",			xtype : "list",			setting : {				ds : "35",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body05other' ]			}		},		{			id : "body05other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{			id : "body06",			xtype : "list",			setting : {				ds : "54",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ 'body06other' ]			}		},		{			id : "body06other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它描述"			}		},		{			id : "body07",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "body08",			xtype : "list",			setting : {				ds : "105",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "body09",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body09other' ]			}		},		{			id : "body09other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{			id : "body10",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body10other' ]			}		},		{ 			id : "body10other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{			id : "body12",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body12other' ]			}		},		{ 			id : "body12other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body13",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body13other' ]			}		},		{ 			id : "body13other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body14",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body14other' ]			}		},		{ 			id : "body14other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body15",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body15other' ]			}		},		{ 			id : "body15other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body16",			xtype : "list",			setting : {				ds : "101",				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "body17",			xtype : "list",			setting : {				ds : "145",				isDefaultVal : true,				defaultVal : 1			}		},		{ 			id : "body18",			xtype : "list",			setting : {				ds : "26"			},			requires : {				valEq : 5,				fields : [ 'body18other' ]			}		},		{ 			id : "body18other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "galactophore",			xtype : "list",			setting : {				ds : "70",				mapping : {					value : 'galactophoreId'				},				save : 'id',				multi : true,				controlShow : 0			},			requires : {				valEq : 5,				fields : [ 'body19other' ]			}		},		{ 			id : "body19other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body20",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body20other' ]			}		},		{ 			id : "body20other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body21",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body21other' ]			}		},		{ 			id : "body21other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body22",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body22other' ]			}		},		{ 			id : "body22other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body23",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body23other' ]			}		},		{ 			id : "body23other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body24",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body24other' ]			}		},		{ 			id : "body24other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body25",			xtype : "input",			setting : {				maxlen : 50,				size : 50,				defaultVal : '未测'			}		},		{			id : "exam01",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam02",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam03",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam04",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam05",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam06",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				defaultVal : '未测'			}		},		{			id : "exam07",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '未测'			}		},		{			id : "exam08",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '未测'			}		},		{			id : "exam09",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '未测'			}		},		{			id : "exam10",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '未测'			}		},		{			id : "exam11",			xtype : "input",			setting : {				maxlen : 30,				size : 20,				defaultVal : '未测'			}		},		{			id : "exam12",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam13",			xtype : "list",			setting : {				ds : "11"			}		},		{			id : "exam14",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam15",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam16",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam17",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam18",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam19",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam20",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam21",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam22",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam23",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam24",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam25",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam26",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam27",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam28",			xtype : "list",			setting : {				ds : "11"			}		},		{			id : "exam29",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam29other' ]			}		},		{			id : "exam29other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{			id : "exam30",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam30other' ]			}		},		{			id : "exam30other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "异常描述"			}		},		{			id : "exam31",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam31other' ]			}		},		{			id : "exam31other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "异常描述"			}		},		{			id : "exam32",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam32other' ]			}		},		{			id : "exam32other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "异常描述"			}		},		{			id : "exam33",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam33other' ]			}		},		{			id : "exam33other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "异常描述"			}		},		{			id : "exam34",			xtype : "input",			setting : {				maxlen : 30,				size : 50,				defaultVal : '未测'			}		},		{			id : "chn01",			xtype : "list",			setting : {				ds : "62"			}		},		{			id : "chn02",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn03",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn04",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn05",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn06",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn07",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn08",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn09",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "harnsSick",			xtype : "list",			setting : {				ds : "60",				multi : true,				save : "id",				mapping : {					value : 'harnsSickId'				},				newlineStep : 4,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			required : [ true, '健康体检记录的《其它》选项还没有录！' ],			requires : {				valEq : 6,				fields : [ 'problem01other' ]			}		},		{			id : "problem01other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他脑血管疾病"			}		},		{			id : "kidneySick",			xtype : "list",			setting : {				ds : "75",				multi : true,				save : "id",				mapping : {					value : 'kidneySickId'				},				newlineStep : 4,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 6,				fields : [ 'problem02other' ]			}		},		{			id : "problem02other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他肾脏疾病"			}		},		{			id : "heartSick",			xtype : "list",			setting : {				ds : "107",				multi : true,				save : "id",				mapping : {					value : 'heartSickId'				},				newlineStep : 4,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 7,				fields : [ 'problem03other' ]			}		},		{			id : "problem03other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他心脏疾病"			}		},		{			id : "vasSick",			xtype : "list",			setting : {				ds : "114",				multi : true,				save : "id",				mapping : {					value : 'vasSickId'				},				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ 'problem04other' ]			}		},		{			id : "problem04other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他血管疾病"			}		},		{			id : "eyeSick",			xtype : "list",			setting : {				ds : "119",				multi : true,				save : "id",				mapping : {					value : 'eyeSickId'				},				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 5,				fields : [ 'problem05other' ]			}		},		{			id : "problem05other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他眼部疾病"			}		},		{			id : "problem06",			xtype : "list",			setting : {				ds : "74",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'problem06other' ]			}		},		{			id : "problem06other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "疾病描述"			}		},		{			id : "problem07",			xtype : "list",			setting : {				ds : "74",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'problem07other' ]			}		},		{			id : "problem07other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "疾病描述"			}		},		{			id : "hospitalization",			xtype : "grid",			setting : {				displayCols : [ 'type', 'beginDate', 'endDate', 'reason',						'hospital', 'reportNo' ],				displayColNames : [ "住院类型", "入院/建床日期", "出院/撤床日期", "原因",						"医疗机构名称", "病案号" ],				colXtypes : [ 'list', 'input', 'input', 'input', 'input',						'input' ],				colSettings : [ {					ds : "187",					newLineStep : '1'				}, {					format : 'date',					width : "70"				}, {					format : 'date',					width : "70"				}, {					width : "70"				}, {					width : "70"				}, {					width : "70"				} ],				required : [ 'type', null, null, null, 'hospital' ]			},			errCaption : "住院治疗情况"		},		{			id : "examMedications",			xtype : "grid",			setting : {				displayCols : [ 'drugName', 'usageWay', 'dosage', 'drugTime',						'dependency' ],				displayColNames : [ "药名", "用法", "用量", "用药时间", "服药依从性" ],				colXtypes : [ 'input', 'input', 'input', 'input', 'list' ],				colSettings : [ {					width : "70"				}, {					width : "70"				}, {					width : "70"				}, {					width : "70"				}, {					ds : "18"				} ],				required : [ 'drugName' ]			},			errCaption : "用药情况"		}, {			id : "vaccinateHistory",			xtype : "grid",			setting : {				displayCols : [ 'bacterinName', 'vdate', 'hostpital' ],				displayColNames : [ "名称", "接种日期", "接种机构" ],				colXtypes : [ 'input', 'input', 'input' ],				colSettings : [ {					width : "70"				}, {					width : "70",					format : 'date'				}, {					width : "70"				} ],				required : [ 'bacterinName' ]			},			errCaption : "预防接种史"		}, {			id : "judge01",			xtype : "list",			setting : {				ds : "35",				controlShow : 1,				controlShowVal : 'judge02,judge03,judge04,judge05',				isDefaultVal : true,				defaultVal : 0			}		}, {			id : "judge02",			xtype : "input",			setting : {				maxlen : 10,				size : 30			}		}, {			id : "judge03",			xtype : "input",			setting : {				maxlen : 10,				size : 30			}		}, {			id : "judge04",			xtype : "input",			setting : {				maxlen : 10,				size : 30			}		}, {			id : "judge05",			xtype : "input",			setting : {				maxlen : 10,				size : 30			}		}, {			id : "healthDirect",			xtype : "list",			setting : {				ds : "46",				mapping : {					value : 'healthDirectId'				},				save : 'id',				multi : true			}		}, {			id : "dangerControl",			xtype : "list",			setting : {				ds : "97",				mapping : {					value : 'dangerControlId'				},				save : 'id',				multi : true			},			requires : [ {				valEq : 5,				fields : [ 'dangerControlOther1' ]			}, {				valEq : 6,				fields : [ 'dangerControlOther2' ]			}, {				valEq : 7,				fields : [ 'dangerControlOther3' ]			} ]		}, {			id : "dangerControlOther1",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "减体重目标"			}		}, {			id : "dangerControlOther2",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "建议疫苗接种"			}		}, {			id : "dangerControlOther3",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "其他"			}		}, {			id : "oldManHealthEstimate",			xtype : "list",			setting : {				ds : "1274"			}		}, {			id : "oldManLifeEstimate",			xtype : "list",			setting : {				ds : "1280",				newlineStep : 2			}		}, {			id : "life26",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		}, {			id : "life27",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life27other' ]			}		}, {			id : "life27other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		}, {			id : "life28",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		}, {			id : "life29",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life29other' ]			}		}, {			id : "life29other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		}  ];
	window.cfg = [		{			id : "name",			xtype : "input",			setting : {				maxlen : 18,				size : 18,				showOnly : true,				readonly : true,				width : 60			}		},		{			id : "districtNumber",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "medicalExamSex",			xtype : "input",			setting : {				showOnly : true,				asLabel : true			}		},		{			id : "fileNo",			xtype : "combo",			setting : {				local : false,				width : 100,				model : {					id : 0,					code : 0,					display : 1				},				showDisplay : false,				roWhenSet : true,				writeback : [ {					id : "name",					col : 1				}, {					id : "medicalExamSex",					col : 2				}, {					id : "barCode",					col : 6				} ],				mCodePrefixCtrlId : 'districtNumber',				displayCols : [ 1, 2, 3, 7 ],				displayColNames : [ "编号", "姓名", "", "" ]			},			required : [ true, "编号" ]		},		{			id : "barCode",			xtype : "input",			setting : {				showOnly : true,				readonly : true			}		},		{			id : "examDate",			xtype : "input",			setting : {				maxlen : 8,				format : 'date'			},			required : [ true, "体检日期" ]		},		{			id : "doctor",			xtype : "input",			setting : {				maxlen : 18,				size : 18			}		},		{			id : "examSymptom",			xtype : "list",			setting : {				ds : "149",				multi : true,				mapping : {					value : 'examSymptomId'				},				save : 'id',				newlineStep : 7,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 25,				fields : [ 'symptomOther' ]			}		},		{			id : "symptomOther",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 30,				caption : '其它症状'			}		},		{			id : "general01",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				range : 'range',				minVal : 0,				maxVal : 40			}		},		{			id : "general02",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5,				range : 'range',				minVal : 0,				maxVal : 130			}		},		{			id : "general03",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 18			}		},		{			id : "general04",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general05",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general06",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general07",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general08",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "general09",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "general10",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "general11",			xtype : "input",			setting : {								maxlen : 30,				size : 5,				readonly : true,				asLabel : true			}		},		{			id : "general12",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "general13",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				asLabel : true			}		},		{			id : "general14",			xtype : "list",			setting : {				ds : "52"			}		},		{			id : "general15",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "general16",			xtype : "list",			setting : {				ds : "52"			}		},		{			id : "general17",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life01",			xtype : "list",			setting : {				ds : "13",				controlShow : 2,				controlShowVal : 'life02,life03,life04'			}		},		{			id : "life02",			xtype : "input",			setting : {				maxlen : 30,				size : 5			}		},		{			id : "life03",			xtype : "input",			setting : {				maxlen : 30,				size : 5			}		},		{			id : "life04",			xtype : "input",			setting : {				maxlen : 30,				size : 20			}		},		{			id : "eatHabit",			xtype : "list",			setting : {				ds : "132",				multi : true,				save : "id",				mapping : {					value : 'eatHabitId'				}			}		},		{			id : "life06",			xtype : "list",			setting : {				ds : "100",				controlShow : 1,				controlShowVal : 'life07,life08,life09'			}		},		{			id : "life07",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life08",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life09",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life10",			xtype : "list",			setting : {				ds : "129",				controlShow : 1,				controlShowVal : 'life11,life12,life13,life14,life15,drinkHabit'			}		},		{			id : "life11",			xtype : "input",			setting : {				maxlen : 30,				size : 5			}		},		{			id : "life12",			xtype : "list",			setting : {				ds : "78"			}		},		{			id : "life13",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life14",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{			id : "life15",			xtype : "list",			setting : {				format : 'int',				ds : "171",				save : "isInputValue"			}		},		{			id : "drinkHabit",			xtype : "list",			setting : {				ds : "130",				mapping : {					value : 'drinkHabitId'				},				save : 'id',				multi : true			},			requires : {				valEq : 5,				fields : [ 'life16other' ]			}		},		{			id : "life16other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它酒类"			}		},		{			id : "life17",			xtype : "list",			setting : {				format : 'int',				ds : "151",				controlShow : 1,				controlShowVal : 'life20,life21,life22,life23,life24,life25,life26,life27,life28,life29'			},			requires : {				valEq : 2,				fields : [ 'life18', 'life19' ]			}		},		{			id : "life18",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "工种"			}		},		{			id : "life19",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "从业时间"			}		},		{			id : "life20",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		},		{			id : "life21",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life21other' ]			}		},		{			id : "life21other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		},		{			id : "life22",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		},		{			id : "life23",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life23other' ]			}		},		{			id : "life23other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		},		{			id : "life24",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		},		{			id : "life25",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life25other' ]			}		},		{			id : "life25other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		},		{			id : "viscera01",			xtype : "list",			setting : {				ds : "49",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "viscera02",			xtype : "list",			setting : {				ds : "8",				newlineStep : 3,				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "viscera02description",			xtype : "input",			setting : {				size : 5			}		},		{			id : "viscera02description1",			xtype : "input",			setting : {				size : 5			}		},		{			id : "viscera02description2",			xtype : "input",			setting : {				size : 5			}		},		{			id : "viscera02description3",			xtype : "input",			setting : {				size : 5			}		},		{			id : "viscera03",			xtype : "list",			setting : {				ds : '117',				maxlen : 30,				size : 5,				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "viscera04",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "viscera05",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "viscera06",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "viscera07",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5			}		},		{			id : "viscera08",			xtype : "list",			setting : {				ds : "90",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "viscera09",			xtype : "list",			setting : {				ds : "135",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "body01",			xtype : "list",			setting : {				ds : "150",				isDefaultVal : true,				defaultVal : 0			},			required : [ true, '健康体检记录的《查体》选项还没有录！' ],			requires : {				valEq : 7,				fields : [ 'body01other' ]			}		},		{			id : "body01other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20			}		},		{			id : "body02",			xtype : "list",			setting : {				ds : "30",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ 'body02other' ]			}		},		{			id : "body02other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它描述"			}		},		{			id : "body03",			xtype : "list",			setting : {				ds : "53",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ 'body03other' ]			}		},		{			id : "body03other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它描述"			}		},		{			id : "body04",			xtype : "list",			setting : {				format : 'int',				ds : "80",				save : "isInputValue",				isDefaultVal : true,				defaultVal : 0			}		},		{			id : "body05",			xtype : "list",			setting : {				ds : "35",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body05other' ]			}		},		{			id : "body05other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{			id : "body06",			xtype : "list",			setting : {				ds : "54",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ 'body06other' ]			}		},		{			id : "body06other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "其它描述"			}		},		{			id : "body07",			xtype : "input",			setting : {				format : 'int',				maxlen : 30,				size : 5			}		},		{ 			id : "body08",			xtype : "list",			setting : {				ds : "105",				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "body09",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body09other' ]			}		},		{ 			id : "body09other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body10",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body10other' ]			}		},		{ 			id : "body10other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body12",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body12other' ]			}		},		{ 			id : "body12other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body13",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body13other' ]			}		},		{ 			id : "body13other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body14",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body14other' ]			}		},		{ 			id : "body14other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body15",			xtype : "list",			setting : {				ds : "151",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'body15other' ]			}		},		{ 			id : "body15other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body16",			xtype : "list",			setting : {				ds : "101",				isDefaultVal : true,				defaultVal : 0			}		},		{ 			id : "body17",			xtype : "list",			setting : {				ds : "145",				isDefaultVal : true,				defaultVal : 1			}		},		{ 			id : "body18",			xtype : "list",			setting : {				ds : "26"			},			requires : {				valEq : 5,				fields : [ 'body18other' ]			}		},		{ 			id : "body18other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "galactophore",			xtype : "list",			setting : {				ds : "70",				mapping : {					value : 'galactophoreId'				},				save : 'id',				multi : true,				controlShow : 0			},			requires : {				valEq : 5,				fields : [ 'body19other' ]			}		},		{ 			id : "body19other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body20",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body20other' ]			}		},		{ 			id : "body20other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body21",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body21other' ]			}		},		{ 			id : "body21other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body22",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body22other' ]			}		},		{ 			id : "body22other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body23",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body23other' ]			}		},		{ 			id : "body23other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body24",			xtype : "list",			setting : {				ds : "96"			},			requires : {				valEq : 2,				fields : [ 'body24other' ]			}		},		{ 			id : "body24other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{ 			id : "body25",			xtype : "input",			setting : {				maxlen : 50,				size : 50,				defaultVal : '未测'			}		},		{			id : "exam01",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam02",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam03",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam04",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam05",			xtype : "input",			setting : {								maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam06",			xtype : "input",			setting : {				maxlen : 30,				size : 10,				defaultVal : '未测'			}		},		{			id : "exam07",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '未测'			}		},		{			id : "exam08",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '未测'			}		},		{			id : "exam09",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '未测'			}		},		{			id : "exam10",			xtype : "input",			setting : {				maxlen : 30,				size : 5,				defaultVal : '未测'			}		},		{			id : "exam11",			xtype : "input",			setting : {				maxlen : 30,				size : 20,				defaultVal : '未测'			}		},		{			id : "exam12",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam13",			xtype : "list",			setting : {				ds : "11"			}		},		{			id : "exam14",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam15",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam16",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam17",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam18",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam19",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam20",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam21",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam22",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam23",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam24",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam25",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam26",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam27",			xtype : "input",			setting : {				format : 'num',				maxlen : 30,				size : 5,				defaultVal : '-1'			}		},		{			id : "exam28",			xtype : "list",			setting : {				ds : "11"			}		},		{			id : "exam29",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam29other' ]			}		},		{			id : "exam29other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 20,				caption : "异常描述"			}		},		{			id : "exam30",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam30other' ]			}		},		{			id : "exam30other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "异常描述"			}		},		{			id : "exam31",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam31other' ]			}		},		{			id : "exam31other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "异常描述"			}		},		{			id : "exam32",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam32other' ]			}		},		{			id : "exam32other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "异常描述"			}		},		{			id : "exam33",			xtype : "list",			setting : {				ds : "35"			},			requires : {				valEq : 2,				fields : [ 'exam33other' ]			}		},		{			id : "exam33other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "异常描述"			}		},		{			id : "exam34",			xtype : "input",			setting : {				maxlen : 30,				size : 50,				defaultVal : '未测'			}		},		{			id : "chn01",			xtype : "list",			setting : {				ds : "62"			}		},		{			id : "chn02",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn03",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn04",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn05",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn06",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn07",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn08",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "chn09",			xtype : "list",			setting : {				ds : "66"			}		},		{			id : "harnsSick",			xtype : "list",			setting : {				ds : "60",				multi : true,				save : "id",				mapping : {					value : 'harnsSickId'				},				newlineStep : 4,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			required : [ true, '健康体检记录的《其它》选项还没有录！' ],			requires : {				valEq : 6,				fields : [ 'problem01other' ]			}		},		{			id : "problem01other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他脑血管疾病"			}		},		{			id : "kidneySick",			xtype : "list",			setting : {				ds : "75",				multi : true,				save : "id",				mapping : {					value : 'kidneySickId'				},				newlineStep : 4,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 6,				fields : [ 'problem02other' ]			}		},		{			id : "problem02other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他肾脏疾病"			}		},		{			id : "heartSick",			xtype : "list",			setting : {				ds : "107",				multi : true,				save : "id",				mapping : {					value : 'heartSickId'				},				newlineStep : 4,				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 7,				fields : [ 'problem03other' ]			}		},		{			id : "problem03other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他心脏疾病"			}		},		{			id : "vasSick",			xtype : "list",			setting : {				ds : "114",				multi : true,				save : "id",				mapping : {					value : 'vasSickId'				},				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 4,				fields : [ 'problem04other' ]			}		},		{			id : "problem04other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他血管疾病"			}		},		{			id : "eyeSick",			xtype : "list",			setting : {				ds : "119",				multi : true,				save : "id",				mapping : {					value : 'eyeSickId'				},				controlShow : 0,				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 5,				fields : [ 'problem05other' ]			}		},		{			id : "problem05other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "其他眼部疾病"			}		},		{			id : "problem06",			xtype : "list",			setting : {				ds : "74",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'problem06other' ]			}		},		{			id : "problem06other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "疾病描述"			}		},		{			id : "problem07",			xtype : "list",			setting : {				ds : "74",				isDefaultVal : true,				defaultVal : 0			},			requires : {				valEq : 2,				fields : [ 'problem07other' ]			}		},		{			id : "problem07other",			xtype : "input",			setting : {				maxlen : 30,				disabled : true,				size : 30,				caption : "疾病描述"			}		},		{			id : "hospitalization",			xtype : "grid",			setting : {				displayCols : [ 'type', 'beginDate', 'endDate', 'reason',						'hospital', 'reportNo' ],				displayColNames : [ "住院类型", "入院/建床日期", "出院/撤床日期", "原因",						"医疗机构名称", "病案号" ],				colXtypes : [ 'list', 'input', 'input', 'input', 'input',						'input' ],				colSettings : [ {					ds : "187",					newLineStep : '1'				}, {					format : 'date',					width : "70"				}, {					format : 'date',					width : "70"				}, {					width : "70"				}, {					width : "70"				}, {					width : "70"				} ],				required : [ 'type', null, null, null, 'hospital' ]			},			errCaption : "住院治疗情况"		},		{			id : "examMedications",			xtype : "grid",			setting : {				displayCols : [ 'drugName', 'usageWay', 'dosage', 'drugTime',						'dependency' ],				displayColNames : [ "药名", "用法", "用量", "用药时间", "服药依从性" ],				colXtypes : [ 'input', 'input', 'input', 'input', 'list' ],				colSettings : [ {					width : "70"				}, {					width : "70"				}, {					width : "70"				}, {					width : "70"				}, {					ds : "18"				} ],				required : [ 'drugName' ]			},			errCaption : "用药情况"		}, {			id : "vaccinateHistory",			xtype : "grid",			setting : {				displayCols : [ 'bacterinName', 'vdate', 'hostpital' ],				displayColNames : [ "名称", "接种日期", "接种机构" ],				colXtypes : [ 'input', 'input', 'input' ],				colSettings : [ {					width : "70"				}, {					width : "70",					format : 'date'				}, {					width : "70"				} ],				required : [ 'bacterinName' ]			},			errCaption : "预防接种史"		}, {			id : "judge01",			xtype : "list",			setting : {								ds : "35",				controlShow : 1,				controlShowVal : 'judge02,judge03,judge04,judge05',				isDefaultVal : true,				defaultVal : 0			}		}, {			id : "judge02",			xtype : "input",			setting : {				maxlen : 10,				size : 30			}		}, {			id : "judge03",			xtype : "input",			setting : {				maxlen : 10,				size : 30			}		}, {			id : "judge04",			xtype : "input",			setting : {				maxlen : 10,				size : 30			}		}, {			id : "judge05",			xtype : "input",			setting : {				maxlen : 10,				size : 30			}		}, {			id : "healthDirect",			xtype : "list",			setting : {				ds : "46",				mapping : {					value : 'healthDirectId'				},				save : 'id',				multi : true			}		}, {			id : "dangerControl",			xtype : "list",			setting : {				ds : "97",				mapping : {					value : 'dangerControlId'				},				save : 'id',				multi : true			},			requires : [ {				valEq : 5,				fields : [ 'dangerControlOther1' ]			}, {				valEq : 6,				fields : [ 'dangerControlOther2' ]			}, {				valEq : 7,				fields : [ 'dangerControlOther3' ]			} ]		}, {			id : "dangerControlOther1",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "减体重目标"			}		}, {			id : "dangerControlOther2",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "建议疫苗接种"			}		}, {			id : "dangerControlOther3",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10,				caption : "其他"			}		}, {			id : "oldManHealthEstimate",			xtype : "list",			setting : {				ds : "1274"			}		}, {			id : "oldManLifeEstimate",			xtype : "list",			setting : {				ds : "1280",				newlineStep : 2			}		}, {			id : "life26",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		}, {			id : "life27",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life27other' ]			}		}, {			id : "life27other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		}, {			id : "life28",			xtype : "input",			setting : {				maxlen : 30,				size : 10			}		}, {			id : "life29",			xtype : "list",			setting : {				save : 'isInputValue',				ds : "151"			},			requires : {				valEq : 2,				fields : [ 'life29other' ]			}		}, {			id : "life29other",			xtype : "input",			setting : {				disabled : true,				maxlen : 30,				size : 10			}		}];
	
	console.log(window.cfg);
	$(window.cfg).each(function(_i, _v) {
		if (_v.xtype == 'list') {
			var ds = _v.setting.ds;
			dsArray.push(ds);
		}else if(_v.xtype == 'grid'){
			if(_v.setting.colSettings[0].ds != undefined){
				var ds = _v.setting.colSettings[0].ds;
				dsArray.push(ds);
			}
			
		}
	});
	var mediaExamHtml = '<style type="text/css">.listInputValues {	margin-left: 10px;}.inputValues {	border: 1px solid #000;	width: 16px;	height: 16px;	text-align: center;}.printHealthFile,.table_personalInfor {	font-size: 14px;}.td_printHealthFile_content {	border-left: 1px solid #000000;	border-right: 1px solid #000000;	padding-left: 160px;	height: 60px;}.healthfileBasicInfo td {	height: 60px;	vertical-align: bottom;}.rightTableTd {	border-bottom: 1px solid #000000;}.table_personalInfor tbody td {	border-left: 1px solid #000;	border-right: 1px solid #000;	border-top: 1px solid #000;	height: 30px;	padding-left: 5px;}.childTable thead td {	border: none;}.childTable tbody td {	border: none;}.otherOption {	border-left: none;	border-right: none;	border-top: none;	border-bottom: 1px solid #000;	width: 80px;}.noneBorder {	text-align: center;	border: none;	width: 50px;}</style><div class="printHealthFile">	<table class="table_personalInfor" cellpadding="0" cellspacing="0"		style="width: 19cm; border-collapse: collapse;">		<thead>			<tr>				<td style="text-align: center; height: 30px;" colspan="6"><span					style="font-size: 20px; font-weight: bolder;">健康体检表</span></td>			</tr>			<tr>				<td colspan="6"><span					style="font-size: 16px; font-weight: bolder;">姓名：</span><span					class="Name"></span><span					style="font-size: 16px; font-weight: bolder; margin-left: 10px;">编号：</span><span					class="FileNo"></span></td>			</tr>		</thead>		<tbody>			<tr>				<td class="header">体检日期</td>				<td colspan="2"><span class="examDate"></span></td>				<td class="header">责任医生</td>				<td colspan="2"><span class="doctor"></span></td>			</tr>			<tr>				<td class="header">内容</td>				<td class="header" colspan="5" style="text-align: center;">检 查					项 目</td>			</tr>			<tr>				<td class="header">症状</td>				<td colspan="5"><span class="examSymptom"></span><span					class="symptomOther"></span></td>			</tr>			<tr>				<td class="header" rowspan="8">一般状况</td>				<td class="header">体温</td>				<td><span class="general01"></span>℃</td>				<td class="header">脉率</td>				<td colspan="2"><span class="general02"></span>次/分钟</td>			</tr>			<tr>				<td class="header">呼吸频率</td>				<td><span class="general03"></span>次/分钟</td>				<td class="header">血压</td>				<td colspan="2">左侧：<span class="general04"></span>/<span					class="general05"></span>mmHg<br /> 右侧：<span class="general06"></span>/<span					class="general07"></span>mmHg				</td>			</tr>			<tr>				<td class="header">身高</td>				<td><span class="general08"></span>cm</td>				<td class="header">体重</td>				<td colspan="2"><span class="general09"></span>kg</td>			</tr>			<tr>				<td class="header">腰围</td>				<td><span class="general10"></span>cm</td>				<td class="header">体质指数</td>				<td colspan="2"><span class="general11"></span></td>			</tr>			<tr>				<td class="header">老年人健康状态<br />自我评估*				</td>				<td colspan="4"><span class="oldManHealthEstimate"></span></td>			</tr>			<tr>				<td class="header">老年人生活<br />自理能力<br />自我评估*				</td>				<td colspan="4"><span class="oldManLifeEstimate"></span></td>			</tr>			<tr>				<td class="header">老年人认知功能</td>				<td><span class="general14"></span></td>				<td class="header">简易智力状态检查</td>				<td colspan="2"><span class="general15"></span></td>			</tr>			<tr>				<td class="header">老年人情感状态</td>				<td><span class="general16"></span></td>				<td class="header">老年人抑郁评分检查</td>				<td colspan="2"><span class="general17"></span></td>			</tr>			<tr>				<td class="header" rowspan="18">生活方式</td>				<td class="header" rowspan="3">体育锻炼</td>				<td class="header">锻炼频率</td>				<td colspan="3"><span class="life01"></span></td>			</tr>			<tr>				<td class="header">每次锻炼时间</td>				<td><span class="life02"></span>分钟</td>				<td class="header">坚持锻炼时间</td>				<td><span class="life03"></span>年</td>			</tr>			<tr>				<td class="header">锻炼方式</td>				<td colspan="3"><span class="life04"></span></td>			</tr>			<tr>				<td class="header">饮食习惯</td>				<td colspan="4"><span class="eatHabit"></span></td>			</tr>			<tr>				<td class="header" rowspan="3">吸烟情况</td>				<td class="header">吸烟状况</td>				<td colspan="3"><span class="life06"></span></td>			</tr>			<tr>				<td class="header">日吸烟量</td>				<td colspan="3"><span>平均</span><span class="life07"></span>支</td>			</tr>			<tr>				<td class="header">开始吸烟年龄</td>				<td><span class="life08"></span>岁</td>				<td class="header">戒烟年龄</td>				<td><span class="life09"></span>岁</td>			</tr>			<tr>				<td class="header" rowspan="5">饮酒情况</td>				<td class="header">饮酒频率</td>				<td colspan="3"><span class="life10"></span></td>			</tr>			<tr>				<td class="header">日饮酒量</td>				<td colspan="3">平均<span class="life11"></span>两				</td>			</tr>			<tr>				<td class="header">是否戒酒</td>				<td><span class="life12"></span></td>				<td class="header">戒酒年龄</td>				<td><span class="life13"></span>岁</td>			</tr>			<tr>				<td class="header">开始饮酒年龄</td>				<td><span class="life14"></span>岁</td>				<td class="header">近一年内是否曾醉酒</td>				<td><span class="life15"></span></td>			</tr>			<tr>				<td class="header">饮酒种类</td>				<td colspan="3"><span class="drinkHabit"></span><span					class="life16other"></span></td>			</tr>			<tr>				<td class="header" rowspan="6">职业病危害因素<br>接触史				</td>				<td colspan="4"><span class="life17"></span><span					class="life18"></span><span class="life19"></span></td>			</tr>			<tr>				<td class="header" rowspan="5">毒物种类</td>				<td class="header">粉尘:<span class="life20"></span></td>				<td class="header">防护措施</td>				<td><span class="life21"></span><span class="life21other"></span></td>			</tr>			<tr>				<td class="header">放射物质:<span class="life22"></span></td>				<td class="header">防护措施</td>				<td><span class="life23"></span><span class="life23other"></span></td>			</tr>			<tr>				<td class="header">物理因素:<span class="life24"></span></td>				<td class="header">防护措施</td>				<td><span class="life25"></span><span class="life25other"></span></td>			</tr>			<tr>				<td class="header">化学物质:<span class="life26"></span></td>				<td class="header">防护措施</td>				<td><span class="life27"></span><span class="life27other"></span></td>			</tr>			<tr>				<td class="header">其他:<span class="life28"></span></td>				<td class="header">防护措施</td>				<td><span class="life29"></span><span class="life29other"></span></td>			</tr>			<tr>				<td class="header" rowspan="6">脏器功能</td>				<td class="header" rowspan="3">口腔</td>				<td class="header">口唇</td>				<td colspan="3"><span class="viscera01"></span></td>			</tr>			<tr>				<td class="header">齿列</td>				<td><span class="viscera02"></span></td>				<td class="header">齿列描述</td>				<td style="padding: 0px;">					<table cellpadding="0" cellspacing="0"						style="margin: 0px; padding: 0px; border: 0px; border-collapse: collapse; height: 100%; width: 100%;">						<tr>							<td><span class="viscera02description"></span></td>							<td><span class="viscera02description1"></span></td>						</tr>						<tr>							<td><span class="viscera02description2"></span></td>							<td><span class="viscera02description3"></span></td>						</tr>					</table>				</td>			</tr>			<tr>				<td class="header">咽部</td>				<td colspan="3"><span class="viscera03"></span></td>			</tr>			<tr>				<td class="header">视力</td>				<td colspan="4">左眼<span class="viscera04"></span>右眼<span					class="viscera05"></span> <span>(矫正视力：左眼</span><span					class="viscera06"></span>右眼<span class="viscera07"></span>)				</td>			</tr>			<tr>				<td class="header">听力</td>				<td colspan="4"><span class="viscera08"></span></td>			</tr>			<tr>				<td class="header">运动能力</td>				<td colspan="4"><span class="viscera09"></span></td>			</tr>			<tr>				<td class="header" rowspan="24">查体</td>				<td>眼底*<br /> <font size="2px" color="red">（空代表未测）</font></td>				<td class="header" colspan="4"><span class="exam29"></span><span					class="exam29other"></span></td>			</tr>			<tr>				<td class="header">皮肤</td>				<td colspan="4"><span class="body01"></span><span					class="body01other"></span></td>			</tr>			<tr>				<td class="header">巩膜</td>				<td colspan="4"><span class="body02"></span><span					class="body02other"></span></td>			</tr>			<tr>				<td class="header">淋巴结</td>				<td colspan="4"><span class="body03"></span><span					class="body03other"></span></td>			</tr>			<tr>				<td class="header" rowspan="3">肺</td>				<td class="header">桶状胸</td>				<td colspan="3"><span class="body04"></span></td>			</tr>			<tr>				<td class="header">呼吸音</td>				<td colspan="3"><span class="body05"></span><span					class="body05other"></span></td>			</tr>			<tr>				<td class="header">罗音</td>				<td colspan="3"><span class="body06"></span><span					class="body06other"></span></td>			</tr>			<tr>				<td class="header" rowspan="2">心脏</td>				<td class="header">心率</td>				<td><span class="body07"></span>次/分钟</td>				<td class="header">心律</td>				<td><span class="body08"></span></td>			</tr>			<tr>				<td class="header">杂音</td>				<td colspan="3"><span class="body09"></span><span					class="body09other"></span></td>			</tr>			<tr>				<td class="header" rowspan="5">腹部</td>				<td class="header">压痛</td>				<td colspan="3"><span class="body10"></span><span					class="body10other"></span></td>			</tr>			<tr>				<td class="header">包块</td>				<td colspan="3"><span class="body12"></span><span					class="body12other"></span></td>			</tr>			<tr>				<td class="header">肝大</td>				<td colspan="3"><span class="body13"></span><span					class="body13other"></span></td>			</tr>			<tr>				<td class="header">脾大</td>				<td colspan="3"><span class="body14"></span><span					class="body14other"></span></td>			</tr>			<tr>				<td class="header">移动性浊音</td>				<td colspan="3"><span class="body15"></span><span					class="body15other"></span></td>			</tr>			<tr>				<td class="header">下肢水肿</td>				<td colspan="4"><span class="body16"></span></td>			</tr>			<tr>				<td class="header">足背动脉博动</td>				<td colspan="4"><span class="body17"></span></td>			</tr>			<tr>				<td class="header">肛门指诊*<br /> <font size="2px" color="red">（空代表未测）</font></td>				<td colspan="4"><span class="body18"></span><span					class="body18other"></span></td>			</tr>			<tr>				<td class="header">乳腺*</td>				<td colspan="4"><span class="galactophore"></span><span					class="body19other"></span></td>			</tr>			<tr>				<td class="header" rowspan="5">妇科</td>				<td class="header">外阴*</td>				<td colspan="3"><span class="body20"></span><span					class="body20other"></span></td>			</tr>			<tr>				<td class="header">阴道*</td>				<td colspan="3"><span class="body21"></span><span					class="body21other"></span></td>			</tr>			<tr>				<td class="header">宫颈*</td>				<td colspan="3"><span class="body22"></span><span					class="body22other"></span></td>			</tr>			<tr>				<td class="header">宫体*</td>				<td colspan="3"><span class="body23"></span><span					class="body23other"></span></td>			</tr>			<tr>				<td class="header">附件*</td>				<td colspan="3"><span class="body24"></span><span					class="body24other"></span></td>			</tr>			<tr>				<td class="header">其它*</td>				<td colspan="4"><span class="body25"></span></td>			</tr>			<tr>				<td class="header" rowspan="30">辅助检查</td>				<td class="header" rowspan="2">血常规*</td>				<td class="header">血红蛋白<span class="exam03"></span>g/L				</td>				<td class="header">白细胞<span class="exam04"></span>×10<sup>9</sup>/L				</td>				<td class="header" colspan="2">血小板<span class="exam05"></span>×10<sup>9</sup>/L				</td>			</tr>			<tr>				<td class="header" colspan="4">其它<span class="exam06"></span></td>			</tr>			<tr>				<td class="header" rowspan="2">尿常规*</td>				<td class="header">尿蛋白<span class="exam07"></span></td>				<td class="header">尿糖<span class="exam08"></span></td>				<td class="header" colspan="2">尿酮体<span class="exam09"></span></td>			</tr>			<tr>				<td class="header">尿潜血<span class="exam10"></span></td>				<td class="header" colspan="3">其它<span class="exam11"></span></td>			</tr>			<tr>				<td class="header">空腹血糖*</td>				<td colspan="4"><span class="exam01"></span>mmol/L 或 (餐后)<span					class="exam02"></span>mmol/L</td>			</tr>			<tr>				<td class="header">心电图*<br /> <font size="2px" color="red">（空代表未测）</font></td>				<td class="header" colspan="4"><span class="exam30"></span><span					class="exam30other"></span></td>			</tr>			<tr>				<td class="header">尿微量白蛋白*</td>				<td class="header" colspan="4"><span class="exam12"></span></td>			</tr>			<tr>				<td class="header">大便潜血*<br /> <font size="2px" color="red">（空代表未测）</font></td>				<td colspan="4"><span class="exam13"></span></td>			</tr>			<tr>				<td>糖化血红蛋白*</td>				<td class="header" colspan="4"><span class="exam27"></span></td>			</tr>			<tr>				<td>乙型肝炎表面抗原*<br /> <font size="2px" color="red">（空代表未测）</font></td>				<td class="header" colspan="4"><span class="exam28"></span></td>			</tr>			<tr>				<td class="header" rowspan="2">肝功能*</td>				<td>血清谷丙转氨酶<span class="exam14"></span>U/L				</td>				<td>血清谷草转氨酶<span class="exam15"></span>U/L				</td>				<td colspan="3">白蛋白<span class="exam16"></span>g/L				</td>			</tr>			<tr>				<td>总胆红素<span class="exam17"></span>µmol				</td>				<td colspan="3">结合胆红素<span class="exam18"></span>µmol				</td>			</tr>			<tr>				<td class="header" rowspan="2">肾功能*</td>				<td>血清肌酐<span class="exam19"></span>µmol				</td>				<td colspan="3">血尿素氮<span class="exam20"></span>mmol				</td>			</tr>			<tr>				<td>血钾浓度<span class="exam21"></span>mmol				</td>				<td colspan="3">血纳浓度<span class="exam22"></span>mmol				</td>			</tr>			<tr>				<td class="header" rowspan="3">血脂*</td>				<td class="header">总胆固醇<span class="exam23"></span>mmol/L				</td>				<td class="header" colspan="3">甘油三酯<span class="exam24"></span>mmol/L				</td>			</tr>			<tr>				<td class="header" colspan="4">血清低密度脂蛋白胆固醇<span class="exam25"></span>mmol/L				</td>			</tr>			<tr>				<td class="header" colspan="4">血清高密度脂蛋白胆固醇<span class="exam26"></span>mmol/L				</td>			</tr>			<tr>				<td class="header">胸片X线片*<br /> <font size="2px" color="red">（空代表未测）</font></td>				<td class="header" colspan="4"><span class="exam31"></span><span					class="exam31other"></span></td>			</tr>			<tr>				<td class="header">B超*<br /> <font size="2px" color="red">（空代表未测）</font></td>				<td class="header" colspan="4"><span class="exam32"></span><span					class="exam32other"></span></td>			</tr>			<tr>				<td class="header">宫颈涂片*<br /> <font size="2px" color="red">（空代表未测）</font></td>				<td class="header" colspan="4"><span class="exam33"></span><span					class="exam33other"></span></td>			</tr>			<tr>				<td class="header">其他*</td>				<td class="header" colspan="4"><span class="exam34"></span><span					class="exam34other"></span></td>			</tr>			<tr>				<td class="header" rowspan="9">中医体质辨识*<br /> <font size="2px"					color="red">（空代表未测）</font></td>				<td class="header">平和质</td>				<td class="header" colspan="3"><span class="chn01"></span></td>			</tr>			<tr>				<td class="header">气虚质</td>				<td class="header" colspan="3"><span class="chn02"></span></td>			</tr>			<tr>				<td class="header">阳虚质</td>				<td class="header" colspan="3"><span class="chn03"></span></td>			</tr>			<tr>				<td class="header">阴虚质</td>				<td class="header" colspan="3"><span class="chn04"></span></td>			</tr>			<tr>				<td class="header">痰湿质</td>				<td class="header" colspan="3"><span class="chn05"></span></td>			</tr>			<tr>				<td class="header">湿热质</td>				<td class="header" colspan="3"><span class="chn06"></span></td>			</tr>			<tr>				<td class="header">血瘀质</td>				<td class="header" colspan="3"><span class="chn07"></span></td>			</tr>			<tr>				<td class="header">气郁质</td>				<td class="header" colspan="3"><span class="chn08"></span></td>			</tr>			<tr>				<td class="header">特秉质</td>				<td class="header" colspan="3"><span class="chn09"></span></td>			</tr>			<tr>				<td class="header" rowspan="7">现在主要健康问题</td>				<td class="header">脑血管疾病</td>				<td class="header" colspan="4"><span class="harnsSick"></span><span					class="problem01other"></span></td>			</tr>			<tr>				<td class="header">肾脏疾病</td>				<td class="header" colspan="4"><span class="kidneySick"></span><span					class="problem02other"></span></td>			</tr>			<tr>				<td class="header">心脏疾病</td>				<td class="header" colspan="4"><span class="heartSick"></span><span					class="problem03other"></span></td>			</tr>			<tr>				<td class="header">血管疾病</td>				<td class="header" colspan="4"><span class="vasSick"></span><span					class="problem04other"></span></td>			</tr>			<tr>				<td class="header">眼部疾病</td>				<td class="header" colspan="4"><span class="eyeSick"></span><span					class="problem05other"></span></td>			</tr>			<tr>				<td class="header">神经系统疾病</td>				<td class="header" colspan="4"><span class="problem06"></span><span					class="problem06other"></span></td>			</tr>			<tr>				<td class="header">其它系统疾病</td>				<td class="header" colspan="4"><span class="problem07"></span><span					class="problem07other"></span></td>			</tr>			<tr>				<td class="header">住院治疗情况</td>				<td class="header" colspan="5" style="padding: 0px;"><span class="hospitalization"></span></td>			</tr>			<tr>				<td class="header">主要用药情况</td>				<td class="header" colspan="5" style="padding: 0px;"><span class="examMedications"></span></td>			</tr>			<tr>				<td class="header">非免疫规划预防接种史</td>				<td class="header" colspan="5" style="padding: 0px;"><span class="vaccinateHistory"></span></td>			</tr>			<tr>				<td class="hearder" rowspan="5">健康评价</td>				<td colspan="5"><span class="judge01"></span></td>			</tr>			<tr>				<td colspan="5">异常1<span class="judge02"></span></td>			</tr>			<tr>				<td colspan="5">异常2<span class="judge03"></span></td>			</tr>			<tr>				<td colspan="5">异常3<span class="judge04"></span></td>			</tr>			<tr>				<td colspan="5">异常4<span class="judge05"></span></td>			</tr>			<tr>				<td class="header">健康指导</td>				<td colspan="5"><span class="healthDirect"></span></td>			</tr>			<tr>				<td class="header" style="border-bottom: 1px solid #000;">危险因素控制</td>				<td colspan="5" style="border-bottom: 1px solid #000;"><span					class="dangerControl"></span><span class="dangerControlOther1"></span><span					class="dangerControlOther2"></span><span					class="dangerControlOther3"></span></td>			</tr>		</tbody>	</table></div>';
	getMediaExamInfomation(dsArray,id,mediaExamHtml);
}
function getMediaExamInfomation(dsArray,id,mediaExamHtml) {
	MetaProvider.get(dsArray, function(data) {
		if (data != null) {
			$('#printHealthFile').html(mediaExamHtml);
			$(window.cfg).each(function(_i, _v) {
				if (_v.xtype == 'list') {
					var ds = _v.setting.ds;
					$.each(data, function(key, values) {
						if(ds == key){
							var id = _v.id;
							var basicValue = "";
							$.each(values,function(i,v){
								basicValue = basicValue + v.number + "." + v.name + "&nbsp;";
							});
							$('.' + id).html(basicValue);
						}
					});
				}
			});
			
			FileNumSearch.getHealthFileInfoByWorkId('10',id,function(d){
				console.log(d);
				if(d != null){
					$('.Name').html(d.name);
					var fileNos = d.fileNo.split('');
					console.log(fileNos);
					var fileNoHtml = '';
					$(fileNos).each(function(_bi,_bv){
						if(_bi == 5 || _bi == 8 || _bi == 11){
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}else{
							fileNoHtml = fileNoHtml + '<input type="text" readonly="readonly" class="inputValues" value="' + _bv + '"/> '
						}
						
					});
					$('.FileNo').html(fileNoHtml);
				}
				
				var cond = {id : id};
				MedicalExamService.get(cond,function(d){
					if(d != null){
						console.dir(d);
						$.each(d,function(k,v){
							$(window.cfg).each(function(_i, _v) {
								var id = _v.id;
								if (_v.xtype == 'list') {
									if(id == k){
										var ds = _v.setting.ds;
										var listValues = [];
										if(_v.setting.multi != undefined && _v.setting.multi){
											$(v).each(function() {
												$.each($(this)[0],function(_vi,_vv){
													$.each(data, function(key, values) {
														if(ds == key){
															$.each(values,function(){
																if(_vv == $(this)[0].id){
																	listValues.push($(this)[0].number);
																}
															});
														}
													});
												});
											});
										}else{
											$.each(data, function(key, values) {
												if(ds == key){
													$.each(values,function(){
														if(v == $(this)[0].name){
															listValues.push($(this)[0].number);
														}
													});
												}
											});
										}
										
//										var lvs = listValues.split('');
										var lvsHtml = '';
										if(listValues.length != 0){
											$(listValues).each(function(_bi,_bv){
												if(_bv == null) _bv = '';
												lvsHtml = lvsHtml + '<input type="text" readonly="readonly" class="inputValues listInputValues" value="' + _bv + '"/>&nbsp;/';
											});
										}else{
											lvsHtml = '<input type="text" readonly="readonly" class="inputValues listInputValues"/>/';
										}
										
										if(lvsHtml != ''){
											lvsHtml = lvsHtml.substring(0,lvsHtml.length - 1);
										}
										$('.' + id).parent('td').append(lvsHtml);
									}
									
								}else if(_v.xtype == 'input'){
									if(k == id){
										
										if(_v.setting != undefined && _v.setting.format != undefined && _v.setting.format == 'date' && v != null){
											if(id == 'examDate'){
												$('.' + id).html(v.getFullYear() + '年' + addZero(v.getMonth() + 1) + '月' + addZero(v.getDate()) + '日');
											}else{
												$('.' + id).html(v);
											}	
											
										}else if(v != '' && v != null){
											if(id == 'fileNo'){
												//...
											}else{
												$('.' + id).html(v);
											}
										}else if(v != null){
											$('.' + id).html(v);
										}
									}
								}else if(_v.xtype == 'grid'){
									if(id == k){
										if(id == 'hospitalization'){
											var number = 1;
											var hospitalizationTables = '<table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">';
											hospitalizationTables = hospitalizationTables + '<tr>	<td>住院类型</td>	<td>入/出院日期</td>	<td>原因</td>	<td>医疗机构名称</td>	<td>病案号</td></tr>';
											$(v).each(function(_di,_dv){
												console.log(_dv);
												hospitalizationTables = hospitalizationTables + '<tr>	<td>' + _dv.type + '</td>	<td>' + _dv.beginDate.getFullYear() + '年' + addZero(_dv.beginDate.getMonth() + 1) + '月' + addZero(_dv.beginDate.getDate()) + '日' + '/' + _dv.endDate.getFullYear() + '年' + addZero(_dv.endDate.getMonth() + 1) + '月' + addZero(_dv.endDate.getDate()) + '日'  + '</td>	<td>' + _dv.reason + '</td>	<td>' + _dv.hospital + '</td>	<td>' + _dv.reportNo + '</td></tr>';
												number = number + 1;
											});
											while(number < 5){
												hospitalizationTables = hospitalizationTables + '<tr>	<td></td>	<td></td>	<td></td>	<td></td>	<td></td></tr>';
												number = number + 1;
											}
											hospitalizationTables = hospitalizationTables + '</table>';
											console.log(hospitalizationTables);
											$('.hospitalization').html(hospitalizationTables);
										}else if(id == 'examMedications'){
											var number = 1;
											var examMedicationsTables = '<table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">';
											examMedicationsTables = examMedicationsTables + '<tr>	<td>药物名称</td>	<td>用法</td>	<td>用量</td>	<td>用药时间</td>	<td>服药依从性<br/>1规律&nbsp;&nbsp;2间断&nbsp;&nbsp;3不服药	</td></tr>';
											$(v).each(function(_di,_dv){
												console.log(_dv);
												examMedicationsTables = examMedicationsTables + '<tr>	<td>' + number + '、' + _dv.drugName + '</td>	<td>' + _dv.usageWay + '</td>	<td>' + _dv.dosage + '</td>	<td>' + _dv.drugTime + '</td>	<td>' + _dv.dependency + '</td></tr>';
												number = number + 1;
											});
											while(number < 7){
												examMedicationsTables = examMedicationsTables + '<tr>	<td></td>	<td></td>	<td></td>	<td></td>	<td></td></tr>';
												number = number + 1;
											}
											examMedicationsTables = examMedicationsTables + '</table>';
											console.log(examMedicationsTables);
											$('.examMedications').html(examMedicationsTables);
										}else if(id == 'vaccinateHistory'){
											var number = 1;
											var vaccinateHistoryTables = '<table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">';
											vaccinateHistoryTables = vaccinateHistoryTables + '<tr>	<td>名称</td>	<td>接种日期</td>	<td>接种机构</td></tr>';
											$(v).each(function(_di,_dv){
												console.log(_dv);
												vaccinateHistoryTables = vaccinateHistoryTables + '<tr>	<td>' + number + '、' + _dv.bacterinName + '</td>	<td>' + _dv.vdate.getFullYear() + '年' + addZero(_dv.vdate.getMonth() + 1) + '月' + addZero(_dv.vdate.getDate()) + '日' + '</td>	<td>' + _dv.hostpital + '</td></tr>';
												number = number + 1;
											});
											while(number < 7){
												vaccinateHistoryTables = vaccinateHistoryTables + '<tr>	<td></td>	<td></td>	<td></td></tr>';
												number = number + 1;
											}
											vaccinateHistoryTables = vaccinateHistoryTables + '</table>';
											console.log(vaccinateHistoryTables);
											$('.vaccinateHistory').html(vaccinateHistoryTables);
										}
									}
								}
							});
						});
//						console.log($('#printHealthFile').html());
						printObj.printHTML($('#printHealthFile').html(),'健康体检记录','12.99cm','30.8cm');
					}
					
				});
			});
			
//			var fileNo = $('.personId').html();
			
		}
	});
}

var PrintHealthFileAndExamClass = new PrintHealthFileAndExamClass();


