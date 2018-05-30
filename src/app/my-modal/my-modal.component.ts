import { Component, OnInit, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogButton, IModalDialogOptions } from 'ngx-modal-dialog';

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
 
  constructor() {
    this.actionButtons = [
      { text: 'Close' }, // no special processing here
      // { text: 'I will always close', onAction: () => true },
      // { text: 'I never close', onAction: () => false }
    ];
  }
 
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.currentResults = options.data.currentResults;
    console.log('this.currentResults',this.currentResults);
  }

}
