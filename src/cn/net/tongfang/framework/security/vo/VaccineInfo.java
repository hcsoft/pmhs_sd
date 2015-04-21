package cn.net.tongfang.framework.security.vo;

// Generated by Hibernate Tools 3.2.4.GA

/**
 * VaccineInfo generated by hbm2java
 */
public class VaccineInfo implements java.io.Serializable {

	private Integer id;
	private String number;
	private String name;
	private String target;
	private Integer times;
	private String postion;
	private String path;
	private String dosage;
	private String namePng;
	private String description;

	public VaccineInfo() {
	}

	public VaccineInfo(String name, Integer times) {
		this.name = name;
		this.times = times;
	}

	public VaccineInfo(String number, String name, String target,
			Integer times, String postion, String path, String dosage,
			String namePng, String description) {
		this.number = number;
		this.name = name;
		this.target = target;
		this.times = times;
		this.postion = postion;
		this.path = path;
		this.dosage = dosage;
		this.namePng = namePng;
		this.description = description;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNumber() {
		return this.number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTarget() {
		return this.target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public Integer getTimes() {
		return this.times;
	}

	public void setTimes(Integer times) {
		this.times = times;
	}

	public String getPostion() {
		return this.postion;
	}

	public void setPostion(String postion) {
		this.postion = postion;
	}

	public String getPath() {
		return this.path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getDosage() {
		return this.dosage;
	}

	public void setDosage(String dosage) {
		this.dosage = dosage;
	}

	public String getNamePng() {
		return this.namePng;
	}

	public void setNamePng(String namePng) {
		this.namePng = namePng;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
