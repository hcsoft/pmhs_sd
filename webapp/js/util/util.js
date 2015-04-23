function denc(str){
	return str;
//    if(! str || !str.length){
//        return "";
//    }
//    var denclist = '$&@*!.:=>}€‚ƒˆ‰Š‹ŒŽ‘’•–àáâãäæççèéêëìßÞÝÜÛÜÛÚÙØÖÕÔÓÒÑÐÏÊÉÇÆÄÃ£Á';
//    var enclist =  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//    var result = "";
//    var tmpStr = "";
//    for (var i = 0; i < str.length; i++) {
//        tmpStr = str.substr(i,1);
//        if (tmpStr !== "%") {
//            var index = denclist.indexOf(tmpStr);
//            if (index<0) {
//                tmpStr = String.fromCharCode(tmpStr.charCodeAt(0) ^ 'c'.charCodeAt(0));
//            } else {
//                tmpStr = enclist.substr(index,1);
//            }
//        }
//        result = result + tmpStr;
//    }
//    return result;
}


function enc(str){
	return str;
//    if(! str || !str.length){
//        return "";
//    }
//    var denclist = '$&@*!.:=>}€‚ƒˆ‰Š‹ŒŽ‘’•–àáâãäæççèéêëìßÞÝÜÛÜÛÚÙØÖÕÔÓÒÑÐÏÊÉÇÆÄÃ£Á';
//    var enclist =  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//    var result = "";
//    var tmpStr = "";
//    for (var i = 0; i < str.length; i++) {
//        tmpStr = str.substr(i,1);
//        if (tmpStr !== "%") {
//            var index = enclist.indexOf(tmpStr);
//            if (index<0) {
//                tmpStr = String.fromCharCode(tmpStr.charCodeAt(0) ^ 'c'.charCodeAt(0));
//            } else {
//                tmpStr = denclist.substr(index,1);
//            }
//        }
//        result = result + tmpStr;
//    }
//    return result;
}

function getWindowParam(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
		.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(
		/\+/g, " "));
}

function getScriptParam(scripturl,name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
		.exec(scripturl);
	return results == null ? "" : decodeURIComponent(results[1].replace(
		/\+/g, " "));
}

function qDwr(func,params,flag) {
	var deferred = Q.defer();
	if(flag){
		var arrays = [];
		for(var i = 0 ; i <params.length;i++){
			arrays.push("params["+i+"]");
		}
		var excstr = "func("+ arrays.join(",")+",function(data){deferred.resolve(data);});)";
		console.log(execstr);
		eval(excstr);
	}else{
		func(params,function(data){
			deferred.resolve(data);
		});
	}
	return deferred.promise;
}