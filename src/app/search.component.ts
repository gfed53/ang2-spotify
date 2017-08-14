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
		private getArtistService: GetArtistService
		){}

	// run(val) { console.log('search.value',val); }

	searchArtist(q) {
		this.getArtistService.getArtist(q.value);
		// console.log('search.value',q);
	}

}

