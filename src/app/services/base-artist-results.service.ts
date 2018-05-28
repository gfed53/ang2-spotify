import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable.js';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Artist } from '../types/artist';

// Service to keep track of initially retrieved artist results (artist which will be used as a basis to find related games).
@Injectable()
export class BaseArtistResultsService {
  constructor(){}

  private baseArtistResultsSource = new Subject<any>();
  baseArtistResults$ = this.baseArtistResultsSource.asObservable();

  update(list: Artist[]): void {
		this.baseArtistResultsSource.next(list);
  }
}