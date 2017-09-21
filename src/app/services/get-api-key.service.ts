import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class GetApiKeyService {

	keyObj: object;

	constructor(private http: Http) {}

	getKey(callback: (data) => void) {
		this.http.get('/api/access')
			.map((res) => res.json())
			.subscribe(obj => {
					callback(obj);
				});
		}

}
