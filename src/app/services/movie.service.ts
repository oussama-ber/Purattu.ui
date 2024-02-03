import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import {
  CreateMovieDTO,
  Movie,
  UpdateMovieDTO,
  UpdateMovieWithFileDTO,
} from '../models/movie.model';
import { country } from '../models/shared.models';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient, private router: Router) {}
  baseUrl: string = environment.ApiBaseUrl;
  courtriesUrl: string = 'assets/countries.json';
  getCountries() {
    return this.http.get<country[]>(this.courtriesUrl);
  }
  getAllMovies(movieTag: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/movies?movieStatus=${movieTag}`);
  }
  getMovie(movieId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/movies/${movieId}`);
  }
  insertMovie(createMovieDto: CreateMovieDTO): Observable<any> {
    const MovieData = new FormData();
    MovieData.append('title', createMovieDto.title);
    MovieData.append('story', createMovieDto.story);
    MovieData.append('director', createMovieDto.director);
    MovieData.append('coProducer', createMovieDto.coProducer.toString());
    MovieData.append('writer', createMovieDto.writer);
    MovieData.append('associateProducer', createMovieDto.associateProducer.toString());
    MovieData.append('cast', createMovieDto.cast.toString());
    MovieData.append('contriesOfOrigin', createMovieDto.contriesOfOrigin.toString());
    MovieData.append('dop', createMovieDto.dop);
    MovieData.append('releaseDate', createMovieDto.releaseDate.toString());
    MovieData.append('music', createMovieDto.music);
    MovieData.append('runningTime', createMovieDto.runningTime.toString());
    MovieData.append('producer', createMovieDto.producer.toString());
    // MovieData.append('awards', createMovieDto.awards.toString());
    MovieData.append('status', createMovieDto.status);
    MovieData.append(
      'file',
      createMovieDto.imageFile,
      createMovieDto.imageFile.name
    );
    return this.http
      .post<any>(this.baseUrl + '/movies/createMovie', MovieData)
      .pipe(
        catchError((error) => {
          console.error('Error in insertMovie:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }
  updateMovie(
    movieId: string,
    createMovieDto: UpdateMovieWithFileDTO
  ): Observable<any> {
    const MovieData = new FormData();
    MovieData.append('title', createMovieDto.title);
    MovieData.append('story', createMovieDto.story);
    MovieData.append('director', createMovieDto.director);
    MovieData.append('coProducer', createMovieDto.coProducer.toString());
    MovieData.append('writer', createMovieDto.writer);
    MovieData.append('associateProducer', createMovieDto.associateProducer.toString());
    MovieData.append('cast', createMovieDto.cast.toString());
    MovieData.append('contriesOfOrigin', createMovieDto.contriesOfOrigin.toString());
    MovieData.append('dop', createMovieDto.dop);
    MovieData.append('releaseDate', createMovieDto.releaseDate.toString());
    MovieData.append('music', createMovieDto.music);
    MovieData.append('runningTime', createMovieDto.runningTime.toString());
    MovieData.append('producer', createMovieDto.producer.toString());
    // MovieData.append('awards', createMovieDto.awards.toString());
    MovieData.append('status', createMovieDto.status);
    if(createMovieDto.imageFile){
      MovieData.append('file', createMovieDto.imageFile, createMovieDto.imageFile.name);
    }
    return this.http
      .patch<any>(this.baseUrl + `/movies/${movieId}`, MovieData)
      .pipe(
        catchError((error) => {
          console.error('Error in updateMovie:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }
  deleteMovie(movieId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/movies/${movieId}`).pipe(
      catchError((error) => {
        console.error('Error in deleteMovie:', error);
        throw error; // Rethrow the error to be caught by the subscriber
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
