// Exams.ts
import { ExamSubjects } from './ExamSubjects.data';

export class Exams {
    id: string;
    examId: string;
    examName: string;
    examType: string;
    standardId: string;
    branchId: string;
    examDate: string;
    examGroupName: string;
    examResultsSujects: ExamSubjects[];

    constructor(
        id: string,
        examId: string,
        examName: string,
        examType: string,
        standardId: string,
        branchId: string,
        examDate: string,
        examGroupName: string,
        examResultsSujects: ExamSubjects[]
    ) {
        this.id = id;
        this.examId = examId;
        this.examName = examName;
        this.examType = examType;
        this.standardId = standardId;
        this.branchId = branchId;
        this.examDate = examDate;
        this.examGroupName = examGroupName;
        this.examResultsSujects = examResultsSujects;
    }
}
