import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageScrollConfig } from 'ng2-page-scroll';

import { GetArtistService } from '../services/get-artist.service';
import { SmoothScrollService } from '../services/smooth-scroll.service';

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
		private _smoothScrollService: SmoothScrollService
	){
		PageScrollConfig.defaultDuration = this._smoothScrollService.duration;
    PageScrollConfig.defaultEasingLogic = this._smoothScrollService.easingLogic;
	}

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
			this.hasError.val = false;
			this.isFetching.val = false;
			setTimeout(() => { 
				this._smoothScrollService.scrollTo('.artist-result-container'); 
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

