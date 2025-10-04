import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  aboutUs = {
    title: 'About Us',
    description: 'We are committed to providing a nurturing learning environment.',
    image: 'assets/images/AboutUs.jpg'
  };

  curriculum = {
    title: 'Curriculum',
    description: 'A dynamic and challenging curriculum designed for holistic development.',
    image: 'assets/images/Curriculum.jpg',
    tableData: [
      {
        grade: 'Kindergarten',
        coreSubjects: 'Language Arts, Mathematics, Science, Social Studies',
        additionalSubjects: 'Art & Craft, Music, Physical Education',
        extraCurricular: 'Dance, Storytelling, Group Activities'
      },
      {
        grade: 'Grade 1-2',
        coreSubjects: 'English, Mathematics, Environmental Science, Social Studies',
        additionalSubjects: 'Music, Art, Physical Education, Computer Science',
        extraCurricular: 'Drama, Team Sports, Library Reading'
      },
      {
        grade: 'Grade 3-4',
        coreSubjects: 'English, Mathematics, Science, History, Geography',
        additionalSubjects: 'Art, Computer Science, Music, Physical Education',
        extraCurricular: 'Chess, Robotics, Dance, Yoga'
      }
    ]
  };

  admissions = {
    title: 'Admissions',
    description: 'Enroll your child in our institution today. Learn more about the process.',
    image: 'assets/images/Admissions.jpg',
    tableData: [
      {
        grade: 'Kindergarten',
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        academicYear: '2025-2026'
      },
      {
        grade: 'Grade 1-2',
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        academicYear: '2025-2026'
      }
    ]
  };

  academics = {
    title: 'Academics',
    description: 'A strong focus on academics, critical thinking, and creativity.',
    image: 'assets/images/academics.jpg'
  };

  infrastructure = {
    title: 'Infrastructure',
    description: 'State-of-the-art facilities that create the ideal learning environment.',
    image: 'assets/images/Infrastructure.jpg'
  };

  extraCurricular = {
    title: 'Extra Curricular',
    description: 'Building well-rounded individuals through sports, arts, and leadership.',
    image: 'assets/images/extra-curricular.jpg'
  };

  contactUs = {
    title: 'Contact Us',
    description: 'Get in touch for any inquiries. We are here to help!',
    image: 'assets/images/contact-us.jpg'
  };

  routeMap = {
    title: 'Route Map',
    description: 'Find us easily using the interactive route map.',
    image: 'assets/images/route-map.jpg'
  };

  newsletter = {
    title: 'Newsletter',
    description: 'Stay updated with the latest news and events at our school.',
    image: 'assets/images/newsletter.jpg'
  };

  followUs = {
    title: 'Follow Us',
    description: 'Follow us on social media for real-time updates.',
    image: 'assets/images/follow-us.jpg'
  };

  landingSections = [
    {
      anchorId: 'about-us',
      title: this.aboutUs.title,
      image: this.aboutUs.image,
      description: this.aboutUs.description
    },
    {
      anchorId: 'curriculum',
      title: this.curriculum.title,
      image: this.curriculum.image,
      description: this.curriculum.description,
      tableHeaders: ['Grade', 'Core Subjects', 'Additional Subjects', 'Extracurricular Activities'],
      tableKeys: ['grade', 'coreSubjects', 'additionalSubjects', 'extraCurricular'],
      tableData: this.curriculum.tableData
    },
    {
      anchorId: 'admissions',
      title: this.admissions.title,
      image: this.admissions.image,
      description: this.admissions.description,
      tableHeaders: ['Grade', 'Start Date', 'End Date', 'Academic Year'],
      tableKeys: ['grade', 'startDate', 'endDate', 'academicYear'],
      tableData: this.admissions.tableData
    },
    {
      anchorId: 'academics',
      title: this.academics.title,
      image: this.academics.image,
      description: this.academics.description
    },
    {
      anchorId: 'infrastructure',
      title: this.infrastructure.title,
      image: this.infrastructure.image,
      description: this.infrastructure.description
    },
    {
      anchorId: 'extra-curricular',
      title: this.extraCurricular.title,
      image: this.extraCurricular.image,
      description: this.extraCurricular.description
    },
    {
      anchorId: 'contact-us',
      title: this.contactUs.title,
      image: this.contactUs.image,
      description: this.contactUs.description
    },
    {
      anchorId: 'route-map',
      title: this.routeMap.title,
      image: this.routeMap.image,
      description: this.routeMap.description
    },
    {
      anchorId: 'newsletter',
      title: this.newsletter.title,
      image: this.newsletter.image,
      description: this.newsletter.description
    },
    {
      anchorId: 'follow-us',
      title: this.followUs.title,
      image: this.followUs.image,
      description: this.followUs.description
    }
  ];

  async scrollToAnchor(anchorId: string) {
    const yOffset = document.getElementById(anchorId)?.offsetTop || 0;
    await this.content.scrollToPoint(0, yOffset, 500);
  }
}
