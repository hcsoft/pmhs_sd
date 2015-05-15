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
    $scope.exit = function () {
        sendMessage('quit');
    };
    $(".content input, .content select").each(function(i,v){
        $(this).prop('disabled', true);
    });
}
