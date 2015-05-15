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
        scope.cmp('query.grid').on('rowdblclick',function (obj, rowIndex, e) {
            var row = obj.store.getAt(rowIndex).data;
            newReport({ID:row['col1']}, '修改--'+row['col1']);
        });
        //隐藏id列
        scope.hideCol(1);
        //取得树
        var tree = scope.cmp('query.district');

        function treedblclick(data, event) {
            if(data.id.length==12){
                newReport({distid:data.id}, '新增');
            }
            return true;
        }

        function newReport(row, title) {
            row = !row ? {} : row;
            if(!row['ID'] && (!row['distid'] || row['distid'].length<12)){
                Ext.Msg.alert('选择行政区划', '请选择村委会或居委会!');
            }else{
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

