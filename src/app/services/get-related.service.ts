// Grabs related artist using Spotify's API related search endpoint and provided ID

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, URLSearchParams, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Artist } from '../types/artist';

import { GetAuthTokenService } from './get-auth-token.service';

@Injectable()
export class GetRelatedService {
	constructor(private _http: Http, private _getAuthTokenService: GetAuthTokenService){}

	getRelated(id: string, type: string): any {
		let token = this._getAuthTokenService.token;
		let url = `https://api.spotify.com/v1/artists/${id}/related-artists`;
		let headers = new Headers({'Authorization': `Bearer ${token}`});
		let options = new RequestOptions({headers});

		return this._http.get(url, options)
			.map(res => res.json())
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

	//Filter functions
	getPopular(a: any[]): any[] {
		return a.filter(artist => artist.popularity >= 50);
	}

	getHipster(a: any[]): any[] {
		return a.filter(artist => artist.popularity <= 50);
	}

	getRandom(a: any[]): any {
		return a[Math.floor(Math.random()*a.length)];
	}
}