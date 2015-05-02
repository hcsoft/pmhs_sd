function denc(str) {
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


function enc(str) {
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

function getScriptParam(scripturl, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
        .exec(scripturl);
    return results == null ? "" : decodeURIComponent(results[1].replace(
        /\+/g, " "));
}

function qDwr(func, params, flag) {
    var deferred = Q.defer();
    if(!params){
        var excstr = "func(function(data){deferred.resolve(data);});";
        eval(excstr);
    }else  if (flag) {
        var arrays = [];
        for (var i = 0; i < params.length; i++) {
            arrays.push("params[" + i + "]");
        }
        var excstr = "func(" + arrays.join(",") + ",function(data){deferred.resolve(data);});";
        eval(excstr);
    } else {
        func(params, function (data) {
            deferred.resolve(data);
        });
    }
    return deferred.promise;
}

function hcsoftScope(preid, queryid) {
    return {
        ns: function () {
            Ext.ns("Ext.hcsoft." + preid);
        },
        getId: function () {
            return preid;
        },
        getQueryid: function () {
            return queryid;
        },
        cmp: function (name) {
            return Ext.getCmp(this.id(name));
        },
        id: function (name) {
            return "Ext.hcsoft." + preid + "." + name;
        },
        scope: function () {
            return Ext['hcsoft'][preid];
        },
        addCol: function (idx, obj) {
            var cm = this.cmp('query.grid').getColumnModel();
            var cfg = cm.getColumnsBy(function () {
                return true;
            });
            cfg.splice(idx, 0, obj);
            cm.setConfig(cfg);
        },
        addParams: function (idx, obj) {
            var tbar = this.cmp('mainpanel').getTopToolbar();
            tbar.splice(idx, 0, obj);
            //tbar.addItem(obj);
            this.cmp('mainpanel').topToolbar = tbar;
        },
        getParams: function () {
            //取得行政区划
            var root = this.scope().tcmcurrentnode;
            if (!root) {
                root = this.cmp("query.district").getSelectionModel().getSelectedNode();
            }
            if (!root) {
                root = this.cmp("query.district").getRootNode().firstChild;
            }
            //取得其他参数
            var params = {};
            var combovalue = this.cmp("query.combovalue").getValue();
            var comboname = this.cmp("query.combokey").getValue();
            if (!Ext.isEmpty(combovalue)) {
                params[comboname] = combovalue;
            }
            return [root.id, queryid, params];
        },
        params: function () {
            //修改本函数用来修改参数变化
            return this.getParams();
        }
    };
}
function rowid(value, cellobj, row, idx, n1, store) {
    var start = 1;
    if (store.lastOptions.params) {
        start += store.lastOptions.params.start;
    }
    return idx + start;
}


function getGridFromQueryType(type, documentscriptsrc, exprotname) {
    return qDwr(CommonQueryService.get_Export_Param, getScriptParam(documentscriptsrc, "type"))
        .then(function (cfg) {
            return qDwr(CommonQueryService.sqlListHead, cfg.main[0][0]).then(function (head) {
                return {cfg: cfg, head: head};
            });
        })
        .then(function (data) {
            var preid = "currenttab" + CryptoJS.MD5(documentscriptsrc).toString();
            var queryid = data.cfg.main[0][0];
            var hcsoft = hcsoftScope(preid, queryid);
            hcsoft.ns();
            //取得下拉列表
            var tbarstore = [];
            for (var i = 0; i < data.cfg.sub.length; i++) {
                tbarstore.push([data.cfg.sub[i]['code'], data.cfg.sub[i]['name']])
            }
            var firstselect = tbarstore[0][0];
            //取得显示的列
            var cm = [];
            var recordcfg = [];
            var width = data.cfg.main[0][5] == null ?[] :data.cfg.main[0][5].split(",");
            for (i = 0; i < data.head.length; i++) {
                cm.push({
                    "sortable": true,
                    "header": data.head[i]['title'],
                    "dataIndex": data.head[i]['field'],
                     width: width.length>i?parseInt(width[i]):0
                });
                recordcfg.push({
                    name: data.head[i]['field'],
                    mapping: data.head[i]['field']
                });
            }
            cm.splice(0,0, {
                "sortable": true,
                "header": "行号",
                renderer: rowid,
                width: 40
            });
            hcsoft.scope().getQueryParams = hcsoft.getParams;
            return {
                scope: hcsoft,
                panel: new Ext.Panel({
                    // layout : 'anchor',
                    id: hcsoft.id('mainpanel'),
                    layout: 'border',
                    defaults: {
                        style: "float:left"
                    },
                    tbar: ['选择条件：', {
                        xtype: 'combo',
                        id: hcsoft.id('query.combokey'),
                        store: tbarstore,
                        mode: 'local',
                        editable: false,
                        width: 80,
                        allowBlank: false,
                        value: firstselect,
                        triggerAction: 'all'
                    }, {
                        xtype: 'field',
                        id: hcsoft.id('query.combovalue')
                        // format : 'Y-m-d',
                        // value :new Date()
                    }, "-", {
                        text: '查询',
                        iconCls: 'c_refresh',
                        id: hcsoft.id('querybtn'),
                        handler: function (obj) {
                            // obj.disable();
                            hcsoft.cmp('querybtn').disable();
                            hcsoft.cmp('query.grid').getStore().reload();
                        }
                    }, {
                        text: '导出',
                        iconCls: 'c_save',
                        id: hcsoft.id('tcmQuery.savebtn'),
                        handler: function (obj) {
                            var params = hcsoft.params();
                            qDwr(CommonQueryService.sqlExport, [params[0], params[1], exprotname, params[2]], true)
                                .then(function (data) {
                                    window.location.href = data;
                                });
                        }
                    }],
                    items: [{
                        width: 200,
                        region: 'west',
                        items: [{
                            xtype: 'treepanel',
                            layout: 'fit',
                            animate: true,
                            title: '行政区划',
                            id: hcsoft.id('query.district'),
                            enableDD: false,
                            loader: new Ext.ux.DWRTreeLoader({
                                dwrCall: UserMenuTreeService.getUserDistrictNodes
                            }),
                            lines: true,
                            autoScroll: true,
                            border: false,
                            root: new Ext.tree.AsyncTreeNode({
                                text: 'root',
                                draggable: false,
                                id: 'org'
                            }),
                            rootVisible: false,
                            listeners: {
                                click: function (node) {
                                    hcsoft.scope().tcmcurrentnode = node;

                                    hcsoft.cmp("query.grid").store.reload();
                                    hcsoft.cmp("query.grid").setTitle(node.text);
                                },
                                load: function () {
                                    var node = hcsoft.cmp("query.district").getRootNode().firstChild;
                                    hcsoft.cmp("query.grid").setTitle(node.text);
                                    hcsoft.cmp("query.grid").store.reload();
                                }
                            }
                        }

                        ]
                    }, {
                        xtype: 'grid',
                        region: 'center',
                        id: hcsoft.id('query.grid'),
                        title: '行政区划',
                        store: new Ext.data.Store({
                            // autoLoad : true,
                            proxy: new Ext.ux.data.DWRProxy({
                                dwrFunction: CommonQueryService.sqlListnew,
                                listeners: {
                                    load: function () {
                                        hcsoft.cmp("querybtn").enable();
                                    },
                                    beforeload: function (dataProxy, params) {
                                        var param = hcsoft.params();
                                        var pageable = data.cfg.main[0][3];
                                        var pagesize = data.cfg.main[0][4];
                                        var pagenumber = params.start / pagesize + 1;
                                        var pager = {
                                            'pagesize': (pageable ? pagesize : 1000),
                                            'pagenumber': (pagenumber ? pagenumber : 1)
                                        };
                                        param.push(pager);
                                        params[dataProxy.loadArgsKey] = param;
                                    }.createDelegate(this)
                                }
                            }),
                            reader: new Ext.data.JsonReader({
                                totalProperty: "total", // 总记录数
                                root: "rows"
                            }, Ext.data.Record.create(recordcfg))
                        }),
                        cm: new Ext.grid.ColumnModel(cm),
                        bbar: {
                            xtype: 'paging',
                            pageSize: 20,
                            displayInfo: true,
                            displayMsg: '{0} - {1} of {2}',
                            emptyMsg: "没有记录"
                        },
                        sm: new Ext.grid.CheckboxSelectionModel(),
                        listeners: {
                            rowdblclick: function (obj, rowIndex, e) {


                            }
                        }
                    }]
                })
            }
        });

}

function arrayToObject(array){
    var ret = {};
    for(var i =0 ; i <array.length;i++){
        var item = array[i];
        ret[item['name']]=item['value'];
    }
    return ret;
}

function getURLParameters(url){

    var result = {};
    var searchIndex = url.indexOf("?");
    if (searchIndex == -1 ) return result;
    var sPageURL = url.substring(searchIndex +1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        result[sParameterName[0]] = decodeURIComponent(sParameterName[1]);
    }
    return result;
}