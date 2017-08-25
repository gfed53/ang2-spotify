// Grabs OAuth2 token from Spotify using Spotify API and client ID

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GetApiKeyService } from '../services/get-api-key.service';

@Injectable()
export class GetAuthTokenService {
	constructor(private _http: Http, private _getApiKeyService: GetApiKeyService){}
	
	// authObj: any = JSON.parse(localStorage.getItem('spotOAuth'));

	public token: any;

	getToken(): any {

		return new Promise((resolve,reject) => {
			let authObj: any = JSON.parse(localStorage.getItem('spotOAuth'));

			console.log('authObj',authObj);

			//Get key
			this._getApiKeyService.getKey((obj)=> {
				//Use key
				console.log('in auth service:',obj.spotID);

				//Testing 
				// return null;

				//get() returns token if it exists. If not, we run auth(). use this.get(authObj, obj.spotID)

				resolve(this.get(authObj, obj.spotID));
				

			});
		});
	}

	auth(key): void {
		console.log('key:',key);
		let url = 'https://accounts.spotify.com/authorize';
		let redirect_uri = 'http://localhost:3000/oauth-callback';

		window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + key + '&response_type=token&redirect_uri='+redirect_uri;
	}


	//Checks if authObj.time_stamp + authObj.expires_in > Date.now();
	// Returns boolean
	isExpired(authObj){	
		console.log('time_stamp',authObj.oauth.time_stamp);
		console.log('expires_in',authObj.oauth.expires_in);
		console.log('date now', Date.now());
		console.log('bool is',authObj.oauth.time_stamp + (parseInt(authObj.oauth.expires_in)*1000) < Date.now());
		// return false;
		return authObj.oauth.time_stamp + (parseInt(authObj.oauth.expires_in)*1000) < Date.now();
	}

	get(authObj, key): any {
		console.log('authObj:',authObj);
		if(authObj !== null && authObj !== undefined && !this.isExpired(authObj)){
			return authObj.oauth.access_token;
		} else {
			this.auth(key);
		}
	}

	// oauth :
// access_token:
// "BQAdczJeu1Zv5cGQ1d_p8l_wSYpmegmJZ_w-AR0Q9g9YwHtqktUaSm9WQgeUcKn5eI8GIvkf6pszhX-OwF8xt-GZSnjoL0-K9VSX5WbrlFUHmmaP-HekL98Uo37BB8wGqXhstGqW0A"
// expires_in:
// "3600"
// time_stamp:
// 1503683565297
	



}