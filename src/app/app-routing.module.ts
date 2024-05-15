import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'notice-board',
    loadChildren: () => import('./pages/notice-board/notice-board.module').then( m => m.NoticeBoardPageModule)
  },
  {
    path: 'home-work',
    loadChildren: () => import('./pages/home-work/home-work.module').then( m => m.HomeWorkPageModule)
  },
  {
    path: 'class-dairy',
    loadChildren: () => import('./pages/class-dairy/class-dairy.module').then( m => m.ClassDairyPageModule)
  },
  {
    path: 'time-table',
    loadChildren: () => import('./pages/time-table/time-table.module').then( m => m.TimeTablePageModule)
  },
  {
    path: 'maks-tabulation',
    loadChildren: () => import('./pages/maks-tabulation/maks-tabulation.module').then( m => m.MaksTabulationPageModule)
  },
  {
    path: 'holiday-list',
    loadChildren: () => import('./pages/holiday-list/holiday-list.module').then( m => m.HolidayListPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'academic-calendar',
    loadChildren: () => import('./pages/academic-calendar/academic-calendar.module').then( m => m.AcademicCalendarPageModule)
  },
  {
    path: 'exams',
    loadChildren: () => import('./pages/exams/exams.module').then( m => m.ExamsPageModule)
  },
  {
    path: 'e-dairy',
    loadChildren: () => import('./pages/e-dairy/e-dairy.module').then( m => m.EDairyPageModule)
  }
  ,
  {
    path: 'tab1',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'schoole-library',
    loadChildren: () => import('./pages/schoole-library/schoole-library.module').then( m => m.SchooleLibraryPageModule)
  },
  {
    path: 'school-activities',
    loadChildren: () => import('./pages/school-activities/school-activities.module').then( m => m.SchoolActivitiesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
