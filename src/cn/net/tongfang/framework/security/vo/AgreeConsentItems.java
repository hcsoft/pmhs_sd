package cn.net.tongfang.framework.security.vo;

// Generated by Hibernate Tools 3.2.4.GA

/**
 * CheckDirect generated by hbm2java
 */
public class AgreeConsentItems implements java.io.Serializable {

	private String id;
	private String diseaseAndHearScreenConsentId;
	private Integer agreeId;

	public AgreeConsentItems() {
	}

	public AgreeConsentItems(String id, String diseaseAndHearScreenConsentId,
			Integer agreeId) {
		super();
		this.id = id;
		this.diseaseAndHearScreenConsentId = diseaseAndHearScreenConsentId;
		this.agreeId = agreeId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDiseaseAndHearScreenConsentId() {
		return diseaseAndHearScreenConsentId;
	}

	public void setDiseaseAndHearScreenConsentId(
			String diseaseAndHearScreenConsentId) {
		this.diseaseAndHearScreenConsentId = diseaseAndHearScreenConsentId;
	}

	public Integer getAgreeId() {
		return agreeId;
	}

	public void setAgreeId(Integer agreeId) {
		this.agreeId = agreeId;
	}

	

}
