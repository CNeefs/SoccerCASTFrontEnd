import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeModule } from './home/home.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ManageUsersModule } from './manage-users/manage-users.module';
import { ManageTablesModule } from './manage-tables/manage-tables.module';
import { ManageCompetitionsModule } from './manage-competitions/manage-competitions.module';
import { ManageTournamentsModule } from './manage-tournaments/manage-tournaments.module';
import { DirectivesModule } from './directives/directives.module';
import { NavigationModule } from './navigation/navigation.module';
import { ManageTeamsModule } from './manage-teams/manage-teams.module';
import { MyProfileModule } from './my-profile/my-profile.module';
import { ViewTeamsModule } from './view-teams/view-teams.module';
import { ViewRankingsModule } from './view-rankings/view-rankings.module';
import { ToastComponent } from './toast/toast.component';
import { DocumentationModule } from './documentation/documentation.module'

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    HomeModule,
    ManageUsersModule,
    ManageTablesModule,
    ManageCompetitionsModule,
    ManageTournamentsModule,
    DirectivesModule,
    NavigationModule,
    ManageTeamsModule,
    MyProfileModule,
    ViewTeamsModule,
    SharedModule,
    DocumentationModule,
    ViewRankingsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
