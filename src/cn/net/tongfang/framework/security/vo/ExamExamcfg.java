package cn.net.tongfang.framework.security.vo;

// Generated 2013-11-10 1:20:52 by Hibernate Tools 3.4.0.CR1

/**
 * ExamExamcfg generated by hbm2java
 */
public class ExamExamcfg implements java.io.Serializable {

	private String id;
	private String examname;
	private String itemname;
	private String item;
	private String defaultvalue;

	public ExamExamcfg() {
	}

	public ExamExamcfg(String id, String examname, String itemname) {
		this.id = id;
		this.examname = examname;
		this.itemname = itemname;
	}

	public ExamExamcfg(String id, String examname, String itemname, String item, String defaultvalue) {
		this.id = id;
		this.examname = examname;
		this.itemname = itemname;
		this.item = item;
		this.defaultvalue = defaultvalue;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getExamname() {
		return this.examname;
	}

	public void setExamname(String examname) {
		this.examname = examname;
	}

	public String getItemname() {
		return this.itemname;
	}

	public void setItemname(String itemname) {
		this.itemname = itemname;
	}

	public String getItem() {
		return this.item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public String getDefaultvalue() {
		return this.defaultvalue;
	}

	public void setDefaultvalue(String defaultvalue) {
		this.defaultvalue = defaultvalue;
	}

}