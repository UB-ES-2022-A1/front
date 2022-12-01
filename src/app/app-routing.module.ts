import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './components/forgot/forgot.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'update_password/:token', component: ForgotComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:email', component: ProfileComponent },

  { path: 'service/:id', component: ServiceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
