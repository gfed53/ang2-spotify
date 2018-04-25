import { Component, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

// Services
import { GetRelatedService } from '../services/get-related.service';

// Types
import { Artist } from '../types/artist';

@Component({
  selector: 'artist-result',
  templateUrl: './artist-result.component.html',
  styleUrls: ['./artist-result.component.sass'],
  //flyInOut animation to be used on artist-result-container
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

  // @ViewChild('resultContainer') private resultContainer: ElementRef;

	constructor(
		private _getRelatedService: GetRelatedService,
    private _elRef: ElementRef
		){}

  ngOnInit() {
    // Focus on button
    // setTimeout(() => { 
    //   console.log(document.getElementById('btn-go-mainstream'));
    //   document.getElementById('btn-go-mainstream').focus();
      
    //   }, 0);
  }

	getRelated(id: string, type: string): void {
		this.isFetching.val = true;
		this._getRelatedService.getRelated(id, type)
		.subscribe(artist => {
						this.currentArtist = artist;
						// console.log('this.currentArtist changed, now..',this.currentArtist);
						this.hasError.val = false;
            this.isFetching.val = false;
            
            // Focus on button
            setTimeout(() => { 
              console.log(document.getElementById('btn-go-mainstream'));
              document.getElementById('btn-go-mainstream').focus();
              
            	}, 0);
					}, e => {
						this.hasError.val = true;
					});
	}


}
