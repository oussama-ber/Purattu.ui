import { Component, OnInit, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../models/blog.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  //#region Variables
  private routeSub: Subscription;
  currentBlogId: string = '';
  currentBlog: Blog = new Blog();
  fetchedBlogIsfetched: boolean = false;

  //#endregion Variables
  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(async (params) => {
      this.currentBlogId = params['blogid'];
      await this.getCurrentBlog(this.currentBlogId);
    });
  }
  _blogService = inject(BlogService);

  ngOnInit(): void {
  }

  getCurrentBlog(currentBlogId: string) {
    this._blogService.getBlog(currentBlogId).subscribe(
      (res) => {
        this.currentBlog = res.blog;
        this.fetchedBlogIsfetched = true;
      },
      (error) => {
        this.fetchedBlogIsfetched = false;
        console.error('error', error);
      }
    );
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

}
