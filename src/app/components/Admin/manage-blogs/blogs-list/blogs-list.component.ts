import { Component, inject } from '@angular/core';
import { BlogService } from '../../../../services/blog.service';
import { Router } from '@angular/router';
import { Blog } from '../../../../models/blog.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss'
})
export class BlogsListComponent {
  _blogService = inject(BlogService);
  constructor(private _router: Router, private fireStorage: AngularFireStorage) {

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
        this.fetchedBlogs = res.blogs;
        this.fetchedBlogsIsfetched = true;
      },
      (error) => {
        this.fetchedBlogs = [];
        console.error('error', error);
      }
    );
  }
  onEdit(blogId: string){
    this._router.navigate([`/editBlog/${blogId}`]);
  }
  onDelete(blogId: string, blogPath: string){
    this._blogService.deleteBlog(blogId).subscribe(async (res)=>{
      if(res){
        if(blogPath.length > 0){
          let exsitingImageTask = await this.fireStorage.refFromURL(blogPath);
          exsitingImageTask.delete().subscribe(async () =>  {
            this.getAllBlogs();
          })
        }else{
          this.getAllBlogs();
        }

      }else{
        alert('could not delete the blog')
      }
    })
  }
  goToCreateBlog(){
    this._router.navigate(['/createBlog']);
  }

}
