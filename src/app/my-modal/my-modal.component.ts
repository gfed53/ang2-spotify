import { Component, ElementRef, OnInit, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import * as $ from 'jquery';

// Services
import { TabAccessService } from '../services/tab-access.service';
import { BaseArtistService } from '../services/base-artist.service';

// Types
import { Artist } from '../types/artist';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.sass']
})
export class MyModalComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];
  currentResults: Artist[];
  selectedResult: Artist;
 
  constructor(
    private _tabAccessService: TabAccessService,
    private _baseArtistService: BaseArtistService
  ) {
    this.actionButtons = [
      { text: 'Update Artist', onAction: () => {
        // console.log('this.selectedResult',this.selectedResult);
        this._baseArtistService.update(this.selectedResult);
        return true;
      } },
      { text: 'Close Without Changing' }
    ];
  }
 
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.currentResults = options.data.currentResults;
    setTimeout(() => { 
      this._tabAccessService.setFocusBoundary($('.my-modal'));
    }, 0);

  }

}
