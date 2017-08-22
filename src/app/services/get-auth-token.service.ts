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

	get(authObj, key): any {
		console.log('authObj:',authObj);
		if(authObj !== null && authObj !== undefined){
			return authObj.oauth.access_token;
		} else {
			this.auth(key);
		}
	}
	



}