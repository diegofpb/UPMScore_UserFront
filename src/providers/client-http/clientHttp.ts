import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class HttpClientProvider {

  constructor(public  http: HttpClient) {
  }

  get(url: string) {
    return this.http.get(url);
  }

  postJson(url: string, body: any) {
    return this.http.post(url, body, {headers:{'Content-Type': 'application/json'}});
  }

  putJson(url: string, body: any) {
    return this.http.put(url, body, {headers:{'Content-Type': 'application/json'}});
  }

  delete(url: string) {
    return this.http.delete(url);
  }

  postMultiPart(url: string, body: any) {
    return this.http.post(url, body);
  }


  // TODO implementar el resto de verbos.


}
