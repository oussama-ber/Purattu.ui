import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Blog, CreateBlogDTO } from '../../../../models/blog.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../../services/blog.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent implements OnInit {
  @Output() closeOuput = new EventEmitter();
  enteredTitle = '';
  enteredContent = '';
  movie: Blog = new Blog();
  isLoading = false;
  public form: FormGroup;
  imagePreview: string | undefined;
  private mode = 'create';
  private blogId: string = '';

  constructor(private fb: FormBuilder, private fireStorage: AngularFireStorage, private router: Router) {
    this.form = this.fb.group({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      link: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  _blogService= inject(BlogService);
  ngOnInit() {
    this.mode = 'create';
    this.blogId = '';
  }

  // click listener
  onImagePicked(event: any) {
    const file = (File = event.target.files[0]);
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveBlog() {
    if (this.form.invalid) {
      alert('form not valid');
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      let createBlogDTO = new CreateBlogDTO();
      createBlogDTO.title = this.form.value.title;
      createBlogDTO.description = this.form.value.description;
      createBlogDTO.link = this.form.value.link;
      // createBlogDTO.imageFile = this.form.value.image;
      this._blogService.insertBlog(createBlogDTO).subscribe(async (res) => {
        this.isLoading = false;
        console.log("this.form.value.image", this.form.value.image)
        if(this.form.value.image != null){
          let blogImgPath = `BlogsImages/${this.form.value.image.name}`;
          let copyBlogImgPath = blogImgPath;
          copyBlogImgPath = copyBlogImgPath + new Date();
          const uploadTask = await this.fireStorage.upload(copyBlogImgPath, this.form.value.image);
          const url = await uploadTask.ref.getDownloadURL();

          await this._blogService.insertBlogImage(res.blogId, url).subscribe((rs)=>{
            this.form.reset();
            this.router.navigate(['/manageBlogs']);
          });
        }

      });
    } else {

    }

    // this.form.reset();
  }
  onCancel(){
    this.closeOuput.emit({});
  }
}
