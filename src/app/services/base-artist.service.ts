import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable.js';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Artist } from '../types/artist';

// Service to keep track of base artist selected from base artist results (artist which will be used as a basis to find related games).

// TODO: should we separate 'Base Artist' with other subsequent artists that we find through relation? (Maybe keep track of all artists under 'DisplayedArtistService' and only have 'BaseArtistService' contain artists that we originally searched for)
@Injectable()
export class BaseArtistService {
  constructor(){}

  private baseArtistSource = new Subject<any>();
  baseArtist$ = this.baseArtistSource.asObservable();

  update(artist: Artist): void {
    this.baseArtistSource.next(artist);
  }
}