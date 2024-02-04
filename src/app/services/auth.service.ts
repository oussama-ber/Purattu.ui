import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { CreateMovieDTO, Movie } from '../models/movie.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //#region
  baseUrl: string = environment.ApiBaseUrl;
  isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private token: string = '';
  //#endregion

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    this.http.post<any>(this.baseUrl + '/auth/login', data).subscribe(
      (res) => {
        let userToken = res.token;
        if (userToken) {
          this.token = userToken;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(this.token);
          this.router.navigate(['/manageMovies/']);
        }
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
    return this.isAuthenticated;
  }
  signUp(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const data = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    this.http.post<any>(this.baseUrl + '/auth/signup', data).subscribe(
      (res) => {
        let userToken = res.userCreated;
        if (userToken) {
          this.router.navigate(['/login/']);
        }
      },
      (error) => {
        alert('something went wrong');
      }
    );
    return this.isAuthenticated;
  }
  insertMovie(createMovieDto: CreateMovieDTO): Observable<any> {
    const postData = new FormData();
    postData.append('title', createMovieDto.title);
    postData.append('story', createMovieDto.story);
    postData.append('director', createMovieDto.director);
    postData.append('language', createMovieDto.status);
    postData.append('status', createMovieDto.status);
    postData.append(
      'file',
      createMovieDto.imageFile,
      createMovieDto.imageFile.name
    );
    return this.http
      .post<any>(this.baseUrl + '/movies/createMovie', postData)
      .pipe(
        catchError((error) => {
          console.error('Error in insertMovie:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }

  //#region utils
  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {
      token: token,
    };
  }
  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
  }
  private clearAuthData() {
    localStorage.removeItem('token');
  }
  //#endregion utils
}
