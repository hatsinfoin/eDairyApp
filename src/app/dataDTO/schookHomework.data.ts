 export class Homework {
  id: string | null;
  homeWorkId: string;
  academicYear: string;
  standardId: string;
  branchId: string;
  eDairyDetails: string;
  subjectId: string;
  dateOfAssignment: string;

  // Static factory method
  static createDefaultHomework(): Homework {
    return {
      id: null,
      homeWorkId: '',
      academicYear: '',
      standardId: '',
      branchId: '',
      eDairyDetails: '',
      subjectId: '',
      dateOfAssignment: ''
    };
  }
}
