package cn.net.tongfang.framework.security.vo;

// Generated by Hibernate Tools 3.2.4.GA

/**
 * KidneySick generated by hbm2java
 */
public class KidneySick implements java.io.Serializable {

	private String id;
	private String medicalExamId;
	private Integer kidneySickId;

	public KidneySick() {
	}

	public KidneySick(String medicalExamId, Integer kidneySickId) {
		this.medicalExamId = medicalExamId;
		this.kidneySickId = kidneySickId;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMedicalExamId() {
		return this.medicalExamId;
	}

	public void setMedicalExamId(String medicalExamId) {
		this.medicalExamId = medicalExamId;
	}

	public Integer getKidneySickId() {
		return this.kidneySickId;
	}

	public void setKidneySickId(Integer kidneySickId) {
		this.kidneySickId = kidneySickId;
	}

}