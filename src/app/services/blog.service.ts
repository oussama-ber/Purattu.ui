import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Blog, CreateBlogDTO, UpdateBlogDTO, UpdateBlogWithFileDTO } from '../models/blog.model';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private router: Router) {}
  baseUrl: string = environment.ApiBaseUrl;

  getAllBlogs(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/blogs');
  }

  getBlog(blogId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/blogs/${blogId}`);
  }

  insertBlog(createBlogDto: Blog): Observable<any> {
    const data = {
      title: createBlogDto.title,
      description: createBlogDto.description,
      link: createBlogDto.link,
      createdBy: createBlogDto.createdBy,
    }
    return this.http
      .post<any>(this.baseUrl + '/blogs/createblog', data)
      .pipe(
        catchError((error) => {
          console.error('Error in insertMovie:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }

  insertBlogImage(blogId: string, imageUrl: string): Observable<any> {
    const data  = {
      blogId: blogId,
      imageUrl : imageUrl
    }
    return this.http
      .post<any>(this.baseUrl + '/blogs/insertBlogImage', data)
      .pipe(
        catchError((error) => {
          console.error('Error in insertBlogImage:', error);
          throw error; // Rethrow the error to be caught by the subscriber
        })
      );
  }

  updateBlog(movieId: string, updateBlogDto: UpdateBlogDTO): Observable<any> {
    // const blogData = new FormData();
    // blogData.append('title', updateBlogDto.title);
    // blogData.append('description', updateBlogDto.description);
    // blogData.append('link', updateBlogDto.link);
    // blogData.append('createdby', updateBlogDto.createdby);
    return this.http
      .patch<any>(this.baseUrl + `/blogs/${movieId}`, updateBlogDto)
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

}
