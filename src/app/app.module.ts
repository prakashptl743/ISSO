import { BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BlogpostModule } from './blogpost/blogpost.module';
import { CmspageModule } from './cmspage/cmspage.module';
//import { LoadingComponent } from './loading/loading.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module';
 
import { StaffAdminModule } from './staffadmin/staffadmin.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptors/index';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { PrimengModule } from './primeng-module';
   
 
   
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    PageNotFoundComponent,
  
 
 
  //  LoadingComponent
   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    PrimengModule,
    BlogpostModule,
    CmspageModule,
    AdminModule,
    StaffAdminModule,
    AuthModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule 
  ],
  exports: [],
  providers : [
    Title, httpInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
 // providers: [Title, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
