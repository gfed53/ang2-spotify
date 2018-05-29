// Grabs artist using Spotify's API search endpoint and provided search query

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Artist } from '../types/artist';

import { GetAuthTokenService } from './get-auth-token.service';
import { BaseArtistService } from './base-artist.service';
import { BaseArtistResultsService } from './base-artist-results.service';

@Injectable()
export class GetArtistService {
	constructor(
		private _http: HttpClient, 
		private _getAuthTokenService: GetAuthTokenService,
		private _baseArtistService: BaseArtistService,
		private _baseArtistResultsService: BaseArtistResultsService
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

				const results = data.artists.items;

				// We will store all of the initial results in observable for later in case the artist we derive is not what the user wanted.
				this._baseArtistResultsService.update(this.getArtistsFormatted(results));

				
				// console.log('data.artists',data.artists);
				const filteredResults = this.getExactMatches(results, q);
				// Just grab the first result that has an exact artist name match.
				return filteredResults[0];
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

	// If we plan on saving the other potential results, we should probably create a method that transforms the artist objects into our own Artist object.
	getArtistsFormatted(list){
		return list.map(artist => {
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