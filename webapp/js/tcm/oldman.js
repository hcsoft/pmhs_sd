Ext.ns("Ext.tcm.oldman");

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
//取得查询条件
Ext.tcm.oldman.type = getScriptParam(document.currentScript.src, "type");
//取得参数
qDwr(CommonQueryService.get_Export_Param, Ext.tcm.oldman.type)
    .then(function (cfg) {
        return qDwr(CommonQueryService.sqlListHead, cfg.main[0][0]).then(function (head) {
            return {cfg: cfg, head: head};
        });
    }).then(function (data) {
        console.log(data);
        var queryid = data.cfg.main[0][0];
        //取得下拉列表
        var tbarstore = [];
        for (var i = 0; i < data.cfg.sub.length; i++) {
            tbarstore.push([data.cfg.sub[i]['code'],data.cfg.sub[i]['name']])
        }
        //取得显示的列
        var cm = [];
        var recordcfg = [];
        for (i = 0; i < data.head.length; i++) {
            cm.push({
                "sortable": true,
                "header": data.head[i]['title'],
                "dataIndex": data.head[i]['field']
            });
            recordcfg.push({
                name: data.head[i]['field'],
                mapping: data.head[i]['field']
            });
        }
        function getParams() {
            //取得行政区划
            var root = Ext.tcm.oldman.tcmcurrentnode;
            if (!root) {
                root = Ext.getCmp("tcm.oldman.query.district").getSelectionModel().getSelectedNode();
            }
            if (!root) {
                root = Ext.getCmp("tcm.oldman.query.district").getRootNode().firstChild;
            }
            //取得其他参数
            var params = {};
            var combovalue = Ext.getCmp("tcm.oldman.query.combovalue").getValue();
            var comboname = Ext.getCmp("tcm.oldman.query.combokey").getValue();
            if(!Ext.isEmpty( combovalue)){
                params[comboname] = combovalue;
            }

            return [root.id, queryid, params];
        }

        //生成页面
        Ext.tcm.oldman.oldManQuery = new Ext.Panel({
            // layout : 'anchor',
            layout: 'border',
            defaults: {
                style: "float:left"
            },
            tbar: ['状态：', {
                xtype: 'combo',
                id: 'tcm.oldman.query.statuscombo',
                store: [['1','年内已检查'],['2','年内未检查']],
                mode: 'local',
                editable: false,
                width: 120,
                allowBlank: false,
                triggerAction: 'all'
            },'选择条件：', {
                xtype: 'combo',
                id: 'tcm.oldman.query.combokey',
                store: tbarstore,
                mode: 'local',
                editable: false,
                width: 80,
                allowBlank: false,
                triggerAction: 'all'
            }, {
                xtype: 'field',
                id: 'tcm.oldman.query.combovalue'
                // format : 'Y-m-d',
                // value :new Date()
            }, "-", {
                text: '查询',
                iconCls: 'c_refresh',
                id: 'tcm.oldman.querybtn',
                handler: function (obj) {
                    // obj.disable();
                    Ext.getCmp("tcm.oldman.querybtn").disable();
                    Ext.getCmp("tcm.query.oldman.grid").getStore().reload();
                }
            }, {
                text: '导出',
                iconCls: 'c_save',
                id: 'tcmQuery.savebtn',
                handler: function (obj) {
                    var params = getParams();
                    qDwr(CommonQueryService.sqlExport, [params[0], params[1], '老年人中医健康管理导出', params[2]])
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
                    id: 'tcm.oldman.query.district',
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
                            Ext.tcm.oldman.tcmcurrentnode = node;

                            Ext.getCmp("tcm.query.oldman.grid").store.reload();
                            Ext.getCmp("tcm.query.oldman.grid").setTitle(node.text);
                        },
                        load: function () {
                            var node = Ext.getCmp("tcm.oldman.query.district").getRootNode().firstChild;
                            Ext.getCmp("tcm.query.oldman.grid").setTitle(node.text);
                            Ext.getCmp("tcm.query.oldman.grid").store.reload();
                        }
                    }
                }

                ]
            }, {
                xtype: 'grid',
                region: 'center',
                id: 'tcm.query.oldman.grid',
                title:'中医药健康管理',
                store: new Ext.data.Store({
                    // autoLoad : true,
                    proxy: new Ext.ux.data.DWRProxy({
                        dwrFunction: CommonQueryService.sqlListnew,
                        listeners: {
                            load: function () {
                                Ext.getCmp("tcm.oldman.querybtn").enable();
                            },
                            beforeload: function (dataProxy, params) {
                                var param = getParams();
                                var pageable = data.cfg.main[0][3];
                                var pagesize = data.cfg.main[0][4];
                                var pagenumber = params.start/pagesize +1;
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
                        var row = obj.store.getAt(rowIndex).data;

                    }
                }
            }]
        });
        ModuleMgr.register(Ext.tcm.oldman.oldManQuery);
    });

