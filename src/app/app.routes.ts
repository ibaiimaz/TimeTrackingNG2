// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { NotfoundComponent } from './notfound/notfound.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'activity/:id', component: ActivityComponent },
  { path: '**', component: NotfoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);