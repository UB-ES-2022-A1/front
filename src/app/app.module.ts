import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfileComponent } from './pages/profile/profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InterceptorService } from './services/interceptor/interceptor.service';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { CardAnuncioComponent } from './components/card-anuncio/card-anuncio.component';
import { RegisterComponent } from './components/register/register.component';
import { FormServiceComponent } from './components/form-service/form-service.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ForgotModalComponent } from './components/forgot-modal/forgot-modal.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CardContractComponent } from './components/card-contract/card-contract.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ChatComponent } from './pages/chat/chat.component';
import * as Cloudinary from "cloudinary-core";
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from "@cloudinary/angular-5.x";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    ProfileComponent,
    CardAnuncioComponent,
    RegisterComponent,
    FormServiceComponent,
    ServiceDetailComponent,
    SpinnerComponent,
    ForgotComponent,
    ForgotModalComponent,
    OrdersComponent,
    CardContractComponent,
    FiltersComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: "dvjk7umra" //specify cloud_name
    } as CloudinaryConfiguration)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
