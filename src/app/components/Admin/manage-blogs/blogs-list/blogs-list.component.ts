import { Component, inject } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { Router } from '@angular/router';
import { Blog } from '../../../../models/blog.model';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss'
})
export class BlogsListComponent {
  _blogService = inject(BlogService);
  constructor(private _router: Router) {

  }
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
        console.log('res', res);
        this.fetchedBlogs = res.blogs;
        console.log('this.fetchedblogs', this.fetchedBlogs);
        this.fetchedBlogsIsfetched = true;
      },
      (error) => {
        this.fetchedBlogs = [];
        console.log('error', error);
      }
    );
  }
  onEdit(blogId: string){
    this._router.navigate([`/editBlog/${blogId}`]);
  }
  onDelete(blogId: string){
    this._blogService.deleteBlog(blogId).subscribe((res)=>{
      if(res){
        this.getAllBlogs();
      }else{
        alert('could not delete the blog')
      }
    })
  }
  goToCreateBlog(){
    this._router.navigate(['/createBlog']);
  }

}
