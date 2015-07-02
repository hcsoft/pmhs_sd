package cn.net.tongfang.web.util;

import cn.net.tongfang.framework.util.service.ModuleMgr;
import com.linuxense.javadbf.DBFField;
import com.linuxense.javadbf.DBFWriter;
import org.apache.commons.beanutils.PropertyUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by oyx on 2015-06-06.
 */
public class DbfUtil {
    static String[] G_BIRTH_CFG = {
            "USERNAME,C",
            "JG_ZC,C",
            "CF_XM,C",
            "CF_BH,C",
            "CF_JDSJ,D",
            "CF_BAH,C",
            "CF_ZJLX,C",
            "CF_ZJHM,C",
            "CF_CSRQ,D",
            "CF_GJ,C",
            "CF_MZ,C",
            "CF_HJ_S,C",
            "CF_HJ_SD,C",
            "CF_HJ_XQ,C",
            "CF_HJ_QHDM,C",
            "CF_JZD_S,C",
            "CF_JZD_SD,C",
            "CF_JZD_XQ,C",
            "CF_JZ_QHDM,C",
            "CF_YC,N",
            "CF_CC,N",
            "CF_GWYS,C",
            "CF_FMDD,C",
            "CF_FMFS,C",
            "CF_FMRQ,D",
            "FM_XB1,C",
            "FM_RSJJ1,C",
            "FM_PF1,C",
            "FM_XB2,C",
            "FM_RSJJ2,C",
            "FM_PF2,C",
            "FM_XB3,C",
            "FM_RSJJ3,C",
            "FM_PF3,C",
            "FM_XB4,C",
            "FM_RSJJ4,C",
            "FM_PF4,C",
            "JG_DWFZR,C",
            "JG_TBR,C",
            "JG_LXDH,C",
            "JG_BCRQ,D"
    };

    public static String getPath(){
        String folderPath = DbfUtil.class.getProtectionDomain()
                .getCodeSource().getLocation().getPath();
        String path = "";
        System.out.println("========folderPath====" + folderPath);
        if (folderPath.indexOf("WEB-INF") > 0) {
            path = folderPath.substring(0,
                    folderPath.indexOf("WEB-INF/classes"));
        }
        return path + "data/";
    }

    public static void main(String[] args) throws Exception{
        writeDbf(null);
    }

    public static String writeDbf(List data) throws Exception{
        DBFField fields[] = new DBFField[ G_BIRTH_CFG.length];
        for(int i = 0 ; i <G_BIRTH_CFG.length;i++){
            DBFField field = new DBFField();
            String[] datas = G_BIRTH_CFG[i].split(",");
            Field f = DBFField.class.getField("FIELD_TYPE_" + datas[1]);
            field.setFieldName(datas[0]);
            field.setDataType(f.getByte(null)); // and set its type
            if(datas[1].equals("C")){
                field.setFieldLength(70);
            }else if(datas[1].equals("N")){
                field.setFieldLength(5);
            }
            fields[i] = field;
        }

        DBFWriter writer = new DBFWriter();
        writer.setCharactersetName("GBK");
        writer.setFields(fields);
        //写入数据
        if(data !=null && data.size()>0) {
            for (int i = 0; i < data.size(); i++) {
                Object[] row = (Object[]) data.get(i);
                row[19] = ((Integer)row[19]).doubleValue();
                row[20] = ((Integer)row[20]).doubleValue();
                writer.addRecord(row);
            }

        }


        File dbf = File.createTempFile("dbf", ".dbf", new File(getPath()));
        FileOutputStream fos = new FileOutputStream( dbf);
        writer.write(fos);
        fos.close();
        return dbf.getName();
    }
}
