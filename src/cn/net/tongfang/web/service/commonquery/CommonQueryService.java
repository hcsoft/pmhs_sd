package cn.net.tongfang.web.service.commonquery;

import cn.net.tongfang.framework.security.demo.service.TaxempDetail;
import cn.net.tongfang.framework.security.vo.ExportDiv;
import cn.net.tongfang.framework.security.vo.ExportMain;
import cn.net.tongfang.framework.security.vo.ExportSub;
import cn.net.tongfang.framework.util.BusiUtils;
import cn.net.tongfang.framework.util.SystemInformationUtils;
import com.alibaba.druid.sql.ast.statement.SQLSelectItem;
import com.alibaba.druid.sql.dialect.sqlserver.ast.SQLServerSelect;
import com.alibaba.druid.sql.dialect.sqlserver.ast.SQLServerSelectQueryBlock;
import com.alibaba.druid.sql.dialect.sqlserver.parser.SQLServerExprParser;
import com.alibaba.druid.sql.dialect.sqlserver.parser.SQLServerSelectParser;
import com.alibaba.druid.sql.dialect.sqlserver.visitor.SQLServerOutputVisitor;
import com.google.gson.Gson;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.util.regex.Pattern;

/**
 * Created by oyx on 2015-04-24.
 */
public class CommonQueryService extends HibernateDaoSupport {

    private static Pattern procPattern = Pattern.compile("^\\s*\\{\\s*call .*", Pattern.CASE_INSENSITIVE);
    private static SimpleDateFormat fomarttime = new SimpleDateFormat(
            "yyyy-MM-dd hh:mm:ss");
    private SystemInformationUtils sysInfos;

    public SystemInformationUtils getSysInfos() {
        return sysInfos;
    }

    public void setSysInfos(SystemInformationUtils sysInfos) {
        this.sysInfos = sysInfos;
    }


    /**
     * 获得Webroot的路径
     *
     * @return
     */
    private String getWebRootAbsolutePath() {
        String path = null;
        String folderPath = CommonQueryService.class.getProtectionDomain()
                .getCodeSource().getLocation().getPath();
        System.out.println("folderPath==="+folderPath);
        if (folderPath.indexOf("WEB-INF") > 0) {
            path = folderPath.substring(0,
                    folderPath.indexOf("WEB-INF/classes"));
        }
        System.out.println("path==="+path);
        return path;
    }

    /**
     * 获得文件下载地址
     *
     * @return
     */
    private String getDownloadURL() {
        String ret = sysInfos.getVal(2);
        if (!ret.substring(ret.length() - 1, ret.length()).equals("/")) {
            ret += "/";
        }
        return ret;
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public Map<String, List> get_Export_Param(String type) throws Exception {
        Map<String, List> ret = new HashMap<String, List>();
        String where = "";
        if (type == null || !StringUtils.hasText(type)) {
            where = " 1=1 ";
        } else {
            where = " type=" + type;
        }
        System.out.println("where == " + where);
        List main = getSession().createQuery("select id ,name,orgparamtype,pageable,pagesize,widths from ExportMain where " + where + " order by id").list();
        List sub = getSession().createQuery("from ExportSub where ord>=0 and  mainid in (select id from ExportMain where " + where + " )  order by mainid , ord").list();
        ret.put("sub", sub);
        ret.put("main", main);
        return ret;
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public String sqlExport(String disid, String id, String name, Map params) throws Exception {
        TaxempDetail user = cn.net.tongfang.framework.security.SecurityManager
                .currentOperator();
        System.out.println("name==="+name);
        File f = File.createTempFile(name, ".xls", new File(getWebRootAbsolutePath() + "data/"));
        String fileName = f.getName();
        HSSFWorkbook wb = new HSSFWorkbook();
        FileOutputStream fileOut = new FileOutputStream(f);

        Sheet sheet1 = wb.createSheet(name);
        try {
            Connection conn = getSession().connection();
            Statement st = conn.createStatement();
            List sqllist = getSession().createQuery("from ExportMain where id = " + id + " order by id").list();
            List sublist = getSession().createQuery("from ExportSub where  mainid = " + id + " order by mainid , ord").list();
            Map<String, ExportSub> submap = new HashMap();
            for (int i = 0; i < sublist.size(); i++) {
                ExportSub vo = (ExportSub) sublist.get(i);
                submap.put(vo.getCode(), vo);
            }
            ExportMain main = (ExportMain) sqllist.get(0);
            String sql = main.getSql();
            Gson gs = new Gson();
            System.out.println("============" + gs.toJson(params));
            for (Iterator iter = params.keySet().iterator(); iter.hasNext(); ) {
                Object key = iter.next();
                System.out.println("=======key=====" + key);
                Object value = params.get(key);
                ExportSub vo = submap.get((String) key);
                sql = sql + " and " + vo.getColstr();
            }
            sql = sql + " " + main.getGroupby() + " " + main.getOrderby();

            sql = sql.replaceAll("\"", "'");
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, disid + "%");
            int paramidx = 2;
            for (Iterator iter = params.keySet().iterator(); iter.hasNext(); ) {
                Object key = iter.next();
                Object value = params.get(key);
                ExportSub vo = submap.get((String) key);
                if (vo.getType().equals("date")) {
                    stmt.setTimestamp(paramidx++, BusiUtils.parseDate((String) value));
                } else if (vo.getType().equals("string")) {
                    stmt.setString(paramidx++, (String) value);
                } else {
                    stmt.setObject(paramidx++, value);
                }
            }
            ResultSet rs = stmt.executeQuery();
            ResultSetMetaData rsMetaData = rs.getMetaData();
            int numberOfColumns = rsMetaData.getColumnCount();
            int rowidx = 0;
            Row rowtitle = sheet1.createRow((short) rowidx++);

            int cellidx = 0;
            for (int i = 1; i <= numberOfColumns; i++) {
                Cell cell = rowtitle.createCell(cellidx++);
                cell.setCellType(Cell.CELL_TYPE_STRING);
                cell.setCellValue(rsMetaData.getColumnLabel(i));
            }
            SimpleDateFormat fomart = new SimpleDateFormat("yyyy-MM-dd");
            while (rs.next() && rowidx < 65535) {
                Row row = sheet1.createRow((int) rowidx++);
                cellidx = 0;
                for (int i = 1; i <= numberOfColumns; i++) {
                    Class cls = Class.forName(rsMetaData.getColumnClassName(i));
                    Cell cell = row.createCell(cellidx++);
                    if (cls.isAssignableFrom(String.class)) {
                        cell.setCellType(Cell.CELL_TYPE_STRING);
                        cell.setCellValue(rs.getString(i));
                    } else if (cls.isAssignableFrom(Float.class)) {
                        cell.setCellType(Cell.CELL_TYPE_NUMERIC);
                        cell.setCellValue(rs.getFloat(i));
                    } else if (cls.isAssignableFrom(Integer.class)) {
                        cell.setCellType(Cell.CELL_TYPE_NUMERIC);
                        cell.setCellValue(rs.getInt(i));
                    } else if (cls.isAssignableFrom(Long.class)) {
                        cell.setCellType(Cell.CELL_TYPE_NUMERIC);
                        cell.setCellValue(rs.getLong(i));
                    } else if (cls.isAssignableFrom(Date.class)) {
                        cell.setCellType(Cell.CELL_TYPE_STRING);
                        Date obj = rs.getDate(i);
                        if (obj == null) {
                            cell.setCellValue("");
                        } else {
                            cell.setCellValue(fomart.format(obj));
                        }
                    } else if (cls.isAssignableFrom(java.sql.Timestamp.class)) {
                        cell.setCellType(Cell.CELL_TYPE_STRING);
                        Date obj = rs.getDate(i);
                        if (obj == null) {
                            cell.setCellValue("");
                        } else {
                            cell.setCellValue(fomart.format(obj));
                        }
                    } else {
                        cell.setCellValue(String.valueOf(rs.getObject(i)));
                    }
                }
            }
            st.close();
            wb.write(fileOut);
            fileOut.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return getDownloadURL() + fileName;
    }


    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public Map sqlListnew(String orgs, String id, Map params, Map pager)
            throws Exception {
        TaxempDetail user = cn.net.tongfang.framework.security.SecurityManager
                .currentOperator();
        while (orgs.endsWith("00")) {
            orgs = orgs.substring(0, orgs.length() - 2);
        }
        try {
            Connection conn = getSession().connection();
            List sqllist = getSession().createQuery(
                    "from ExportMain where id = " + id + " order by id").list();
            List sublist = getSession().createQuery(
                    "from ExportSub where  mainid = " + id
                            + " order by mainid , ord").list();
            Map<String, ExportSub> submap = new HashMap();
            for (int i = 0; i < sublist.size(); i++) {
                ExportSub vo = (ExportSub) sublist.get(i);
                submap.put(vo.getCode(), vo);
            }
            ExportMain main = (ExportMain) sqllist.get(0);
            String sql = main.getSql();
            String mainsql = sql;
            String countsql = "";
            String pagesql = "";
            if (!this.isproc(main.getSql())) {
                //处理SQL
                if ("in".equals(main.getOrgparamtype())) {
                    sql = sql.replaceAll("\\?", orgs);
                }
                mainsql = sql;
                for (Iterator iter = params.keySet().iterator(); iter.hasNext(); ) {
                    Object key = iter.next();
                    if (submap.containsKey(key)) {
                        ExportSub vo = submap.get(key);
                        if (vo.getType().equals("exists")) {
                            if ("1".equals(params.get(key).toString())) {
                                sql = sql + " and not " + vo.getColstr();
                            } else if ("2".equals(params.get(key).toString())) {
                                sql = sql + " and  " + vo.getColstr();
                            } else if ("0".equals(params.get(key).toString())) {
                                // 不加入
                            }
                        } else if (vo.getType().equals("select")) {
                            String value = params.get(key).toString();
                            Gson gs = new Gson();
                            Map options = gs
                                    .fromJson(vo.getColstr(), HashMap.class);
                            sql = sql + " and  " + options.get(value);
                        } else {
                            sql = sql + " and  " + vo.getColstr();
                        }
                    }
                }
                System.out.println("sql====" + sql);

                //生成countsql
                SQLServerSelectParser parser = new SQLServerSelectParser(sql);
                SQLServerSelect select = (SQLServerSelect)parser.select();
                SQLServerSelectQueryBlock countquery = (SQLServerSelectQueryBlock)select.getQuery();
                countquery.getSelectList().clear();
                countquery.getSelectList().add(new SQLSelectItem(new SQLServerExprParser("count(*)").primary()));

                StringBuffer strbuff = new StringBuffer();
                select.accept(new SQLServerOutputVisitor(strbuff));
                countsql = strbuff.toString();
                pagesql = sql.replaceAll("\"", "'");
                sql = sql + " " + main.getGroupby() + " " + main.getOrderby();
            }
            countsql = countsql.replaceAll("\"", "'");
            sql = sql.replaceAll("\"", "'");
            int paramidx = 1;
            Map ret = new HashMap();
            if (!main.getPageable()) {
                PreparedStatement stmt = conn.prepareStatement(sql,
                        ResultSet.TYPE_SCROLL_INSENSITIVE,
                        ResultSet.CONCUR_READ_ONLY);
                if ("like".equals(main.getOrgparamtype())) {
                    stmt.setString(paramidx++, orgs + "%");
                } else if (mainsql.indexOf("?") > 0) {
                    stmt.setString(paramidx++, orgs);
                } else {

                }
                if (this.isproc(main.getSql())) {
                    for (int i = 0; i < sublist.size(); i++) {
                        ExportSub sub = (ExportSub) sublist.get(i);
                        if (params.containsKey(sub.getCode())) {
                            stmt.setObject(paramidx++, params.get(sub.getCode()));
                        } else {
                            stmt.setObject(paramidx++, null);
                        }
                    }
                } else {
                    paramidx = procParams(params, submap, stmt, paramidx);
                }
                ResultSet rs = stmt.executeQuery();
                ResultSetMetaData rsMetaData = rs.getMetaData();
                int numberOfColumns = rsMetaData.getColumnCount();

                List retlist = new ArrayList();
                // 移动到最后一行,得到总数
                boolean flag = rs.first();
                int rowcount = 0;
                // 移动到取数位置
                while (flag) {
                    rowcount++;
                    // List row = new ArrayList();
                    retlist.add(getRow(rsMetaData, rs));
                    flag = rs.next();
                }
                ret.put("rows", retlist);
                ret.put("total", rowcount);
                stmt.close();
            } else {
                PreparedStatement countquery = conn.prepareStatement(countsql,
                        ResultSet.TYPE_SCROLL_INSENSITIVE,
                        ResultSet.CONCUR_READ_ONLY);
                if ("like".equals(main.getOrgparamtype())) {
                    countquery.setString(1, orgs + "%");
                    paramidx++;
                } else if (countsql.indexOf("\\?") > 0) {
                    countquery.setString(1, orgs);
                    paramidx++;
                } else {

                }
                System.out.println("countsql====" + countsql);
                paramidx = procParams(params, submap, countquery, paramidx);
                ResultSet countrs = countquery.executeQuery();
                int rowcount = 0;
                if (countrs.next()) {
                    rowcount = countrs.getInt(1);
                }
                int pageNum = Integer
                        .parseInt((String) pager.get("pagenumber"));
                int rowsNum = Integer.parseInt((String) pager.get("pagesize"));
                int pagecount = rowcount / rowsNum;
                int startNum = (pageNum - 1) * rowsNum + 1;
                if (startNum > rowcount) {
                    startNum = 1;
                    pageNum = 1;
                }
                int endNum = startNum + rowsNum;
                String selecttxt = pagesql.substring(pagesql.toLowerCase()
                                .indexOf("select") + 6,
                        pagesql.toLowerCase().indexOf("from"));
                String fromtxt = pagesql.substring(pagesql.toLowerCase()
                        .indexOf("from") + 4);
                pagesql = " SELECT * FROM  ( SELECT  * FROM (SELECT TOP "
                        + (endNum - 1) + " row_number() over("
                        + main.getOrderby() + ") rownum, " + selecttxt
                        + " from " + fromtxt + " " + main.getOrderby()
                        + ")zzzz where rownum>=" + (startNum)
                        + " )zzzzz order by rownum";
                PreparedStatement stmt = conn.prepareStatement(pagesql,
                        ResultSet.TYPE_SCROLL_INSENSITIVE,
                        ResultSet.CONCUR_READ_ONLY);
                if ("like".equals(main.getOrgparamtype())) {
                    stmt.setString(1, orgs + "%");
                    paramidx = 2;
                } else if (pagesql.indexOf("?") > 0) {
                    stmt.setString(1, orgs);
                    paramidx = 2;
                } else {

                }
                paramidx = procParams(params, submap, stmt, paramidx);
                ResultSet rs = stmt.executeQuery();
                ResultSetMetaData rsMetaData = rs.getMetaData();
                List retlist = new ArrayList();
                // 移动到取数位置
                while (rs.next()) {
                    // List row = new ArrayList();
                    retlist.add(getRow(rsMetaData, rs));
                }
                ret.put("rows", retlist);
                ret.put("currentpage", pageNum);
                ret.put("total", rowcount);
                ret.put("pages", pagecount);
                stmt.close();
            }
            conn.close();
            return ret;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    private int procParams(Map params, Map<String, ExportSub> submap, PreparedStatement stmt, int idx) throws Exception {
        int paramidx = idx;
        for (Iterator iter = params.keySet().iterator(); iter.hasNext(); ) {
            Object key = iter.next();
            if (submap.containsKey(key)) {
                Object value = params.get(key);
                ExportSub vo = submap.get(key);
                if (vo.getType().equals("date")) {
                    String str = (String) value;
                    if (str.indexOf("-") > 0) {
                        String[] strs = str.split("-");
                        stmt.setTimestamp(paramidx++, BusiUtils.parseDate(strs[0]));
                        stmt.setTimestamp(paramidx++, BusiUtils.parseDate(strs[1]));
                    } else {
                        stmt.setTimestamp(paramidx++, BusiUtils.parseDate(str));
                        stmt.setTimestamp(paramidx++, BusiUtils.parseDate(str));
                    }
                } else if (vo.getType().equals("time")) {
                    stmt.setDate(paramidx++,
                            new java.sql.Date(fomarttime.parse((String) value + " 00:00:00").getTime()));
                } else if (vo.getType().equals("string")) {
                    stmt.setString(paramidx++, (String) value);
                } else if (vo.getType().equals("exists")
                        || vo.getType().equals("select")) {
                    // 没有参数
                } else {
                    stmt.setFloat(paramidx++,
                            Float.parseFloat((String) value));
                }
            }
        }
        return paramidx;
    }

    private Map getRow(ResultSetMetaData rsMetaData, ResultSet rs) throws Exception {
        Map row = new HashMap();
        int numberOfColumns = rsMetaData.getColumnCount();
        for (int i = 1; i <= numberOfColumns; i++) {
            Class cls = Class.forName(rsMetaData
                    .getColumnClassName(i));
//            if (cls.isAssignableFrom(String.class)) {
//                row.put("col" + (i - 1), (rs.getString(i)));
//            } else if (cls.isAssignableFrom(Float.class)) {
//                row.put("col" + (i - 1), rs.getFloat(i));
//            } else if (cls.isAssignableFrom(Integer.class)) {
//                row.put("col" + (i - 1), rs.getInt(i));
//            } else if (cls.isAssignableFrom(Long.class)) {
//                row.put("col" + (i - 1), rs.getLong(i));
//            } else if (cls.isAssignableFrom(Date.class) || cls.isAssignableFrom(java.sql.Timestamp.class)) {
//                Date obj = rs.getDate(i);
//                row.put("col" + (i - 1), BusiUtils.format(obj));
//            } else {
                Object obj = rs.getObject(i);
                row.put("col" + (i - 1), (obj));
//            }
        }
        return row;
    }


    public ExportDiv getDiv(String id) throws Exception {
        Connection conn = getSession().connection();
        ExportDiv div = (ExportDiv) getSession().get(ExportDiv.class, Integer.parseInt(id));
        return div;
    }

    public List sqlListHead(String id) throws Exception {
        try {
            List retlist = new ArrayList();
            List sqllist = getSession().createQuery("from ExportMain where id = " + id + " order by id").list();
            ExportMain main = (ExportMain) sqllist.get(0);
            String sql = main.getSql();
            sql = sql.replaceAll("\"", "'");
            SQLServerSelectParser parser = new SQLServerSelectParser(sql);
            SQLServerSelect select = (SQLServerSelect)parser.select();
            SQLServerSelectQueryBlock query = (SQLServerSelectQueryBlock)select.getQuery();
            for (int i = 0; i < query.getSelectList().size(); i++) {
                Map colmap = new HashMap();
                colmap.put("field", "col" + (i+1));
                SQLSelectItem item = query.getSelectList().get(i);
                String title = item.getAlias().replaceAll("'","");
                if (title.trim().toLowerCase().startsWith("button:")) {
                    title = title.trim().substring(7);
                    colmap.put("format", "buttonColumn");
                }
                colmap.put("title", title);
                retlist.add(colmap);
            }
            return retlist;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public static boolean isproc(String sql) {
        return CommonQueryService.procPattern.matcher(sql).matches();
    }

    public static void main(String[] args) {
        System.out.println("============" + CommonQueryService.procPattern.matcher("{call queryRate(1,?,?,?) }").matches());
    }
}
