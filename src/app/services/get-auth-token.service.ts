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

	cID: string;
	token: string;

	//Checks within service
	hasToken(): boolean {
		return typeof this.token === 'string';
	}

	//Checks within localStorage
	needsToken(_authObj?: any): boolean {
		let authObj = _authObj ? _authObj : JSON.parse(localStorage.getItem('spotOAuth'));

		return authObj === null || authObj === undefined || this.isExpired(authObj);
	}

	getToken(): any {

		return new Promise((resolve,reject) => {
			let authObj: any = JSON.parse(localStorage.getItem('spotOAuth'));

			console.log('authObj',authObj);

			//Get key
			this._getApiKeyService.getKey((obj) => {
				//Keep ref to client ID
				console.log('in auth service:',obj.spotID);
				console.log('this in _getApiKeyService', this);
				this.cID = obj.spotID;

				//OLD: get() returns token if it exists. If not, we run auth(). use this.get(authObj, obj.spotID)
				//NOW: get() returns boolean to determine state load, also retrieving token in service if it can.

				resolve(this.get(authObj, obj.spotID));
				

			});
		});
	}

	auth(): void {
		console.log('this outside', this);
		console.log('this.cID:',this.cID);

		let url = 'https://accounts.spotify.com/authorize';
		let redirect_uri = 'http://localhost:3000/oauth-callback';

		window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + this.cID + '&response_type=token&redirect_uri='+redirect_uri;
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

	//Prevents anyone from manually navigating to search or get route when they shouldn't be.
	autoRedirect(): void {
		let url = this._router.url;
		console.log(`what's the router say?`, this._router);
		console.log('url',url);
		if(!this.token && (url === '/search')){
			this._router.navigateByUrl('/check-auth');
		}
	}

}