import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateBlogDTO, UpdateBlogWithFileDTO } from '../models/blog.model';
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
  insertBlog(createBlogDto: CreateBlogDTO): Observable<any> {
    const blogData = new FormData();
    blogData.append('title', createBlogDto.title);
    blogData.append('description', createBlogDto.description);
    blogData.append('link', createBlogDto.link);
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
  updateMovie(movieId: string, updateBlogDto: UpdateBlogWithFileDTO): Observable<any> {
    const blogData = new FormData();
    blogData.append('title', updateBlogDto.title);
    blogData.append('description', updateBlogDto.description);
    blogData.append('link', updateBlogDto.link);
    blogData.append('createdby', updateBlogDto.createdby);
    blogData.append('file', updateBlogDto.imageFile, updateBlogDto.imageFile.name);
    return this.http
      .patch<any>(this.baseUrl + `/movies/${movieId}`, blogData)
      .pipe(
        catchError((error) => {
          console.error('Error in updateBlog:', error);
          throw error;
        })
      );
  }
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
