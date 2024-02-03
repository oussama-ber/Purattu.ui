import { Component, OnInit, inject } from '@angular/core';
import { Blog, CreateBlogDTO, UpdateBlogWithFileDTO } from '../../../../models/blog.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.scss'
})
export class EditBlogComponent  implements OnInit{
  private routeSub: Subscription;
  enteredTitle = '';
  enteredContent = '';
  blog: Blog = new Blog();
  isLoading = false;
  public updateBlogform: FormGroup;
  imagePreview: string | undefined;
  private blogId: string = '';
  private currentBlogId: string = '';
  currentBlog: Blog = new Blog();
  public blogStatusOptions = ['Draft','Published']
  constructor(private route: ActivatedRoute,private fb: FormBuilder) {
    this.routeSub = this.route.params.subscribe(async (params) => {
      this.currentBlogId = params['blogid'];
      await this.getBlog(this.currentBlogId);
    });
    this.updateBlogform = this.fb.group({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      link: new FormControl(null, { validators: [Validators.required] }),
      imagePath: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null),
    });
  }
  _blogService= inject(BlogService);
  ngOnInit() {
    this.blogId = '';
  }
  async getBlog(blogId: string) {
    await this._blogService.getBlog(blogId).subscribe((res) => {
      this.currentBlog = res.blog;

      this.setFormValues(this.currentBlog);
    });
  }
  setFormValues(currentblog: Blog) {

    this.imagePreview = currentblog.imagePath;
    this.updateBlogform.setValue({
      title: currentblog.title,
      description: currentblog.description,
      link: currentblog.link,
      imagePath: currentblog.imagePath,
      image: null
    });
  }
  onImagePicked(event: any) {
    const file = (File = event.target.files[0]);
    this.updateBlogform.patchValue({ image: file });
    this.updateBlogform.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onUpdateBlog() {
    this.isLoading = true;
    let createBlogDTO = new UpdateBlogWithFileDTO();
    createBlogDTO.title = this.updateBlogform.value.title;
    createBlogDTO.description = this.updateBlogform.value.description;
    createBlogDTO.link = this.updateBlogform.value.link;
    createBlogDTO.imageFile = this.updateBlogform.value.image;
    this._blogService.updateBlog(this.currentBlogId, createBlogDTO).subscribe((res) => {
      this.isLoading = false
    });

    this.updateBlogform.reset();
  }
}
