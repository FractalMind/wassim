import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CredentialsForCreationDto} from "../../../app/create-user/dtos/credentials-for-creation.dto";
import {getAuth} from "@angular/fire/auth";
import {initializeApp} from "@angular/fire/app";
import {User} from "@firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseClient {
  public defaultHttpOptions = new HttpHeaders({});
  public app = initializeApp(environment.firebase);

  constructor(private httpClient: HttpClient,
              private auth: AngularFireAuth,
  ) {
  }

  public post<payloadType>(urlRoute: string, payload: payloadType, parameters = '?', options?: {}): Observable<any> {
    return this.httpClient.post(
      environment.firebase.databaseURL + urlRoute + parameters,
      payload,
      {...this.defaultHttpOptions, ...options}
    );
  }

  public patch<payloadType>(urlRoute: string, payload: payloadType, parameters = '?', options?: {}): Observable<any> {
    return this.httpClient.patch(
      environment.firebase.databaseURL + urlRoute + parameters,
      payload,
      {...this.defaultHttpOptions, ...options}
    );
  }

  public delete<payloadType>(urlRoute: string, parameters = '?', options?: {}): Observable<any> {
    return this.httpClient.delete(
      environment.firebase.databaseURL + urlRoute + parameters,
      {...this.defaultHttpOptions, ...options}
    );
  }

  public get<returnType>(urlRoute: string, parameters = '?', options?: {}): Observable<returnType[]> {
    return this.httpClient.get(
      environment.firebase.databaseURL + urlRoute + parameters,
      {...this.defaultHttpOptions, ...options}
    ).pipe(
      map(todoDictionary => {
        //Convert FirebaseDictionary to Array
        return (todoDictionary != null)
          ? Object.entries(todoDictionary).map(e => <returnType>Object.assign(e[1], {id: e[0]}))
          : [];
      })
    )
  }

  public createUserWithCredentials(credentialsForCreationDto: CredentialsForCreationDto): Promise<firebase.default.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(credentialsForCreationDto.email, credentialsForCreationDto.password);
  }

  public signInWithEmailAndPassword(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public signOutUser(): Promise<void> {
    return this.auth.signOut();
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise<any>((resolve, reject) => {
      getAuth(this.app).onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

}
