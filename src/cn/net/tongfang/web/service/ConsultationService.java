package cn.net.tongfang.web.service;

import cn.net.tongfang.framework.security.demo.service.TaxempDetail;
import cn.net.tongfang.framework.util.EncryptionUtils;
import cn.net.tongfang.web.service.bo.ConsultationBO;

public class ConsultationService extends HealthMainService<ConsultationBO> {

	@Override
	public String save(ConsultationBO data) throws Exception {
		data.setFileNo(EncryptionUtils.encry(data.getFileNo()));
		TaxempDetail user = cn.net.tongfang.framework.security.SecurityManager.currentOperator();
		data.setExecDistrictNum(user.getDistrictId());
		return save_(data);
	}

	@Override
	public Object get(ConsultationBO data) throws Exception {
		data = (ConsultationBO)get_(data);
		data.setFileNo(EncryptionUtils.decipher(data.getFileNo()));
		return data;
	}

}
