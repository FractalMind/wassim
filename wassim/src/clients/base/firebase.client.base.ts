import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FirebaseClientBase {
  public defaultHttpOptions = new HttpHeaders({});

  constructor(private httpClient: HttpClient) {
  }

  public post<payloadType>(urlRoute: string, payload: payloadType, options?: {}): Observable<any> {
    return this.httpClient.post(
      environment.firebaseConfig.databaseURL + urlRoute,
      payload,
      {...this.defaultHttpOptions, ...options}
    );
  }

  public get<returnType>(urlRoute: string, options?: {}): Observable<returnType[]> {
    return this.httpClient.get(
      environment.firebaseConfig.databaseURL + urlRoute,
      {...this.defaultHttpOptions, ...options}
    ).pipe(
      map(todoDictionary => {
        //Convert FirebaseDictionary to Array
        return Object.entries(todoDictionary).map(e => Object.assign(e[1], {key: e[0]}));
      })
    )
  }


}
