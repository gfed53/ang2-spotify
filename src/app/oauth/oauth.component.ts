import { Component, OnInit } from '@angular/core';

import { GetAuthTokenService } from '../services/get-auth-token.service';


@Component({
  selector: 'oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.sass']
})

export class OAuthComponent implements OnInit {

	constructor(private _getAuthTokenService: GetAuthTokenService){};

	auth() {
		this._getAuthTokenService.auth();
	}

	ngOnInit() {
		// this._getAuthTokenService.autoRedirect();
	}


}
