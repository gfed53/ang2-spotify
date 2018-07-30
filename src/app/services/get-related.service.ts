// Grabs related artist using Spotify's API related search endpoint and provided ID

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Artist } from '../types/artist';

import { GetAuthTokenService } from './get-auth-token.service';

@Injectable()
export class GetRelatedService {
	constructor(private _http: HttpClient, private _getAuthTokenService: GetAuthTokenService){}

	getRelated(id: string, type: string): any {
		const token = this._getAuthTokenService.token;
		const url = `https://api.spotify.com/v1/artists/${id}/related-artists`;
		const headers = new HttpHeaders()
											.set('Authorization', `Bearer ${token}`);

		const httpOptions = {
			headers
		}

		return this._http.get<any>(url, httpOptions)
			.map(data => {
				return data.artists;
			})
			.map(artists => {
				// Here's where we filter out by type: mainstream, hipster exc.
				if(type === 'mainstream'){
					return this.getPopular(artists);
				}
				if(type === 'hipster'){
					return this.getHipster(artists);
				}
				return artists;
			})
			.map(filt => {
				return this.getRandom(filt);
			})
			.map(artist => {
				let imageURL = artist.images.length ? artist.images[0].url : 'assets/images/no-image-present.png';
				return {
					name: artist.name,
					id: artist.id,
					url: artist.external_urls.spotify,
					imageURL,
					popularity: artist.popularity
				}
			});
	}

	// Filter functions
	getPopular(a: any[]): any[] {
		return a.filter(artist => artist.popularity >= 50);
	}

	getHipster(a: any[]): any[] {
		return a.filter(artist => artist.popularity <= 50);
	}

	getRandom(a: any[]): any {
		return a[Math.floor(Math.random()*a.length)];
	}
	//
}