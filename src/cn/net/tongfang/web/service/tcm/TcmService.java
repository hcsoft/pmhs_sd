package cn.net.tongfang.web.service.tcm;

import cn.net.tongfang.framework.security.bo.NewQryCondition;
import cn.net.tongfang.framework.security.demo.service.TaxempDetail;
import cn.net.tongfang.framework.util.service.vo.PagingParam;
import cn.net.tongfang.framework.util.service.vo.PagingResult;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.ArrayListHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.log4j.Logger;
import org.hibernate.SQLQuery;
import org.springframework.orm.hibernate3.SessionFactoryUtils;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class TcmService extends HibernateDaoSupport {
    private static final Logger log = Logger.getLogger(TcmService.class);

    // 列表
    public PagingResult<Map> findChildren(NewQryCondition cod, PagingParam pp)
            throws Exception {
        if (pp == null)
            pp = new PagingParam();
        try {
            CallableStatement proc = getSession().connection().prepareCall(
                    "{ call Proc_TCM(?,?,?,?,?,?,?) }");
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            proc.setString(1, cod.getDistrict());
            String begindate = null;
            if (StringUtils.hasText(cod.getValueByName("begindate"))) {
                begindate = df.format(Long.parseLong(cod.getValueByName("begindate")));
            }
            proc.setString(2, begindate);
            String enddate = null;
            if (StringUtils.hasText(cod.getValueByName("begindate"))) {
                enddate = df.format(Long.parseLong(cod.getValueByName("enddate")));
            }
            proc.setString(3, enddate);
            proc.setString(4, cod.getParamsStr());
            proc.setInt(5, pp.getStart());
            proc.setInt(6, pp.getLimit());
            proc.registerOutParameter(7, Types.INTEGER);
            ResultSet rs = proc.executeQuery();

            List<Map> ret = new ArrayList();
            ResultSetMetaData md = rs.getMetaData();
            int columnCount = md.getColumnCount();
            while (rs.next()) {
                Map row = new HashMap();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(md.getColumnName(i), rs.getObject(i));
                }
                ret.add(row);
            }

            int totalSize = proc.getInt(7);
            return new PagingResult<Map>(totalSize, ret);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
    }

    // 查询明细
    public List finddetail(String type, String id)
            throws Exception {
        List<Map> ret = new ArrayList();
        try {
            CallableStatement proc = getSession().connection().prepareCall(
                    "{ call Proc_TCM_detail(?,?) }");
            proc.setString(1, type);
            proc.setString(2, id);
            ResultSet rs = proc.executeQuery();
            ResultSetMetaData md = rs.getMetaData();
            int columnCount = md.getColumnCount();
            while (rs.next()) {
                Map row = new HashMap();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(md.getColumnName(i), rs.getObject(i));
                }
                ret.add(row);
            }
            return ret;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public List getQuestions() throws Exception {
        try {
            QueryRunner run = new QueryRunner(SessionFactoryUtils.getDataSource(getSessionFactory()));
            return run.query("select * from tcm_questions   order by ord", new MapListHandler());
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public List getResults() throws Exception {
        try {
            QueryRunner run = new QueryRunner(SessionFactoryUtils.getDataSource(getSessionFactory()));
            return run.query("select * from tcm_result   order by id", new MapListHandler());
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public String getTel() throws Exception {
        QueryRunner run = new QueryRunner(SessionFactoryUtils.getDataSource(getSessionFactory()));
        Object[] rs = run.query("select TelNumber from Organization  where id = ?  order by id ", new ArrayHandler(), cn.net.tongfang.framework.security.SecurityManager.currentOperator().getOrgId());
        return String.valueOf(rs[0]);
    }

    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public Object getOldman(String id) throws Exception {
        QueryRunner run = new QueryRunner(SessionFactoryUtils.getDataSource(getSessionFactory()));
        List rs = run.query("select b.name  , t.fileno , json 'json' from tcm_oldman_check t join  healthfile b  on t.fileno = b.fileno " +
                " where   id = ?  order by id ", new MapListHandler(), id);
        return rs.get(0);
    }

    @Transactional
    public String delOldman(String id) throws Exception {
        QueryRunner run = new QueryRunner(SessionFactoryUtils.getDataSource(getSessionFactory()));
        int rs = run.update(" delete from tcm_oldman_check  where id = ?  ", id);
        return "删除成功!";
    }

    @Transactional
    public String saveOldman(Map data) throws Exception {
        System.out.println("saveingdata======================");
        TaxempDetail user = cn.net.tongfang.framework.security.SecurityManager.currentOperator();
        Map ret = new HashMap();
        String id = (String) data.get("id");
        if (StringUtils.hasText(id)) {
            SQLQuery query =  getSession().createSQLQuery(" update  tcm_oldman_check set " +
                    "score1 = ?," +
                    "score2 = ?," +
                    "score3 = ? ," +
                    "score4 = ? ," +
                    "score5 = ? ," +
                    "score6 = ? ," +
                    "score7 = ? ," +
                    "score8 = ? ," +
                    "score9 = ? ," +
                    "result = ? ," +
                    "json = ?  where id = ?");
            query.setInteger(0, Integer.valueOf((String) data.get("score1")));
            query.setInteger(1, Integer.valueOf((String)data.get("score2")));
            query.setInteger(2, Integer.valueOf((String)data.get("score3")));
            query.setInteger(3, Integer.valueOf((String)data.get("score4")));
            query.setInteger(4, Integer.valueOf((String)data.get("score5")));
            query.setInteger(5, Integer.valueOf((String)data.get("score6")));
            query.setInteger(6, Integer.valueOf((String)data.get("score7")));
            query.setInteger(7, Integer.valueOf((String)data.get("score8")));
            query.setInteger(8, Integer.valueOf((String)data.get("score9")));
            query.setString(9, (String) data.get("result"));
            query.setString(10, (String) data.get("json"));
            query.setString(11, id);
            query.executeUpdate();
        } else {
            try {
                id = UUID.randomUUID().toString();
                String sql = "INSERT INTO tcm_oldman_check " +
                        "(id,fileno,checkdate,inputpersonid,inputorg," +
                        "score1,score2,score3,score4,score5,score6,score7,score8,score9,result,json,checkdatetime)" +
                        " VALUES (?,?,convert(date,getdate()),?,?" +
                        ",?,?,?,?,?,?,?,?,?,?,?,getdate())";
                SQLQuery query =  getSession().createSQLQuery(sql);
                query.setString(0, id);
                query.setString(1, (String) data.get("fileno"));
                query.setString(2, user.getTaxempname());
                query.setInteger(3, user.getOrgId());
                query.setInteger(4, Integer.valueOf((String) data.get("score1")));
                query.setInteger(5, Integer.valueOf((String)data.get("score2")));
                query.setInteger(6, Integer.valueOf((String)data.get("score3")));
                query.setInteger(7, Integer.valueOf((String)data.get("score4")));
                query.setInteger(8, Integer.valueOf((String)data.get("score5")));
                query.setInteger(9, Integer.valueOf((String)data.get("score6")));
                query.setInteger(10, Integer.valueOf((String)data.get("score7")));
                query.setInteger(11, Integer.valueOf((String)data.get("score8")));
                query.setInteger(12, Integer.valueOf((String)data.get("score9")));
                query.setString(13, (String) data.get("result"));
                query.setString(14, (String) data.get("json"));
                query.executeUpdate();
            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            }
        }
        return id;
    }
}
