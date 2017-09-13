import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { AppComponent }   from './app.component';
import { SearchComponent } from './search/search.component';
import { OAuthComponent } from './oauth/oauth.component';
import { CheckAuthComponent } from './check-auth/check-auth.component';

//Guards
import { HasTokenGuard } from './guards/has-token.guard';
import { NoTokenGuard } from './guards/no-token.guard';

const routes: Routes = [
  { path: '', redirectTo: 'check-auth', pathMatch: 'full' },
  { path: 'check-auth', component: CheckAuthComponent },
  { 
  	path: 'search', 
  	component: SearchComponent,
  	canActivate: [
		  HasTokenGuard
  	]
  },
  { 
  	path: 'get-auth', 
  	component: OAuthComponent,
  	canActivate: [
  		NoTokenGuard
  	] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}