// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ArtistResultComponent } from './artist-result/artist-result.component';
import { OAuthComponent } from './oauth/oauth.component';

// Services
import { GetArtistService } from './services/get-artist.service';
import { GetRelatedService } from './services/get-related.service';
import { GetAuthTokenService } from './services/get-auth-token.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArtistResultComponent,
    OAuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [GetArtistService, GetRelatedService, GetAuthTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
