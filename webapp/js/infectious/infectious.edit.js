function Infectious($scope, $dialog, $routeParams, $location, $filter, $window) {

    $scope.data = {};
    $scope.data.distid = getWindowParam("distid");
    var ID = getWindowParam("ID");
    if(ID){
        InfectionReportService.newGet(parseInt(ID),function(data){
            console.log(data);
            if(data ){
                $scope.data = data;
                $scope.$digest();
            }else{
                window.top.Ext.Msg.alert('查询异常', "请稍后重试!");
            }
        });
    }
    //测试
    //$scope.data = {
    //    distid : getWindowParam("distid"),
    //    "sProvince": "云南",
    //    "sCity": "宝山",
    //    "sCounty": "施甸",
    //    "iType": 0,
    //    "sChangeType": "A",
    //    "sSickType2": "慢性",
    //    "sSickType1": "疑似病例",
    //    "iHBVSick": "1",
    //    "iHBsAg": "2",
    //    "iLiver": "0",
    //    "iHBc": "1",
    //    "iHBsAgChange": "2",
    //    "iSexSick": "1",
    //    "sNo": "编号",
    //    "sName": "姓名",
    //    "sParentName": "家长姓名",
    //    "sIDCard": "身份证号",
    //    "sSex": "男",
    //    "dBirthday": "20130101",
    //    "iAge": "1",
    //    "sAgeUnit": "月",
    //    "sUnit": "机构",
    //    "sLinkPhone": "123456",
    //    "sRange": "本县区",
    //    "sTowns": "乡镇",
    //    "sVillage": "村",
    //    "sDoorplate": "门派",
    //    "dSickBegin": "20130101",
    //    "dDiagnose": "20140101",
    //    "dDeath": "20150101",
    //    "sSickGrade": "中级",
    //    "sSickName": "测试",
    //    "sMarriageState": "未婚",
    //    "sStudy": "文盲",
    //    "sTouch": "注射毒品史",
    //    "sPath": "注射毒品",
    //    "sSource": "娱乐场所人员体检",
    //    "sTouchOther": "123",
    //    "sSourceOther": "333",
    //    "iFirstYear": "2014",
    //    "iFirstMonth": "12",
    //    "ATL": "12",
    //    "sSickName_Init": "前病名",
    //    "sBackReason": "退卡原因",
    //    "sReportUnit": "报告单位",
    //    "sUnitLinkPhone": "联系电话",
    //    "sReportDoctor": "报告医生",
    //    "dReportDate": "20130801",
    //    "sMemo": "备注"
    //};
    $scope.save = function () {
        console.log($scope.data);
        InfectionReportService.newSave($scope.data,function(data){
            if(data ){
                console.log(data);
                if(data.success){
                    window.top.Ext.Msg.alert('保存成功', "保存成功!");
                    $scope.data.ID = data.ID;
                }else if(data.msg){
                    window.top.Ext.Msg.alert('保存异常', "保存出错!错误信息:"+data.msg+"");
                }else{
                    window.top.Ext.Msg.alert('保存异常', "保存出错!请与系统管理员联系!");
                }
            }else{
                window.top.Ext.Msg.alert('保存异常', "保存出错!请与系统管理员联系!");
            }
        });
    };
    $scope.exit = function () {
        sendMessage('quit');
    };
}
