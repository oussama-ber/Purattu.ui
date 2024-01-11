import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CreateMovieDTO, Movie } from '../../../models/movie.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss'
})
export class CreateMovieComponent implements OnInit {
  @Output() closeOuput = new EventEmitter();
  enteredTitle = '';
  enteredContent = '';
  movie: Movie = new Movie();
  isLoading = false;
  public form: FormGroup;
  imagePreview: string | undefined;
  private mode = 'create';
  private movieId: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      story: new FormControl(null, { validators: [Validators.required] }),
      director: new FormControl(null, { validators: [Validators.required] }),
      mainCast: new FormControl(null, { validators: [Validators.required] }),
      language: new FormControl(null, { validators: [Validators.required] }),
      awards: new FormControl(null, { validators: [Validators.required] }),
      status: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  _movieService= inject(MovieService);
  ngOnInit() {
    this.mode = 'create';
    this.movieId = '';
  }

  // click listener
  onImagePicked(event: any) {
    const file = (File = event.target.files[0]);
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveMovie() {
    let state = 'onSavePost';
    // if (this.form.invalid) {
    //   alert('form not valid')
    //   return;
    // }
    this.isLoading = true;
    if (this.mode === 'create') {
      let createMovieDto = new CreateMovieDTO();
      createMovieDto.title = this.form.value.title;
      createMovieDto.story = this.form.value.story;
      createMovieDto.director = this.form.value.director;
      createMovieDto.mainCast = this.form.value.mainCast;
      createMovieDto.language = this.form.value.language;
      createMovieDto.awards = this.form.value.awards;
      createMovieDto.status = this.form.value.status;
      createMovieDto.imageFile = this.form.value.image;
      this._movieService.insertMovie(createMovieDto).subscribe((res) => {
        console.log('res', res);
        this.isLoading = false
      });
    } else {

    }
    console.log('the post should be added.! ');

    this.form.reset();
  }
  onCancel(){
    this.closeOuput.emit({});
  }
}
