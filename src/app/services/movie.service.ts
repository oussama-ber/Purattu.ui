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
import { SaveMovieAwardImage } from '../models/RequestOutput/saveMovieAwards.model';

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

  fetchAllMovies(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/movies/fetchAllMovies`);
  }

  fetchLastestMovies(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/movies/lastestMovies`);
  }

  getAllMovies(movieTag: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/movies?movieStatus=${movieTag}`);
  }

  getMovie(movieId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/movies/${movieId}`);
  }

  insertMovie(createMovieDto: CreateMovieDTO): Observable<any> {
    const data = {
      title: createMovieDto.title,
      story: createMovieDto.story,
      director: createMovieDto.director,
      coProducer: createMovieDto.coProducer.toString(),
      writer: createMovieDto.writer,
      associateProducer: createMovieDto.associateProducer.toString(),
      cast: createMovieDto.cast.toString(),
      contriesOfOrigin: createMovieDto.contriesOfOrigin.toString(),
      dop: createMovieDto.dop.toString(),
      releaseDate: createMovieDto.releaseDate,
      music: createMovieDto.music.toString(),
      runningTime: createMovieDto.runningTime,
      producer: createMovieDto.producer.toString(),
      status: createMovieDto.status,
    }
    return this.http
      .post<any>(this.baseUrl + '/movies/createMovie', data)
      .pipe(
        catchError((error) => {
          console.error('Error in insertMovie:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }

  insertMovieImage(movieId: string, imageUrl: string): Observable<any> {
    const MovieData = new FormData();
    MovieData.append('movieId', movieId);
    MovieData.append('imageUrl', imageUrl);
    const data  = {
      movieId: movieId,
      imageUrl : imageUrl
    }
    return this.http
      .post<any>(this.baseUrl + '/movies/insertMovieImage', data)
      .pipe(
        catchError((error) => {
          console.error('Error in insertMovieImage:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }

  saveMovieAwardImage(saveMovieAwardImage: SaveMovieAwardImage): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '/movies/saveMovieAwardImage', saveMovieAwardImage)
      .pipe(
        catchError((error) => {
          console.error('Error in saveMovieAwardImage:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }


  updateMovie(movieId: string, createMovieDto: UpdateMovieWithFileDTO): Observable<any> {
    const data = {
      title: createMovieDto.title,
      story: createMovieDto.story,
      director: createMovieDto.director,
      coProducer: createMovieDto.coProducer.toString(),
      writer: createMovieDto.writer,
      associateProducer: createMovieDto.associateProducer.toString(),
      cast: createMovieDto.cast.toString(),
      contriesOfOrigin: createMovieDto.contriesOfOrigin.toString(),
      dop: createMovieDto.dop.toString(),
      releaseDate: createMovieDto.releaseDate,
      music: createMovieDto.music.toString(),
      runningTime: createMovieDto.runningTime,
      producer: createMovieDto.producer.toString(),
      status: createMovieDto.status,
    }
    return this.http
      .patch<any>(this.baseUrl + `/movies/${movieId}`, data)
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
