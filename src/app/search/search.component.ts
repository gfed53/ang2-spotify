import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GetArtistService } from '../services/get-artist.service';
import { SmoothScrollService } from '../services/smooth-scroll.service';


import { PageScrollConfig } from 'ng2-page-scroll';


//Testing
// import { GetApiKeyService } from '../services/get-api-key.service';
// import { GetAuthTokenService } from '../services/get-auth-token.service';

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
		private smoothScrollService: SmoothScrollService
		// private _getAuthTokenService: GetAuthTokenService
	){
		PageScrollConfig.defaultDuration = this.smoothScrollService.duration;
    PageScrollConfig.defaultEasingLogic = this.smoothScrollService.easingLogic;
	}

	searchArtist(f: NgForm): void {
		this.isFetching.val = true;
		this._getArtistService.getArtist(f.value.search)
		.subscribe(artist => {
			this.currentArtist = artist;
			this.hasError.val = false;
			this.isFetching.val = false;
			setTimeout(() => { 
				this.smoothScrollService.scrollTo('.artist-result-container'); 
				document.getElementById('btn-go-mainstream').focus();
				}, 0);
		}, e => {
			this.hasError.val = true;
		});
	}

	ngOnInit() {
		// Focus on input
		setTimeout(() => { document.getElementById('artist-search').focus();	}, 0);
  }

}

