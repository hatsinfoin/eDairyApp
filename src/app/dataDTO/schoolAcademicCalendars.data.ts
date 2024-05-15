export class AcademicCalendar {
	_id: string;
	standardId: string;
	branchId: string;
	academicStdTopics: AcademicTopic[];
  }

  interface AcademicTopic {
	acdTopicName: string;
	topics: Topic[];
  }

  interface Topic {
	topicID: string;
	topicName: string;
	topicStatus: string;
  }