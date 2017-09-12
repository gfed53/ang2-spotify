// To pass this guard, we would have to not have a fresh token stored in our service. This protects against navigating via URL to /get-auth route while having a fresh auth token.

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { GetAuthTokenService } from '../services/get-auth-token.service';

@Injectable()
export class NoTokenGuard implements CanActivate {
	
	constructor(
		private _getAuthTokenService: GetAuthTokenService,
		private _router: Router
	){}

	canActivate(){
		if(!this._getAuthTokenService.hasToken()){
			return true;
		} else {
			this._router.navigateByUrl('/check-auth');
			return false;
		}
	}
}