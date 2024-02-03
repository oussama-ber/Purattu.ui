import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit {
  constructor() {}
  _blogService = inject(BlogService);
  //#region Variables
  fetchedBlogs: Blog[] = [];
  fetchedBlogsIsfetched: boolean = false;
  fileName: string = '';
  //#endregion Variables
  ngOnInit(): void {
    this.getAllBlogs();
  }
  getAllBlogs() {
    this._blogService.getAllBlogs().subscribe(
      (res) => {
        this.fetchedBlogs = res.blogs;
        this.fetchedBlogsIsfetched = true;
      },
      (error) => {
        console.error('error', error);
      }
    );
  }

}
