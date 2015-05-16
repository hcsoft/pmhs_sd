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
getGridFromQueryType(getScriptParam(documentscriptsrc, "type"), documentscriptsrc, "传染病报告卡")
    .then(function (data) {
        var panel = data.panel;
        var scope = data.scope;

        //设置列表的双击事件
        scope.cmp('query.grid').on('rowdblclick', function (obj, rowIndex, e) {
            var row = obj.store.getAt(rowIndex).data;
            newReport({ID: row['col1'],orgid: row['col2']}, '查看--' + row['col3']);
        });
        //设置状态列码值转换
        scope.setColMapRender(4,{0:"新建",1:"确诊",2:"上报数据中心",3:"上报疫情网",4:"上报疫情网审核"});
        //增加操作列
        scope.scope().check = function (idx) {
            var row = scope.cmp('query.grid').getStore().data.items[idx].data;
            newReport({ID: row['col1'],orgid: row['col2']}, '审核--' + row['col3']);
        };
        scope.addCol(5, {
            "sortable": true,
            "header": "操作",
            renderer: function (value, cellobj, row, idx) {
                var status = row.data['col4'];
                if (status == 3) {
                    return '<button type="button" onclick="' + scope.id("check") + '(' + idx + ')">审核</button>';
                }
                return "";
            },
            width: 50
        });
        //隐藏id列
        scope.hideCol(1);
        //隐藏orgid
        scope.hideCol(2);
        //取得树
        var tree = scope.cmp('query.district');

        function treedblclick(data, event) {
            if (data.id.length == 12) {
                newReport({distid: data.id}, '新增');
            }
            return true;
        }

        function newReport(row, title) {
            row = !row ? {} : row;
            if (!row['ID'] && (!row['distid'] || row['distid'].length < 12)) {
                Ext.Msg.alert('选择行政区划', '请选择村委会或居委会!');
            } else {
                var window = new Ext.Window({
                    closable: true,
                    layout: 'fit',
                    modal: true,
                    title: '传染病报告卡--' + title,
                    items: [
                        {
                            xtype: 'iframepanel',
                            defaultSrc: "/js/infectious/infectious.show.html?" + $.param(row),
                            layout: 'fit',
                            style: 'top:0px;bottom:10px',
                            loadMask: true,
                            autoScroll: true,
                            listeners: {
                                message: function (f, data) {
                                    if (data.data == 'quit') {
                                        window.close();
                                        scope.cmp('query.grid').getStore().reload();
                                    }
                                }.createDelegate(this)
                            }
                        }
                    ]
                });
                window.show();
                window.maximize();
            }
        }

        //树增加双击事件
        //tree.addListener("dblclick", treedblclick);
        //增加新增按钮
        //scope.addParams(0, {
        //    text: '新增',
        //    iconCls: 'c_add',
        //    id: scope.id('addbtn'),
        //    handler: function (obj) {
        //        newReport({distid:scope.getDistrictid()}, '新增');
        //    }
        //});
        ModuleMgr.register(panel);
    });

