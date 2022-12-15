import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { HeaderComponent } from './components/header/header.component';
import { UploadComponent } from './components/upload/upload.component';
import { MainComponent } from './pages/main/main.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'update_password/:token', component: ForgotComponent },
  { path: 'profile/:email', component: ProfileComponent },

  { path: 'orders', component: OrdersComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'service/:id', component: ServiceDetailComponent },

  { path: 'upload', component: UploadComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
