import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageScrollConfig } from 'ng2-page-scroll';

// Services
import { GetArtistService } from '../services/get-artist.service';
import { BaseArtistService } from '../services/base-artist.service';

// Types
import { Artist } from '../types/artist';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
	
	currentArtist: Artist;
	searchIndex: number = 0;
	isFetching = {val: false};
	hasError = {val: false};

	constructor(
		private _getArtistService: GetArtistService,
		private _baseArtistService: BaseArtistService
	){}

	submit(f): void {
		// New search, reset index to 0
		this.searchIndex = 0;
		this.searchArtist(f, this.searchIndex);
	}

	findNextResult(f: NgForm): void {
		this.searchIndex++;
		this.searchArtist(f, this.searchIndex);
	}

	

	searchArtist(f: NgForm, searchIndex: number): void {
		this.isFetching.val = true;
		this._getArtistService.getArtist(f.value.search, searchIndex)
		.subscribe(artist => {
			this.currentArtist = artist;
			// New
			this._baseArtistService.update(artist);
			this.hasError.val = false;
			this.isFetching.val = false;
		}, e => {
			this.hasError.val = true;
		});
	}

	ngOnInit() {
		// Focus on input
		setTimeout(() => { document.getElementById('artist-search').focus();	}, 0);
  }

}

