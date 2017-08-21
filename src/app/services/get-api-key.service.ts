import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class GetApiKeyService {

	constructor(private http: Http) { }

	getKey(): void {
		this.http.get('/api/access')
			.map((res) => res.json())
			.subscribe(obj => {console.log('obj',obj)});
		}

}
