// ExamStudentResults.ts
export class ExamStudentResults {
    id: string;
    examId: string;
    branchId: string;
    stRollNo: string;
    marksObtained: number;

    constructor(id: string, examId: string, branchId: string, stRollNo: string, marksObtained: number) {
        this.id = id;
        this.examId = examId;
        this.branchId = branchId;
        this.stRollNo = stRollNo;
        this.marksObtained = marksObtained;
    }
}
