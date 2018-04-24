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

			// console.log('authObj',authObj);

			//Get key
			this._getApiKeyService.getKey((obj) => {
				
				// console.log('in auth service:',obj);
				// console.log('this in _getApiKeyService', this);
				//Keep ref to client ID
				this.cID = obj.spotID;

				// get() returns boolean to determine state load, also retrieving token in service if it can.
				resolve(this.get(authObj, obj.spotID));
			});
		});
	}

	auth(): void {
		// console.log('this outside', this);
		// console.log('this.cID:',this.cID);
		let url = 'https://accounts.spotify.com/authorize';
		// let redirect_uri = 'http://localhost:3000/oauth-callback';
		let redirect_uri = 'http://ang2-spotify.herokuapp.com/oauth-callback';
		window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + this.cID + '&response_type=token&redirect_uri='+redirect_uri;
	}


	//Checks if authObj.time_stamp + authObj.expires_in > Date.now();
	isExpired(authObj: any): boolean {
		return authObj.oauth.time_stamp + (parseInt(authObj.oauth.expires_in)*1000) < Date.now();
	}

	// Used in check-auth route. Automatically navigates to appropriate route depending on situation.
	get(authObj: any, key: string): any {
		// console.log('authObj:',authObj);
		if(this.needsToken(authObj)){
			this._router.navigateByUrl('/get-auth');
		} else {
			this.token = authObj.oauth.access_token;
			this._router.navigateByUrl('/search');
		}
	}

}