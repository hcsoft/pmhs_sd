Ext.grid.GridPanel.prototype.initComponent = Ext.grid.GridPanel.prototype.initComponent.createInterceptor(function () {
    if (this.store && this.bbar && this.bbar.xtype == 'paging' && !(this.bbar instanceof Ext.PagingToolbar) && !this.bbar.store) {
        if (this.store.xtype && !(this.store instanceof Ext.data.Store)) {
            this.store = Ext.ComponentMgr.create(this.store);
        }
        this.bbar.store = this.store;
        if (this.bbar.xtype && !(this.bbar instanceof Ext.PagingToolbar)) {
            this.bbar = Ext.ComponentMgr.create(this.bbar);
        }
    }
});
var documentscriptsrc = document.currentScript.src;
//取得参数
getGridFromQueryType(getScriptParam(documentscriptsrc, "type"), documentscriptsrc, "老年人中医健康管理导出")
    .then(function (data) {
        var panel = data.panel;
        var scope = data.scope;
        //显示列增加按钮
        scope.addCol(1, {
            "sortable": true,
            "header": "操作",
            renderer: function (value, cellobj, row,idx) {
                return '<button type="button" onclick="' + scope.id("showpanel") + '('+idx+')">详细</button>';
                    //'<button type="button" onclick="' + scope.id("newcheck") + '('+idx+')">检查</button>';
            },
            width: 50
        });
        scope.cmp('query.grid').on('rowdblclick',function (obj, rowIndex, e) {
            var row = obj.store.getAt(rowIndex).data;
            scope.scope().newcheck(rowIndex);
        });
        //增加查询条件
        scope.addParams(0,'状态：');
        scope.addParams(1,{
            xtype: 'combo',
            id: scope.id('query.statuscombo'),
            store: [['1','年内未检查'],['2','年内已检查'],['3','---全部---']],
            mode: 'local',
            editable: false,
            value:1,
            width: 120,
            allowBlank: false,
            triggerAction: 'all'
        });
        //覆盖查询函数
        scope.params= function(){
            var ret = this.getParams();
            ret[2]["ischecked"] = scope.cmp('query.statuscombo').getValue();
            return ret;
        };
        scope.scope().showpanel = function (idx) {
            var row = scope.cmp('query.grid').getStore().data.items[idx].data;

            qDwr(CommonQueryService.get_Export_Param, 4)
                .then(function (cfg) {
                    return qDwr(CommonQueryService.sqlListHead, cfg.main[0][0]).then(function (head) {
                        return {cfg: cfg, head: head};
                    });
                }).then(function (data) {
                    //取得显示的列
                    console.log(data);
                    var cm = [];
                    cm.push({
                        "sortable": true,
                        "header": "行号",
                        renderer: rowid,
                        width: 40
                    });
                    var recordcfg = [];
                    var width = data.cfg.main[0][5] == null ? [] : data.cfg.main[0][5].split(",");
                    for (i = 0; i < data.head.length; i++) {
                        cm.push({
                            "sortable": true,
                            "header": data.head[i]['title'],
                            "dataIndex": data.head[i]['field'],
                            width: width.length > i ? parseInt(width[i]) : 0
                        });
                        recordcfg.push({
                            name: data.head[i]['field'],
                            mapping: data.head[i]['field']
                        });
                    }
                    cm[1]['hidden']=true;
                    var dialog = new Ext.Window({
                        width: $(window).width() < 1000 ? $(window).width() - 100 : 1000,
                        height: $(window).height() - 50,
                        layout: 'border',
                        title: '健康管理--'+row["col2"],
                        modal: true,
                        items: [{
                            xtype: 'grid',
                            region: 'center',
                            title: '   姓名:' + row['col2'],
                            cm: new Ext.grid.ColumnModel(cm),
                            store: new Ext.data.Store({
                                autoLoad:true,
                                proxy: new Ext.ux.data.DWRProxy({
                                    dwrFunction: CommonQueryService.sqlListnew,
                                    listeners: {
                                        beforeload: function (dataProxy, params) {
                                            var param = ['', data.cfg.main[0][0], {fileno:row['col1']}];
                                            var pager = {
                                                'pagesize': 1000,
                                                'pagenumber': 1
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
                            }), listeners : {
                                rowdblclick: function (grid, rowIndex, e) {
                                    var row = grid.store.getAt(rowIndex).data;
                                    scope.scope().newcheck(rowIndex,{id:row['col1']});
                                },
                                rowcontextmenu:function(grid, rowIndex, e) {
                                    var row = grid.store.getAt(rowIndex).data;
                                    e.preventDefault();
                                    e.stopEvent();

                                    var deleteMenu = new Ext.menu.Item({
                                        iconCls : 'delete',
                                        id      : 'deleteMenu',
                                        text    : '删除',
                                        handler : function(){
                                            var id = row['col1'];
                                            window.top.Ext.Msg.show({
                                                title: '确认删除',
                                                msg: '是否确认删除!',
                                                width: 300,
                                                buttons: window.top.Ext.MessageBox.OKCANCEL,
                                                fn: function (btn) {
                                                    if (btn == 'ok') {
                                                        TcmService.delOldman(id,function(data){
                                                            Ext.Msg.alert('删除成功', '删除成功!');
                                                            grid.getStore().reload();
                                                        })
                                                    }
                                                },
                                                icon: window.top.Ext.MessageBox.INFO
                                            });

                                        }
                                    });
                                    var menuList = [ deleteMenu];
                                    scope.scope().grid_menu = new Ext.menu.Menu({
                                        id    : 'mainMenu',
                                        items : menuList,
                                        minWidth : 150
                                    });

                                    var coords = e.getXY();
                                    grid.getSelectionModel().selectRow(rowIndex);
                                    scope.scope().grid_menu.showAt([coords[0], coords[1]]);
                                }
                            }
                        }]
                    });
                    dialog.show();
                });
        };
        scope.scope().newcheck = function (idx,rowdata) {
            console.log(this);
            var row = rowdata;
            if(!rowdata){
                row = scope.cmp('query.grid').getStore().data.items[idx].data;
            }
            console.log(row);
            var params = {};
            var window = new Ext.Window({
                closable: true,
                layout: 'fit',
                modal: true,
                title: '中医药健康管理服务--'+row["col2"],
                items: [
                    {
                        xtype: 'iframepanel',
                        defaultSrc: "/js/tcm/oldman.html?"+$.param(row),
                        layout: 'fit',
                        style: 'top:0px;bottom:10px',
                        loadMask: true,
                        autoScroll: true,
                        listeners: {
                            message: function (f, data) {
                                if (data.data == 'quit') {
                                    window.close();
                                } else if (data.data == 'saved') {
                                    this.load();
                                }
                            }.createDelegate(this)

                        }

                    }
                ]
            });
            window.show();
            window.maximize();
        };
        scope.scope().panel = panel;
        ModuleMgr.register(panel);
    });

