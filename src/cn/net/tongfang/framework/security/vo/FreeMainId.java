package cn.net.tongfang.framework.security.vo;

/**
 * FreeMainId entity. @author MyEclipse Persistence Tools
 */

public class FreeMainId implements java.io.Serializable {

	// Fields

	private String fileno;
	private String examname;
	private Integer gravity;

	// Constructors

	/** default constructor */
	public FreeMainId() {
	}

	/** full constructor */
	public FreeMainId(String fileno, String examname, Integer gravity) {
		this.fileno = fileno;
		this.examname = examname;
		this.gravity = gravity;
	}

	// Property accessors

	public String getFileno() {
		return this.fileno;
	}

	public void setFileno(String fileno) {
		this.fileno = fileno;
	}

	public String getExamname() {
		return this.examname;
	}

	public void setExamname(String examname) {
		this.examname = examname;
	}

	public Integer getGravity() {
		return this.gravity;
	}

	public void setGravity(Integer gravity) {
		this.gravity = gravity;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof FreeMainId))
			return false;
		FreeMainId castOther = (FreeMainId) other;

		return ((this.getFileno() == castOther.getFileno()) || (this
				.getFileno() != null && castOther.getFileno() != null && this
				.getFileno().equals(castOther.getFileno())))
				&& ((this.getExamname() == castOther.getExamname()) || (this
						.getExamname() != null
						&& castOther.getExamname() != null && this
						.getExamname().equals(castOther.getExamname())))
				&& ((this.getGravity() == castOther.getGravity()) || (this
						.getGravity() != null && castOther.getGravity() != null && this
						.getGravity().equals(castOther.getGravity())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getFileno() == null ? 0 : this.getFileno().hashCode());
		result = 37 * result
				+ (getExamname() == null ? 0 : this.getExamname().hashCode());
		result = 37 * result
				+ (getGravity() == null ? 0 : this.getGravity().hashCode());
		return result;
	}

}