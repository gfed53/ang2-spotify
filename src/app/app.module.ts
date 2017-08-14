// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './search.component';
import { ArtistResultComponent } from './artist-result.component';

// Services
import { GetArtistService } from './get-artist.service';
import { GetRelatedService } from './get-related.service';
import { GetAuthTokenService } from './get-auth-token.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArtistResultComponent
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
