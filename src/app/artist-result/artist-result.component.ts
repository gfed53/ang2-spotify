import { Component, Input } from '@angular/core';

import { GetRelatedService } from '../services/get-related.service';

import { Artist } from '../types/artist';

@Component({
  selector: 'artist-result',
  templateUrl: './artist-result.component.html',
  styleUrls: ['./artist-result.component.css']
})

export class ArtistResultComponent {
	@Input() currentArtist: Artist;
	@Input() isFetching: boolean;

	constructor(
		private _getRelatedService: GetRelatedService
		){}

	getRelated(id: string, type: string): void {
		this.isFetching = true;
		this._getRelatedService.getRelated(id, type)
		.subscribe(artist => {
						this.currentArtist = artist;
						console.log('this.currentArtist changed, now..',this.currentArtist);
						this.isFetching = false;
					});
	}


}
