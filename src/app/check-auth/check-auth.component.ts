import { Component, OnInit } from '@angular/core';

import { GetAuthTokenService } from '../services/get-auth-token.service';


@Component({
  selector: 'app-check-auth',
  templateUrl: './check-auth.component.html',
  styleUrls: ['./check-auth.component.sass']
})
export class CheckAuthComponent implements OnInit {

  constructor(private _getAuthTokenService: GetAuthTokenService) { }

  ngOnInit() {
  	//Fire off get to check for token 
  }

}
