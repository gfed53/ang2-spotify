// Grabs OAuth2 token from Spotify using Spotify API and client ID

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GetApiKeyService } from '../services/get-api-key.service';

@Injectable()
export class GetAuthTokenService {
	constructor(private _http: Http, private _router: Router, private _getApiKeyService: GetApiKeyService){}
	
	// authObj: any = JSON.parse(localStorage.getItem('spotOAuth'));

	token: string;

	//
	// check(): void {

	// }

	getToken(): any {

		return new Promise((resolve,reject) => {
			let authObj: any = JSON.parse(localStorage.getItem('spotOAuth'));

			console.log('authObj',authObj);

			//Get key
			this._getApiKeyService.getKey((obj)=> {
				//Use key
				console.log('in auth service:',obj.spotID);

				//OLD: get() returns token if it exists. If not, we run auth(). use this.get(authObj, obj.spotID)
				//NOW: get() returns boolean to determine state load, also retrieving token in service if it can.

				resolve(this.get(authObj, obj.spotID));
				

			});
		});
	}

	auth(key): void {
		// console.log('key:',key);
		let url = 'https://accounts.spotify.com/authorize';
		let redirect_uri = 'http://localhost:3000/oauth-callback';

		window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + key + '&response_type=token&redirect_uri='+redirect_uri;
	}


	//Checks if authObj.time_stamp + authObj.expires_in > Date.now();
	// Returns boolean
	isExpired(authObj){	
		// console.log('time_stamp',authObj.oauth.time_stamp);
		// console.log('expires_in',authObj.oauth.expires_in);
		// console.log('date now', Date.now());
		// console.log('bool is',authObj.oauth.time_stamp + (parseInt(authObj.oauth.expires_in)*1000) < Date.now());
		// return false;
		return authObj.oauth.time_stamp + (parseInt(authObj.oauth.expires_in)*1000) < Date.now();
	}

	get(authObj, key): any {
		console.log('authObj:',authObj);
		if(authObj !== null && authObj !== undefined && !this.isExpired(authObj)){
			this.token = authObj.oauth.access_token;
			this._router.navigateByUrl('/search');

		} else {
			// this.auth(key);
			this._router.navigateByUrl('/get-auth')
		}
	}

}