import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable.js';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Artist } from '../types/artist';

// Service to keep track of base artist selected from base artist results (artist which will be used as a basis to find related games).
@Injectable()
export class BaseArtistService {
  constructor(){}

  private baseArtistSource = new Subject<any>();
  baseArtist$ = this.baseArtistSource.asObservable();

  update(artist: Artist): void {
    this.baseArtistSource.next(artist);
    console.log('this.baseArtistSource',this.baseArtistSource);
  }
}