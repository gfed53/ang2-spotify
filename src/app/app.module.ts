// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ArtistResultComponent } from './artist-result/artist-result.component';
import { OAuthComponent } from './oauth/oauth.component';
import { CheckAuthComponent } from './check-auth/check-auth.component';

// Services
import { GetArtistService } from './services/get-artist.service';
import { GetRelatedService } from './services/get-related.service';
import { GetAuthTokenService } from './services/get-auth-token.service';
import { GetApiKeyService } from './services/get-api-key.service';
import { SmoothScrollService } from './services/smooth-scroll.service';

// Directives
import { ScrollDirective } from './directives/scroll.directive';

// Guards
import { HasTokenGuard } from './guards/has-token.guard';
import { NoTokenGuard } from './guards/no-token.guard';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArtistResultComponent,
    OAuthComponent,
    CheckAuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2PageScrollModule
  ],
  providers: [
	GetApiKeyService,
	GetAuthTokenService,
	GetArtistService,
  GetRelatedService,
  SmoothScrollService,
	HasTokenGuard,
	NoTokenGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
