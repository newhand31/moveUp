import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoShareComponent } from './components/auto-share/auto-share.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LearnComponent } from './components/learn/learn.component';
import { LeetcodeComponent } from './components/leetcode/leetcode.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'news', component: NewsComponent },
  { path: 'leetcode', component: LeetcodeComponent },
  { path: 'autoShare', component: AutoShareComponent },
  { path: 'learn', component: LearnComponent },
  { path: '', component: LeetcodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
