import { Component, ElementRef, OnInit, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';
import * as $ from 'jquery';

import { TabAccessService } from '../services/tab-access.service';

// Types
import { Artist } from '../types/artist';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.sass']
})
export class MyModalComponent implements IModalDialog {
  // private element: JQuery;
  actionButtons: IModalDialogButton[];
  currentResults: Artist[];
 
  constructor(
    private _tabAccessService: TabAccessService,
    // private el: ElementRef
  ) {
    this.actionButtons = [
      { text: 'Update Artist', onAction: () => true },
      { text: 'Close Without Changing' } // no special processing here
      // { text: 'I never close', onAction: () => false }
    ];

    // this.element = $(el.nativeElement);
  }
 
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.currentResults = options.data.currentResults;
    // console.log('this.currentResults',this.currentResults);

   

    setTimeout(() => { 

      this._tabAccessService.setFocusBoundary($('.my-modal'));

      document.getElementById('btn-sample').focus();

    	}, 0);

  }

}
