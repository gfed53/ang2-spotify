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
		let token = this._getAuthTokenService.token;
		let url = 'https://api.spotify.com/v1/search';
		// let params = new URLSearchParams();

		let params = new HttpParams()
										.set('q', q)
										.set('type', 'artist');

		// let headers = new Headers({'Authorization': `Bearer ${token}`});
		// let headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
		let headers = new HttpHeaders()
											.set('Authorization', `Bearer ${token}`);

		// let options = new RequestOptions({headers, params});

		const httpOptions = {
			headers,
			params
		}

		console.log('httpOptions',httpOptions);

		return this._http.get<any>(url, httpOptions)
			// .map(res => res.json())
			.map(data => {
				console.log('data',data);
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