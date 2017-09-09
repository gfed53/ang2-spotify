// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [GetApiKeyService, GetAuthTokenService, GetArtistService, GetRelatedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
