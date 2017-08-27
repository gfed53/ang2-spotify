// Grabs artist using Spotify's API search endpoint and provided search query

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, URLSearchParams, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SAMPLE } from '../sample.mock';
import { Mock } from '../mock';

import { GetAuthTokenService } from './get-auth-token.service';

@Injectable()
export class GetArtistService {
	constructor(private _http: Http, private _getAuthTokenService: GetAuthTokenService){}

	// getArtist(q: string): void {
	// 	//Mock for now
	// 	console.log('From service, search for '+q);
	// 	let current = SAMPLE.filter((item) => item.name === q);
	// 	console.log('current',current);

	// }

	getArtist(q: string): void {
		this._getAuthTokenService.getToken()
			.then((token)=> {
				console.log('token!',token);
				let url = 'https://api.spotify.com/v1/search';
				let params = new URLSearchParams();
				params.append('q', q);
				params.append('type', 'artist');

				let headers = new Headers({'Authorization': `Bearer ${token}`});

				let options = new RequestOptions({headers, params});
				console.log('params',params);
				console.log('headers',headers);
				console.log('options',options);

				this._http.get(url, options)
					.map(res => res.json())
					.map(data => data.artists.items[0])
					.subscribe(artist => {
						console.log('artist',artist);
					});

			});
		

		

	}

}