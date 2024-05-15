export class SchoolTimetable {
	_id: String | null;
	branchId: String;
	standaredId: String;
	daySchedule: DaySchedule[];
}

interface DaySchedule {
	day: string;
	periods: Period[];
}

interface Period {
	subject: string;
	timing: string;
}