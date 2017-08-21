// Grabs related artist using Spotify's API related search endpoint and provided ID

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GetRelatedService {
	constructor(private http: Http){}



}