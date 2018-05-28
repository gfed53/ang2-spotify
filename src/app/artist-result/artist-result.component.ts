import { Component, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { PageScrollConfig } from 'ng2-page-scroll';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

// Services
import { GetRelatedService } from '../services/get-related.service';
import { SmoothScrollService } from '../services/smooth-scroll.service';
import { BaseArtistService } from '../services/base-artist.service';

// Types
import { Artist } from '../types/artist';

@Component({
  selector: 'artist-result',
  templateUrl: './artist-result.component.html',
  styleUrls: ['./artist-result.component.sass'],
  // flyInOut animation to be used on artist-result-container
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(100)
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translateX(100%)'}))
    ])
  ])
]
})

export class ArtistResultComponent {
	@Input() currentArtist: Artist;
	@Input() isFetching: {val: boolean};
	@Input() hasError: {val: boolean};

	constructor(
    private _getRelatedService: GetRelatedService,
    private _smoothScrollService: SmoothScrollService,
    private _elRef: ElementRef,
    private _baseArtistService: BaseArtistService
		){
      PageScrollConfig.defaultDuration = this._smoothScrollService.duration;
      PageScrollConfig.defaultEasingLogic = this._smoothScrollService.easingLogic;
    }

  ngOnInit() {
    this._baseArtistService.baseArtist$
    .subscribe((artist) => {
      console.log('artist',artist);
    });
  }

	getRelated(id: string, type: string): void {
		this.isFetching.val = true;
		this._getRelatedService.getRelated(id, type)
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
  
  scrollToArtist(): void {
		this._smoothScrollService.scrollTo('#scroll-anchor'); 
		document.getElementById('btn-go-mainstream').focus();
	}
}
