import { Injectable } from '@angular/core';

// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class GetApiKeyService {

	keyObj: object;

	constructor(private http: HttpClient) {}

	getKey(callback: (data) => void) {
		this.http.get('/api/access')
			.subscribe(obj => {
					callback(obj);
				});
		}
}
