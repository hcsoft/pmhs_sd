function Infectious($scope, $dialog, $routeParams, $location, $filter, $window) {

    $scope.data = {};
    $scope.data.distid = getWindowParam("distid");
    var ID = getWindowParam("ID");
    var orgid = getWindowParam("orgid");
    if(ID){
        InfectionReportService.newGet(parseInt(ID),parseInt(orgid),function(data){
            console.log(data);
            if(data ){
                $scope.data = data;
                $scope.$digest();
            }else{
                window.top.Ext.Msg.alert('查询异常', "请稍后重试!");
            }
        });
    }
    $scope.$watch("data.iState",function(newval,oldval){
        console.log(oldval,newval);
        if(newval == 3){
            $(".content >div.group ").each(function(i,v){
                $(this).css("background-color","#eaeaea");
            })
            $(".content >div.group.check ").each(function(i,v){
                $(this).css("background-color","white");
            })
            $(".check input").each(function(i,v){
                $(this).prop('disabled', false);
            });
        }else{
            $(".check input").each(function(i,v){
                $(this).prop('disabled', true);
            });
        }
    });
    $scope.check = function () {

        var params = angular.copy($scope.data);
        params['iState'] = 4;
        console.log(params);
        InfectionReportService.check(params,function(data){
            if(data ){
                if(data.success){
                    $scope.data.iState = 4;
                    window.top.Ext.Msg.alert('审核成功', "审核成功!");
                    $scope.data.ID = data.ID;
                    $scope.$digest();
                }else if(data.msg){
                    window.top.Ext.Msg.alert('审核异常', "审核出错!错误信息:"+data.msg+"");
                }else{
                    window.top.Ext.Msg.alert('审核异常', "审核出错!请与系统管理员联系!");
                }
            }else{
                window.top.Ext.Msg.alert('审核异常', "审核出错!请与系统管理员联系!");
            }
        });
    };
    $scope.exit = function () {
        sendMessage('quit');
    };
    $(".content input, .content select").each(function(i,v){
        $(this).prop('disabled', true);
    });

}
