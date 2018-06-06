import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageScrollConfig } from 'ng2-page-scroll';
import { ModalDialogService, SimpleModalComponent, IModalDialogOptions, IModalDialogSettings } from 'ngx-modal-dialog';

// Services
import { GetArtistService } from '../services/get-artist.service';
import { BaseArtistService } from '../services/base-artist.service';
import { BaseArtistResultsService } from '../services/base-artist-results.service';

// Types
import { Artist } from '../types/artist';

// Components
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
	
	currentResults: Artist[];
	filteredCurrentResults: Artist[];
	searchIndex: number = 0;
	isFetching = {val: false};
	hasError = {val: false};

	constructor(
		private _getArtistService: GetArtistService,
		private _baseArtistService: BaseArtistService,
		private _baseArtistResultsService: BaseArtistResultsService,
		private _modalDialogService: ModalDialogService,
		private _viewContainer: ViewContainerRef
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
			this._baseArtistService.update(artist);
			this.hasError.val = false;
			this.isFetching.val = false;
		}, e => {
			this.hasError.val = true;
		});
	}

	// Mock for now.
	openSimpleModal() {
    this._modalDialogService.openDialog(this._viewContainer, {
      title: 'Mock',
      childComponent: SimpleModalComponent,
      settings: {
				// overlayClass: 'my-modal-overlay',
				modalClass: 'my-modal fade',
        closeButtonClass: 'my-modal-close'
      },
      data: {
        text: 'Hihihi'
      }
    });
	}
	
	openCustomModal() {
		// console.log('running');
		// console.log('this.currentResults in modal function',this.currentResults);
    this._modalDialogService.openDialog(this._viewContainer, {
      title: 'How about one of these?',
      childComponent: MyModalComponent,
      settings: {
				// modalClass: 'my-modal',
        closeButtonClass: 'my-modal-close'
      },
      data: {
				currentResults: this.filteredCurrentResults
			}
    });
  }

	ngOnInit() {

		this._baseArtistResultsService.baseArtistResults$
		.subscribe((results) => {
			this.currentResults = results;
			console.log('this.currentResults',this.currentResults);
		});

		this._baseArtistService.baseArtist$
		.subscribe((baseResult) => {
			this.filteredCurrentResults = this.currentResults.filter((result) => result.id !== baseResult.id);
			console.log('baseResult',baseResult);
			console.log('this.filteredCurrentResults',this.filteredCurrentResults);
		});

		// Focus on input
		setTimeout(() => { document.getElementById('artist-search').focus();	}, 0);
  }

}

