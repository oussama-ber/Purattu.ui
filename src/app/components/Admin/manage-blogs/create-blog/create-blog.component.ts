import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Blog, CreateBlogDTO } from '../../../../models/blog.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../../services/blog.service';

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

  constructor(private fb: FormBuilder) {
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
      alert('form not valid')
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      let createBlogDTO = new CreateBlogDTO();
      createBlogDTO.title = this.form.value.title;
      createBlogDTO.description = this.form.value.description;
      createBlogDTO.link = this.form.value.link;
      createBlogDTO.imageFile = this.form.value.image;
      this._blogService.insertBlog(createBlogDTO).subscribe((res) => {
        this.isLoading = false
      });
    } else {

    }

    this.form.reset();
  }
  onCancel(){
    this.closeOuput.emit({});
  }
}
