package cn.net.tongfang.web.service;

import cn.net.tongfang.framework.security.demo.service.TaxempDetail;
import cn.net.tongfang.framework.util.BusiUtils;
import cn.net.tongfang.web.service.bo.InfectionReportBO;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.orm.hibernate3.SessionFactoryUtils;

import java.util.HashMap;
import java.util.Map;

public class InfectionReportService extends HealthMainService<InfectionReportBO> {

	@Override
	public String save(InfectionReportBO data) throws Exception {
		return save_(data);
	}

	@Override
	public Object get(InfectionReportBO data) throws Exception {
		return get_(data);
	}

	public Object newSave(Map data) throws Exception{
		Map ret = new HashMap();

		try {
			TaxempDetail user = cn.net.tongfang.framework.security.SecurityManager.currentOperator();
			if(data.containsKey("ID") && Integer.parseInt((String)data.get("ID")) >0 ){
                int id = Integer.parseInt((String) data.get("ID"));
                //有主键,进行update
                String cols = "";
                String values = "";
				Map notupdateMap = new HashMap();
				notupdateMap.put("dReportDate",true);
				notupdateMap.put("dInputDate",true);
				notupdateMap.put("sInputPerson",true);
				notupdateMap.put("dUploadDate",true);
				notupdateMap.put("sUploadPerson",true);
				notupdateMap.put("sCheckPerson",true);
				notupdateMap.put("dCheckDate",true);
				notupdateMap.put("Downloaded",true);
				notupdateMap.put("OrgID",true);
                for (Object key : data.keySet()) {
                    String keystr = (String) key;
					if(!notupdateMap.containsKey(key)) {
						cols = cols + "," + keystr + " = ? ";
					}

                }
                cols =  cols.substring(1) ;
                String updatesql = " update  Center_Infectious set  " + cols + " where ID = ?  ";
                System.out.println("updatesql====");
                System.out.println(updatesql);
                SQLQuery query = getSession().createSQLQuery(updatesql);
                int idx = 0;
                for (Object key : data.keySet()) {
                    Object obj = data.get(key);
					if(!notupdateMap.containsKey(key)) {
						String s = (String)obj;

						if(s!=null && BusiUtils.isDate(s)){
							System.out.println("s====" + s);
							query.setParameter(idx++, BusiUtils.parseDate(s));

						}else {
							query.setParameter(idx++, obj);
						}
					}
                }
                query.setParameter(idx++, id);
                query.executeUpdate();
                ret.put("ID",id);
            }else {
                //没有主键,进行insert
                SQLQuery idquery = getSession().createSQLQuery(" { call p_center_ids('Center_Infectious')}");
                int id = (Integer)idquery.list().get(0);
                String cols = "ID,dInputDate,sInputPerson,OrgID";
                String values = id+",getdate(),'" + user.getUsername() + "',"+user.getOrgId();
                for (Object key : data.keySet()) {
                    String keystr = (String) key;
                    cols = cols + "," + keystr;
                    values = values + ",?";
                }
                cols = "(" + cols + ")";
                values = "(" + values + ")";
                String insertsql = " INSERT INTO Center_Infectious " + cols + " values " + values;
                System.out.println("insertsql====");
                System.out.println(insertsql);
                SQLQuery query = getSession().createSQLQuery(insertsql);
                int idx = 0;
                for (Object key : data.keySet()) {
                    Object obj = data.get(key);
					String s = (String)obj;
					if(s!=null && BusiUtils.isDate(s)){
						System.out.println("s====" + s);
						query.setParameter(idx++, BusiUtils.parseDate(s));

					}else {
						query.setParameter(idx++, obj);
					}
                }
                query.executeUpdate();
                ret.put("ID",id);
            }
			ret.put("success",true);
		} catch (Exception e) {
			e.printStackTrace();
			ret.put("success", false);
			ret.put("msg", "保存出错:" + e.getMessage());
		}
		return ret;
	}

	public Map newGet(int id ) throws Exception{
		QueryRunner run = new QueryRunner(SessionFactoryUtils.getDataSource(getSessionFactory()));
		return run.query("select * from Center_Infectious where id = ?",new MapListHandler(), id ).get(0);
	}

}
