import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class GetApiKeyService {

	keyObj: object;

	constructor(private http: Http) {}

	getKey(callback: (data) => void) {
		console.log('in client id service');
		this.http.get('/api/access')
			.map((res) => res.json())
			.subscribe(obj => {
					console.log('after subscribe, what is the obj?:',obj);
					callback(obj);
				});
		}
}
