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
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
	
	currentArtist: Artist;
	isFetching = {val: false};
	hasError = {val: false};

	constructor(
		private _getArtistService: GetArtistService,
		private _getAuthTokenService: GetAuthTokenService
		){}


	searchArtist(f: NgForm): void {
		this.isFetching.val = true;
		this._getArtistService.getArtist(f.value.search)
		.subscribe(artist => {
						this.currentArtist = artist;
						console.log('this.currentArtist',this.currentArtist);
						this.hasError.val = false;
						this.isFetching.val = false;
					}, e => {
						this.hasError.val = true;
					});

	}

	ngOnInit() {
		//Check if token needs to be refreshed.
		// this._getAuthTokenService.getToken();
		
  	}

}

