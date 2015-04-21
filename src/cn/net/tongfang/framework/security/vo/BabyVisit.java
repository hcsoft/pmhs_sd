package cn.net.tongfang.framework.security.vo;

// Generated by Hibernate Tools 3.2.4.GA

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * BabyVisit generated by hbm2java
 */
public class BabyVisit implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String fileNo;
	private String sex;
	private Timestamp birthday;
	private String idcardNum;
	private String address;
	private String fname;
	private String foccupation;
	private String fphone;
	private String fbirthday;
	private String mname;
	private String moccupation;
	private String mphone;
	private String mbirthday;
	private String gestationalWeeks;
	private String pregnantSickOther;
	private String hospitalName;
	private String bornStatusOther;
	private String sleepy;
	private String sleepyState;
	private String monster;
	private String monsterOther;
	private String exam01;
	private BigDecimal exam02;
	private BigDecimal exam03;
	private String exam04;
	private BigDecimal exam05;
	private Integer exam06;
	private Integer exam07;
	private String faceColorOther;
	private BigDecimal exam09;
	private BigDecimal exam10;
	private String exam11;
	private String frontSkullOther;
	private String exam12;
	private String exam12other;
	private String exam13;
	private String exam13other;
	private String exam14;
	private String exam14other;
	private String exam15;
	private String exam15other;
	private String exam16;
	private String exam16other;
	private String exam17;
	private String exam17other;
	private String exam18;
	private String exam18other;
	private String exam19;
	private String exam19other;
	private String exam20;
	private String exam20other;
	private String babySkinsOther;
	private String exam22;
	private String exam22other;
	private String exam23;
	private String exam23other;
	private String exam24;
	private String exam24other;
	private Integer exam25;
	private String exam26;
	private String exam27;
	private String direct;
	private Timestamp visitDate;
	private String nextVisitPlace;
	private Timestamp nextVisitDate;
	private String visitDoctor;
	private String inputPersonId;
	private Timestamp inputDate;
	private String exam28;
	private String exam28Other;
	private BigDecimal exam29;
	private BigDecimal exam30;
	private Integer exam31;
	private Integer exam32;
	private String exam33;
	private Integer exam34;
	private String exam35;
	private String highRisk;
	private String highRiskRemark;
	private String execDistrictNum;
	private String highRiskSearch;
	private String foreignId;
	
	public BabyVisit() {
	}

	public BabyVisit(String fileNo) {
		this.fileNo = fileNo;
	}

	public BabyVisit(String id, String fileNo, String sex, Timestamp birthday,
			String idcardNum, String address, String fname, String foccupation,
			String fphone, String fbirthday, String mname, String moccupation,
			String mphone, String mbirthday, String gestationalWeeks,
			String pregnantSickOther, String hospitalName,
			String bornStatusOther, String sleepy, String sleepyState,
			String monster, String monsterOther, String exam01,
			BigDecimal exam02, BigDecimal exam03, String exam04,
			BigDecimal exam05, Integer exam06, Integer exam07,
			String faceColorOther, BigDecimal exam09, BigDecimal exam10,
			String exam11, String frontSkullOther, String exam12,
			String exam12other, String exam13, String exam13other,
			String exam14, String exam14other, String exam15,
			String exam15other, String exam16, String exam16other,
			String exam17, String exam17other, String exam18,
			String exam18other, String exam19, String exam19other,
			String exam20, String exam20other, String skinOther, String exam22,
			String exam22other, String exam23, String exam23other,
			String exam24, String exam24other, Integer exam25, String exam26,
			String exam27, String direct, Timestamp visitDate,
			String nextVisitPlace, Timestamp nextVisitDate, String visitDoctor,
			String inputPersonId, Timestamp inputDate, String exam28,
			String exam28Other, BigDecimal exam29, BigDecimal exam30,
			Integer exam31, Integer exam32, String exam33, Integer exam34,
			String exam35,String highRisk,String highRiskRemark,
			String execDistrictNum,String highRiskSearch,String foreignId) {
		super();
		this.id = id;
		this.fileNo = fileNo;
		this.sex = sex;
		this.birthday = birthday;
		this.idcardNum = idcardNum;
		this.address = address;
		this.fname = fname;
		this.foccupation = foccupation;
		this.fphone = fphone;
		this.fbirthday = fbirthday;
		this.mname = mname;
		this.moccupation = moccupation;
		this.mphone = mphone;
		this.mbirthday = mbirthday;
		this.gestationalWeeks = gestationalWeeks;
		this.pregnantSickOther = pregnantSickOther;
		this.hospitalName = hospitalName;
		this.bornStatusOther = bornStatusOther;
		this.sleepy = sleepy;
		this.sleepyState = sleepyState;
		this.monster = monster;
		this.monsterOther = monsterOther;
		this.exam01 = exam01;
		this.exam02 = exam02;
		this.exam03 = exam03;
		this.exam04 = exam04;
		this.exam05 = exam05;
		this.exam06 = exam06;
		this.exam07 = exam07;
		this.faceColorOther = faceColorOther;
		this.exam09 = exam09;
		this.exam10 = exam10;
		this.exam11 = exam11;
		this.frontSkullOther = frontSkullOther;
		this.exam12 = exam12;
		this.exam12other = exam12other;
		this.exam13 = exam13;
		this.exam13other = exam13other;
		this.exam14 = exam14;
		this.exam14other = exam14other;
		this.exam15 = exam15;
		this.exam15other = exam15other;
		this.exam16 = exam16;
		this.exam16other = exam16other;
		this.exam17 = exam17;
		this.exam17other = exam17other;
		this.exam18 = exam18;
		this.exam18other = exam18other;
		this.exam19 = exam19;
		this.exam19other = exam19other;
		this.exam20 = exam20;
		this.exam20other = exam20other;
		this.babySkinsOther = skinOther;
		this.exam22 = exam22;
		this.exam22other = exam22other;
		this.exam23 = exam23;
		this.exam23other = exam23other;
		this.exam24 = exam24;
		this.exam24other = exam24other;
		this.exam25 = exam25;
		this.exam26 = exam26;
		this.exam27 = exam27;
		this.direct = direct;
		this.visitDate = visitDate;
		this.nextVisitPlace = nextVisitPlace;
		this.nextVisitDate = nextVisitDate;
		this.visitDoctor = visitDoctor;
		this.inputPersonId = inputPersonId;
		this.inputDate = inputDate;
		this.exam28 = exam28;
		this.exam28Other = exam28Other;
		this.exam29 = exam29;
		this.exam30 = exam30;
		this.exam31 = exam31;
		this.exam32 = exam32;
		this.exam33 = exam33;
		this.exam34 = exam34;
		this.exam35 = exam35;
		this.highRisk = highRisk;
		this.highRiskRemark = highRiskRemark;
		this.execDistrictNum = execDistrictNum;
		this.highRiskSearch = highRiskSearch;
		this.foreignId = foreignId;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFileNo() {
		return this.fileNo;
	}

	public void setFileNo(String fileNo) {
		this.fileNo = fileNo;
	}

	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Timestamp getBirthday() {
		return this.birthday;
	}

	public void setBirthday(Timestamp birthday) {
		this.birthday = birthday;
	}

	public String getIdcardNum() {
		return this.idcardNum;
	}

	public void setIdcardNum(String idcardNum) {
		this.idcardNum = idcardNum;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFname() {
		return this.fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getFoccupation() {
		return this.foccupation;
	}

	public void setFoccupation(String foccupation) {
		this.foccupation = foccupation;
	}

	public String getFphone() {
		return this.fphone;
	}

	public void setFphone(String fphone) {
		this.fphone = fphone;
	}

	public String getFbirthday() {
		return this.fbirthday;
	}

	public void setFbirthday(String fbirthday) {
		this.fbirthday = fbirthday;
	}

	public String getMname() {
		return this.mname;
	}

	public void setMname(String mname) {
		this.mname = mname;
	}

	public String getMoccupation() {
		return this.moccupation;
	}

	public void setMoccupation(String moccupation) {
		this.moccupation = moccupation;
	}

	public String getMphone() {
		return this.mphone;
	}

	public void setMphone(String mphone) {
		this.mphone = mphone;
	}

	public String getMbirthday() {
		return this.mbirthday;
	}

	public void setMbirthday(String mbirthday) {
		this.mbirthday = mbirthday;
	}

	public String getGestationalWeeks() {
		return this.gestationalWeeks;
	}

	public void setGestationalWeeks(String gestationalWeeks) {
		this.gestationalWeeks = gestationalWeeks;
	}

	public String getPregnantSickOther() {
		return this.pregnantSickOther;
	}

	public void setPregnantSickOther(String pregnantSickOther) {
		this.pregnantSickOther = pregnantSickOther;
	}

	public String getHospitalName() {
		return this.hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public String getBornStatusOther() {
		return this.bornStatusOther;
	}

	public void setBornStatusOther(String bornStatusOther) {
		this.bornStatusOther = bornStatusOther;
	}

	public String getSleepy() {
		return this.sleepy;
	}

	public void setSleepy(String sleepy) {
		this.sleepy = sleepy;
	}

	public String getSleepyState() {
		return this.sleepyState;
	}

	public void setSleepyState(String sleepyState) {
		this.sleepyState = sleepyState;
	}

	public String getMonster() {
		return this.monster;
	}

	public void setMonster(String monster) {
		this.monster = monster;
	}

	public String getMonsterOther() {
		return this.monsterOther;
	}

	public void setMonsterOther(String monsterOther) {
		this.monsterOther = monsterOther;
	}

	public String getExam01() {
		return this.exam01;
	}

	public void setExam01(String exam01) {
		this.exam01 = exam01;
	}

	public BigDecimal getExam02() {
		return this.exam02;
	}

	public void setExam02(BigDecimal exam02) {
		this.exam02 = exam02;
	}

	public BigDecimal getExam03() {
		return this.exam03;
	}

	public void setExam03(BigDecimal exam03) {
		this.exam03 = exam03;
	}

	public String getExam04() {
		return this.exam04;
	}

	public void setExam04(String exam04) {
		this.exam04 = exam04;
	}

	public BigDecimal getExam05() {
		return this.exam05;
	}

	public void setExam05(BigDecimal exam05) {
		this.exam05 = exam05;
	}

	public Integer getExam06() {
		return this.exam06;
	}

	public void setExam06(Integer exam06) {
		this.exam06 = exam06;
	}

	public Integer getExam07() {
		return this.exam07;
	}

	public void setExam07(Integer exam07) {
		this.exam07 = exam07;
	}

	public String getFaceColorOther() {
		return this.faceColorOther;
	}

	public void setFaceColorOther(String faceColorOther) {
		this.faceColorOther = faceColorOther;
	}

	public BigDecimal getExam09() {
		return this.exam09;
	}

	public void setExam09(BigDecimal exam09) {
		this.exam09 = exam09;
	}

	public BigDecimal getExam10() {
		return this.exam10;
	}

	public void setExam10(BigDecimal exam10) {
		this.exam10 = exam10;
	}

	public String getExam11() {
		return this.exam11;
	}

	public void setExam11(String exam11) {
		this.exam11 = exam11;
	}

	public String getFrontSkullOther() {
		return this.frontSkullOther;
	}

	public void setFrontSkullOther(String frontSkullOther) {
		this.frontSkullOther = frontSkullOther;
	}

	public String getExam12() {
		return this.exam12;
	}

	public void setExam12(String exam12) {
		this.exam12 = exam12;
	}

	public String getExam12other() {
		return this.exam12other;
	}

	public void setExam12other(String exam12other) {
		this.exam12other = exam12other;
	}

	public String getExam13() {
		return this.exam13;
	}

	public void setExam13(String exam13) {
		this.exam13 = exam13;
	}

	public String getExam13other() {
		return this.exam13other;
	}

	public void setExam13other(String exam13other) {
		this.exam13other = exam13other;
	}

	public String getExam14() {
		return this.exam14;
	}

	public void setExam14(String exam14) {
		this.exam14 = exam14;
	}

	public String getExam14other() {
		return this.exam14other;
	}

	public void setExam14other(String exam14other) {
		this.exam14other = exam14other;
	}

	public String getExam15() {
		return this.exam15;
	}

	public void setExam15(String exam15) {
		this.exam15 = exam15;
	}

	public String getExam15other() {
		return this.exam15other;
	}

	public void setExam15other(String exam15other) {
		this.exam15other = exam15other;
	}

	public String getExam16() {
		return this.exam16;
	}

	public void setExam16(String exam16) {
		this.exam16 = exam16;
	}

	public String getExam16other() {
		return this.exam16other;
	}

	public void setExam16other(String exam16other) {
		this.exam16other = exam16other;
	}

	public String getExam17() {
		return this.exam17;
	}

	public void setExam17(String exam17) {
		this.exam17 = exam17;
	}

	public String getExam17other() {
		return this.exam17other;
	}

	public void setExam17other(String exam17other) {
		this.exam17other = exam17other;
	}

	public String getExam18() {
		return this.exam18;
	}

	public void setExam18(String exam18) {
		this.exam18 = exam18;
	}

	public String getExam18other() {
		return this.exam18other;
	}

	public void setExam18other(String exam18other) {
		this.exam18other = exam18other;
	}

	public String getExam19() {
		return this.exam19;
	}

	public void setExam19(String exam19) {
		this.exam19 = exam19;
	}

	public String getExam19other() {
		return this.exam19other;
	}

	public void setExam19other(String exam19other) {
		this.exam19other = exam19other;
	}

	public String getExam20() {
		return this.exam20;
	}

	public void setExam20(String exam20) {
		this.exam20 = exam20;
	}

	public String getExam20other() {
		return this.exam20other;
	}

	public void setExam20other(String exam20other) {
		this.exam20other = exam20other;
	}


	public String getBabySkinsOther() {
		return babySkinsOther;
	}

	public void setBabySkinsOther(String babySkinsOther) {
		this.babySkinsOther = babySkinsOther;
	}

	public String getExam22() {
		return this.exam22;
	}

	public void setExam22(String exam22) {
		this.exam22 = exam22;
	}

	public String getExam22other() {
		return this.exam22other;
	}

	public void setExam22other(String exam22other) {
		this.exam22other = exam22other;
	}

	public String getExam23() {
		return this.exam23;
	}

	public void setExam23(String exam23) {
		this.exam23 = exam23;
	}

	public String getExam23other() {
		return this.exam23other;
	}

	public void setExam23other(String exam23other) {
		this.exam23other = exam23other;
	}

	public String getExam24() {
		return this.exam24;
	}

	public void setExam24(String exam24) {
		this.exam24 = exam24;
	}

	public String getExam24other() {
		return this.exam24other;
	}

	public void setExam24other(String exam24other) {
		this.exam24other = exam24other;
	}

	public Integer getExam25() {
		return this.exam25;
	}

	public void setExam25(Integer exam25) {
		this.exam25 = exam25;
	}

	public String getExam26() {
		return this.exam26;
	}

	public void setExam26(String exam26) {
		this.exam26 = exam26;
	}

	public String getExam27() {
		return this.exam27;
	}

	public void setExam27(String exam27) {
		this.exam27 = exam27;
	}

	public String getDirect() {
		return this.direct;
	}

	public void setDirect(String direct) {
		this.direct = direct;
	}

	public Timestamp getVisitDate() {
		return this.visitDate;
	}

	public void setVisitDate(Timestamp visitDate) {
		this.visitDate = visitDate;
	}

	public String getNextVisitPlace() {
		return this.nextVisitPlace;
	}

	public void setNextVisitPlace(String nextVisitPlace) {
		this.nextVisitPlace = nextVisitPlace;
	}

	public Timestamp getNextVisitDate() {
		return this.nextVisitDate;
	}

	public void setNextVisitDate(Timestamp nextVisitDate) {
		this.nextVisitDate = nextVisitDate;
	}

	public String getVisitDoctor() {
		return this.visitDoctor;
	}

	public void setVisitDoctor(String visitDoctor) {
		this.visitDoctor = visitDoctor;
	}

	public String getInputPersonId() {
		return this.inputPersonId;
	}

	public void setInputPersonId(String inputPersonId) {
		this.inputPersonId = inputPersonId;
	}

	public Timestamp getInputDate() {
		return this.inputDate;
	}

	public void setInputDate(Timestamp inputDate) {
		this.inputDate = inputDate;
	}

	public String getExam28() {
		return exam28;
	}

	public void setExam28(String exam28) {
		this.exam28 = exam28;
	}

	public String getExam28Other() {
		return exam28Other;
	}

	public void setExam28Other(String exam28Other) {
		this.exam28Other = exam28Other;
	}

	public BigDecimal getExam29() {
		return exam29;
	}

	public void setExam29(BigDecimal exam29) {
		this.exam29 = exam29;
	}

	public BigDecimal getExam30() {
		return exam30;
	}

	public void setExam30(BigDecimal exam30) {
		this.exam30 = exam30;
	}

	public Integer getExam31() {
		return exam31;
	}

	public void setExam31(Integer exam31) {
		this.exam31 = exam31;
	}

	public Integer getExam32() {
		return exam32;
	}

	public void setExam32(Integer exam32) {
		this.exam32 = exam32;
	}

	public String getExam33() {
		return exam33;
	}

	public void setExam33(String exam33) {
		this.exam33 = exam33;
	}

	public Integer getExam34() {
		return exam34;
	}

	public void setExam34(Integer exam34) {
		this.exam34 = exam34;
	}

	public String getExam35() {
		return exam35;
	}

	public void setExam35(String exam35) {
		this.exam35 = exam35;
	}

	public String getHighRisk() {
		return highRisk;
	}

	public void setHighRisk(String highRisk) {
		this.highRisk = highRisk;
	}

	public String getHighRiskRemark() {
		return highRiskRemark;
	}

	public void setHighRiskRemark(String highRiskRemark) {
		this.highRiskRemark = highRiskRemark;
	}

	public String getExecDistrictNum() {
		return execDistrictNum;
	}

	public void setExecDistrictNum(String execDistrictNum) {
		this.execDistrictNum = execDistrictNum;
	}

	public String getHighRiskSearch() {
		return highRiskSearch;
	}

	public void setHighRiskSearch(String highRiskSearch) {
		this.highRiskSearch = highRiskSearch;
	}

	public String getForeignId() {
		return foreignId;
	}

	public void setForeignId(String foreignId) {
		this.foreignId = foreignId;
	}
	
}
