// Grabs artist using Spotify's API search endpoint and provided search query

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, URLSearchParams, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//test
import { SAMPLE } from '../sample.mock';
import { Mock } from '../mock';

import { Artist } from '../types/artist';

import { GetAuthTokenService } from './get-auth-token.service';

@Injectable()
export class GetArtistService {
	constructor(private _http: HttpClient, private _getAuthTokenService: GetAuthTokenService){}

	getArtist(q: string, searchIndex: number = 0): any {
		const token = this._getAuthTokenService.token;
		const url = 'https://api.spotify.com/v1/search';
		const params = new HttpParams()
										.set('q', q)
										.set('type', 'artist');
		const headers = new HttpHeaders()
											.set('Authorization', `Bearer ${token}`);
		const httpOptions = {
			headers,
			params
		};

		return this._http.get<any>(url, httpOptions)
			.map(data => {
				return data.artists.items[searchIndex];
			})
			.map(artist => {
				let imageURL = artist.images.length ? artist.images[0].url : 'http://images.clipartpanda.com/moderation-clipart-jixEg7AiE.png';
				return {
					name: artist.name,
					id: artist.id,
					url: artist.external_urls.spotify,
					imageURL,
					popularity: artist.popularity
				}
			});
	}

}