import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateBlogDTO } from '../models/blog.model';
// import { CreateMovieDTO, Movie, UpdateMovieDTO, UpdateMovieWithFileDTO } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private router: Router) {}
  // baseUrl: string = "https://reservation-api-0va0.onrender.com";
  baseUrl: string = 'http://localhost:3000';

  getAllBlogs(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/blogs');
  }
  getBlog(blogId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/blogs/${blogId}`);
  }
  // uploadfile(file: any): Observable<any> {
  //   // const headers = new HttpHeaders({
  //   //   'Content-Type': ,
  //   // });
  //   return this.http
  //     .post<any>(this.baseUrl + '/movies/uploadfiletest', file)
  //     .pipe(catchError(this.handleError));
  // }
  insertBlog(createBlogDto: CreateBlogDTO): Observable<any> {
    const blogData = new FormData();
    blogData.append('title', createBlogDto.title);
    blogData.append('description', createBlogDto.description);
    blogData.append('status', createBlogDto.status);
    blogData.append('tag', createBlogDto.tag);
    blogData.append('createdBy', createBlogDto.createdBy);
    blogData.append('file', createBlogDto.imageFile, createBlogDto.imageFile.name);
    return this.http
      .post<any>(this.baseUrl + '/blogs/createblog', blogData)
      .pipe(
        catchError((error) => {
          console.error('Error in insertMovie:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }
  // updateMovie(movieId: string, createMovieDto: UpdateMovieWithFileDTO): Observable<any> {
  //   const MovieData = new FormData();
  //   MovieData.append('title', createMovieDto.title);
  //   MovieData.append('story', createMovieDto.story);
  //   MovieData.append('director', createMovieDto.director);
  //   MovieData.append('language', createMovieDto.language);
  //   MovieData.append('status', createMovieDto.status);
  //   MovieData.append('file', createMovieDto.imageFile, createMovieDto.imageFile.name);
  //   return this.http
  //     .patch<any>(this.baseUrl + `/movies/${movieId}`, MovieData)
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error in updateMovie:', error);
  //         throw error;
  //       })
  //     );
  // }
  deleteBlog(blogId: string): Observable<any> {
    return this.http
      .delete<any>(this.baseUrl + `/blogs/${blogId}`)
      .pipe(
        catchError((error) => {
          console.error('Error in delete Blog:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side error occurred.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     console.error(
  //       `Backend returned code ${error.status}, ` + `body was: ${error.error}`
  //     );
  //   }

  //   // Return an observable with a user-facing error message.
  //   return throwError('Something bad happened; please try again later.');
  // }
}
