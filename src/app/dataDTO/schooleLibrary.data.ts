interface LibReferenceBook {
	refid: string;
	refName: string;
	refDetails: string;
	refLink: string;
  }
  
  interface LibReferenceVideos {
	refid: string;
	refName: string;
	refDetails: string;
	refLink: string;
  }
  
  interface SubjectLibraryDetails {
	_id: string;
	subjectsId: string;
	subjectName: string;
	summaryDetails: string;
	libReferenceBook: LibReferenceBook[];
	LibReferencevideos: LibReferenceVideos[];
  }
  
  export class  SchoolLibrary {
	_id: string;
	standardId: string;
	branchId: string;
	subjectLibraryDetails: SubjectLibraryDetails[];
  }
  