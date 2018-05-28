// Grabs artist using Spotify's API search endpoint and provided search query

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Artist } from '../types/artist';

import { GetAuthTokenService } from './get-auth-token.service';
import { BaseArtistService } from './base-artist.service';

@Injectable()
export class GetArtistService {
	constructor(
		private _http: HttpClient, 
		private _getAuthTokenService: GetAuthTokenService,
		private _baseArtistService: BaseArtistService
	){}

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
				/* 
					TODO: If there's a case where the exact match isn't actually the right one (i.e. Eagles vs. The Eagles), there will be a different course of action.
				*/
				
				// console.log('data.artists',data.artists);
				let filtered = this.getExactMatches(data.artists.items, q);
				return filtered[searchIndex];
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

	getExactMatches(results,q){
		let testStr = `^${q.toLowerCase()}$`;
		let regTest = new RegExp(testStr,'g');

		return results.filter((result) => {
			let name = result.name.toLowerCase();
			return regTest.test(name);
		})
	}

}