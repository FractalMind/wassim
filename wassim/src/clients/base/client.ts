import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class Client {

  public defaultHttpOptions = new HttpHeaders({

  });

  constructor(
    private http: HttpClient,
  ) {
  }


  public post<returnType, payloadType>( urlRoute: string, payload: payloadType, options?: {}): Observable<returnType>  {
    return this.http.post(
      environment.url + urlRoute,
      payload,
      {...this.defaultHttpOptions, ...options}
    ).pipe(
      map( response => <returnType>response )
    );
  }


  public list<returnType>( urlRoute: string, options?: {} ): Observable<returnType[]>  {
     return this.http.get(
       environment.url + urlRoute,
       {...this.defaultHttpOptions, ...options}
     ).pipe(
        map( responseObjectTree => {
          const list = [];
          for( const key in responseObjectTree) {
            if(responseObjectTree.hasOwnProperty(key)) {
              // @ts-ignore
              list.push( <returnType>{...responseObjectTree[key], id: key } )
            }
          }
          return list;
        })
     )
  }


}
