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
  imageUrl: string = 'https://firebasestorage.googleapis.com/v0/b/purattu.appspot.com/o/BlogsImages%2FScreenshot%202023-04-02%20024224.pngMon%20Feb%2019%202024%2016%3A36%3A10%20GMT%2B0100%20(GMT%2B01%3A00)?alt=media&token=e7c1c9f4-7130-48aa-99ba-59e2b85f8c5e';

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
