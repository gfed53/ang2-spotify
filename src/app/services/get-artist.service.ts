// Grabs artist using Spotify's API search endpoint and provided search query

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, URLSearchParams, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//test
import { SAMPLE } from '../sample.mock';
import { Mock } from '../mock';

import { Artist } from '../types/artist';

import { GetAuthTokenService } from './get-auth-token.service';

@Injectable()
export class GetArtistService {
	constructor(private _http: Http, private _getAuthTokenService: GetAuthTokenService){}

	getArtist(q: string): any {
		let token = this._getAuthTokenService.token;
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

		return this._http.get(url, options)
			.map(res => res.json())
			.map(data => {
				console.log('before filtering',data.artists.items[0]);
				return data.artists.items[0];
			})
			.map(artist => {
				return {
					name: artist.name,
					id: artist.id,
					url: artist.external_urls.spotify,
					images: artist.images,
					popularity: artist.popularity
				}
			});
	}

}