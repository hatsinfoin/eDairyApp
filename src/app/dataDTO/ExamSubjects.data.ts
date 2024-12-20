import { ExamStudentResults } from './ExamStudentResults.data';

// ExamSubjects.ts
export class ExamSubjects {
    id: string;
    examId: string;
    subjectsId: string;
    standardId: string;
    examStudentResults: ExamStudentResults[];
    constructor(id: string, examId: string, subjectsId: string, standardId: string, examStudentResults: ExamStudentResults[]) {
        this.id = id;
        this.examId = examId;
        this.subjectsId = subjectsId;
        this.standardId = standardId;
        this.examStudentResults = examStudentResults;
    }
}
