import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable.js';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

// Service to keep track of how many times we've made a 'related' search since we've made an 'initial' search.
@Injectable()
export class RelatedSearchCountService {
  constructor(){}

  private relatedSearchCountSource = new Subject<any>();
  relatedSearchCounts$ = this.relatedSearchCountSource.asObservable();

  update(count: number): void {
		this.relatedSearchCountSource.next(++count);
  }
}