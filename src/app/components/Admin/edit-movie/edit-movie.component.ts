import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie.service';
import { Movie, UpdateMovieDTO, UpdateMovieWithFileDTO } from '../../../models/movie.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss',
})
export class EditMovieComponent implements OnInit {
  private routeSub: Subscription;
  currentMovie: Movie = new Movie();
  currentMovieId: string = '';
  imagePreview: string = '';
  public updateMovieform!: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.buildForm();
    this.routeSub = this.route.params.subscribe(async (params) => {
      this.currentMovieId = params['movieid'];
      await this.getMovie(this.currentMovieId);
    });
  }
  _movieService = inject(MovieService);
  ngOnInit(): void {}
  async getMovie(movieId: string) {
    await this._movieService.getMovie(movieId).subscribe((res) => {
      this.currentMovie = res.movie;
      console.log('this.currentMovie', this.currentMovie);
      // this.buildForm();
      this.setFormValues(this.currentMovie);
    });
  }
  setFormValues(currentMovie: Movie) {

    this.imagePreview = currentMovie.imagePath;
    this.updateMovieform.setValue({
      title: currentMovie.title,
      story: currentMovie.story,
      director: currentMovie.director,
      language: currentMovie.language,
      status: currentMovie.status,
      imagePath: currentMovie.imagePath,
    });
  }
  buildForm() {
    console.log('this.currentMovie.title', this.currentMovie.title);
    this.updateMovieform = this.fb.group({
      title: new FormControl('', { validators: [Validators.required] }),
      story: new FormControl('', { validators: [Validators.required] }),
      director: new FormControl('', { validators: [Validators.required] }),
      // mainCast: new FormControl(this.currentMovie.mainCast),
      language: new FormControl('', { validators: [Validators.required] }),
      // awards: new FormControl(this.currentMovie.awards),
      status: new FormControl('', { validators: [Validators.required] }),
      imagePath: new FormControl(this.currentMovie.imagePath),
    });
    console.log('this.updateMovieform', this.updateMovieform);
    console.log('this.updateMovieform', this.updateMovieform.value.title);
  }
  // click listener
  onImagePicked(event: any) {
    const file = (File = event.target.files[0]);
    this.updateMovieform.patchValue({ imagePath: file });
    this.updateMovieform.get('imagePath')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onUpdateMovie() {
    const movietoUpdate: UpdateMovieWithFileDTO = new UpdateMovieWithFileDTO();
    // console.log("form valuechanges", this.updateMovieform.valueChanges)
    console.log('form value', this.updateMovieform.value);
    movietoUpdate.title = this.updateMovieform.value.title;
    movietoUpdate.story = this.updateMovieform.value.story;
    movietoUpdate.director = this.updateMovieform.value.director;
    movietoUpdate.mainCast = this.updateMovieform.value.mainCast;
    movietoUpdate.language = this.updateMovieform.value.language;
    movietoUpdate.awards = this.updateMovieform.value.awards;
    movietoUpdate.status = this.updateMovieform.value.status;
    movietoUpdate.imageFile = this.updateMovieform.value.imagePath;
    this._movieService.updateMovie(this.currentMovieId ,movietoUpdate).subscribe(res=>{
      console.log("res after updating the movie", res);
    })
  }
}
