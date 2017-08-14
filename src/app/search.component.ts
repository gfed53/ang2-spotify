import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GetArtistService } from './get-artist.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

	constructor(
		private _getArtistService: GetArtistService
		){}


	searchArtist(f: NgForm): void {
		console.log('f:',f);
		this._getArtistService.getArtist(f.value.search);

	}

}

