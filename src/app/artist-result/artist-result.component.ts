import { Component, Input } from '@angular/core';

import { Artist } from '../types/artist';

@Component({
  selector: 'artist-result',
  templateUrl: './artist-result.component.html',
  styleUrls: ['./artist-result.component.css']
})

export class ArtistResultComponent {
	@Input() currentArtist: Artist;

}
