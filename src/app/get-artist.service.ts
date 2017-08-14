// Grabs artist using Spotify's API search endpoint and provided search query

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GetArtistService {
	constructor(private http: Http){}

	getArtist(q: string): void {
		console.log('From service, search for '+q);
	}

}