import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GetAuthTokenService } from '../services/get-auth-token.service';


@Component({
  selector: 'app-check-auth',
  templateUrl: './check-auth.component.html',
  styleUrls: ['./check-auth.component.sass']
})
export class CheckAuthComponent implements OnInit {

  constructor(private _router: Router, private _getAuthTokenService: GetAuthTokenService) { }

  ngOnInit() {
  	//Fire off getToken
  	this._getAuthTokenService.getToken()

  }

}
