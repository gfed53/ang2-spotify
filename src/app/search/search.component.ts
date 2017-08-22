import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GetArtistService } from '../services/get-artist.service';

//Testing
import { GetApiKeyService } from '../services/get-api-key.service';
import { GetAuthTokenService } from '../services/get-auth-token.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	

	constructor(
		private _getArtistService: GetArtistService, private _getApiKeyService: GetApiKeyService,
		private _getAuthTokenService: GetAuthTokenService
		){}


	searchArtist(f: NgForm): void {
		console.log('f:',f);
		this._getArtistService.getArtist(f.value.search);

	}

	//Testing
	ngOnInit() {

		// console.log('in comp:',this._getApiKeyService.keyObj);
		this._getAuthTokenService.getToken()
			.then((foo)=> {
				console.log('foo!',foo);
			});
		
  	}

}

