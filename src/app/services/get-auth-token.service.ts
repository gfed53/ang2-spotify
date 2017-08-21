// Grabs OAuth2 token from Spotify using Spotify API and client ID

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GetAuthTokenService {
	constructor(private http: Http){}
	
	authObj: any = JSON.parse(localStorage.getItem('spotOAuth'));

}