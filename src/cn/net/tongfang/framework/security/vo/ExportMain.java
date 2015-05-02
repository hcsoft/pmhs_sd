package cn.net.tongfang.framework.security.vo;

/**
 * ExportMain entity. @author MyEclipse Persistence Tools
 */

public class ExportMain implements java.io.Serializable {

	// Fields

	private Integer id;
	private String name;
	private String sql;
	private String orderby;
	private String groupby;
	private Integer type;
	private String orgparamtype;
	private Boolean pageable;
	private Integer pagesize;
	private String widths;

	// Constructors

	/** default constructor */
	public ExportMain() {
	}

	/** minimal constructor */
	public ExportMain(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public ExportMain(Integer id, String name, String sql, String orderby,
			String groupby, Integer type, String orgparamtype,
			Boolean pageable, Integer pagesize, String widths) {
		this.id = id;
		this.name = name;
		this.sql = sql;
		this.orderby = orderby;
		this.groupby = groupby;
		this.type = type;
		this.orgparamtype = orgparamtype;
		this.pageable = pageable;
		this.pagesize = pagesize;
		this.widths = widths;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSql() {
		return this.sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public String getOrderby() {
		return this.orderby;
	}

	public void setOrderby(String orderby) {
		this.orderby = orderby;
	}

	public String getGroupby() {
		return this.groupby;
	}

	public void setGroupby(String groupby) {
		this.groupby = groupby;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getOrgparamtype() {
		return this.orgparamtype;
	}

	public void setOrgparamtype(String orgparamtype) {
		this.orgparamtype = orgparamtype;
	}

	public Boolean getPageable() {
		return this.pageable;
	}

	public void setPageable(Boolean pageable) {
		this.pageable = pageable;
	}

	public Integer getPagesize() {
		return this.pagesize;
	}

	public void setPagesize(Integer pagesize) {
		this.pagesize = pagesize;
	}

	public String getWidths() {
		return this.widths;
	}

	public void setWidths(String widths) {
		this.widths = widths;
	}

}