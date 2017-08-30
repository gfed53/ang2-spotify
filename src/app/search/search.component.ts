import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GetArtistService } from '../services/get-artist.service';

//Testing
import { GetApiKeyService } from '../services/get-api-key.service';
import { GetAuthTokenService } from '../services/get-auth-token.service';

import { Artist } from '../types/artist';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	
	currentArtist: Artist;
	isFetching: boolean;

	constructor(
		private _getArtistService: GetArtistService,
		private _getAuthTokenService: GetAuthTokenService
		){}


	searchArtist(f: NgForm): void {
		this.isFetching = true;
		this._getArtistService.getArtist(f.value.search)
		.subscribe(artist => {
						this.currentArtist = artist;
						console.log('this.currentArtist',this.currentArtist);
						this.isFetching = false;
					});

	}

	ngOnInit() {
		//Check if token needs to be refreshed.
		this._getAuthTokenService.getToken();
		
  	}

}

