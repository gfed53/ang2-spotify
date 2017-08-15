// Grabs artist using Spotify's API search endpoint and provided search query

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SAMPLE } from './sample.mock';
import { Mock } from './mock';

@Injectable()
export class GetArtistService {
	constructor(private http: Http){}

	getArtist(q: string): void {
		//Mock for now
		console.log('From service, search for '+q);
		let current = SAMPLE.filter((item) => item.name === q);
		console.log('current',current);

	}

}