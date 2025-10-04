export interface EDairyAttachmentDTO {
  fileName: string;
  fileUrl: string;
  uploadedOn: Date;
}

export interface EDairyCommentDTO {
  commentId: string;
  userId: string;
  userRole: 'student' | 'teacher' | 'parent';
  commentText: string;
  commentBlob?: string; // Optional rich content
  timestamp: Date;
}

export interface GradeDTO {
  marks: number;
  maxMarks: number;
  feedback: string;
}

export interface SubmissionCommentDTO {
  userId: string;
  userType: 'student' | 'teacher' | 'parent';
  userName: string;
  comment: string;
  timestamp: Date;
  attachments?: EDairyAttachmentDTO[];
}

export interface SubmissionDetailsDTO {
  status: 'pending' | 'submitted' | 'late' | 'graded';
  submittedDate: Date;
  comments: SubmissionCommentDTO[];
  grade?: GradeDTO;
}

export interface StudentSubmissionDTO {
  studentId: string;
  studentName: string;
  submission: SubmissionDetailsDTO;
}

export interface EDairyDetailsDTO {
  title: string;
  description?: string;
  attachments?: EDairyAttachmentDTO[];
}

export interface SchooleDairy {
  id?: string; // MongoDB ObjectId (optional for new entries)
  academicYear: string;
  standardId: string;
  branchId: string;
  subjectId: string;
  teacherId: string;
  dateOfAssignment: Date;
  eDairyDetails: EDairyDetailsDTO;
  comments?: EDairyCommentDTO[];
  studentSubmissions?: StudentSubmissionDTO[];
  createdAt?: Date;
  updatedAt?: Date;
}
