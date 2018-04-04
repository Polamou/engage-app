import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Camera } from '@ionic-native/camera';
import {IonTagsInputModule} from "ionic-tags-input";


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateIssuePage } from '../pages/create-issue/create-issue';
import { IssuesPage } from '../pages/issues/issues';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { IssueProvider } from '../providers/issue/issue';
import { AboutPage } from '../pages/about/about';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { HelpPage } from '../pages/help/help';
import { ProfilePage } from '../pages/profile/profile';
import { SingleIssuePage } from '../pages/single-issue/single-issue';
import { UserProvider } from '../providers/user/user';
import { IssuetypeProvider } from '../providers/issuetype/issuetype';
import { QimgProvider } from '../providers/qimg/qimg';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    CreateAccountPage,
    CreateIssuePage,
    EditProfilePage,
    HelpPage,
    IssuesPage,
    LoginPage,
    ProfilePage,
    SingleIssuePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LeafletModule.forRoot(),
    IonTagsInputModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    CreateAccountPage,
    CreateIssuePage,
    EditProfilePage,
    HelpPage,
    IssuesPage,
    LoginPage,
    ProfilePage,
    SingleIssuePage
  ],
  providers: [
    Camera,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true },
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    IssueProvider,
    UserProvider,
    IssuetypeProvider,
    QimgProvider
  ]
})
export class AppModule { }
