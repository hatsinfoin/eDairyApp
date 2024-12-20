export class StudentLeaveData {
	id: string;
	leaveId: string;
	academicYear: string;
	standardId: string;
	branchId: string;
	leaveReason: string;
	leaveBy: string;
	leaveType: string;
	leaveStartDate: string;
	leaveEndDate: string;

	// Constructor to initialize the properties (optional)
	constructor(
		leaveId: string,
		academicYear: string,
		standardId: string,
		branchId: string,
		leaveReason: string,
		leaveBy: string,
		leaveType: string,
		leaveStartDate: string,
		leaveEndDate: string
	) {
		this.leaveId = leaveId;
		this.academicYear = academicYear;
		this.standardId = standardId;
		this.branchId = branchId;
		this.leaveReason = leaveReason;
		this.leaveBy = leaveBy;
		this.leaveType = leaveType;
		this.leaveStartDate = leaveStartDate;
		this.leaveEndDate = leaveEndDate;
	}
}
