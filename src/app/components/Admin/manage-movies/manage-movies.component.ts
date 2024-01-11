import { Component, inject } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrl: './manage-movies.component.scss'
})
export class ManageMoviesComponent {
  images = [
    { path: 'https://source.unsplash.com/800x600/?nature' },
    { path: 'https://source.unsplash.com/800x600/?car' },
    { path: 'https://source.unsplash.com/800x600/?moto' },
    { path: 'https://source.unsplash.com/800x600/?fantasy' },
  ];
  _movieService = inject(MovieService);
  constructor(private _router: Router) {

  }
  //#region Variables
  fetchedMovies: Movie[] = [];
  fetchedMoviesIsfetched: boolean = false;
  fileName: string = '';
  //#endregion Variables
  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this._movieService.getAllMovies().subscribe(
      (res) => {
        console.log('res', res);
        this.fetchedMovies = res.movies;
        console.log('this.fetchedMovies', this.fetchedMovies);
        // this.fetchedMovies = [];
        this.fetchedMoviesIsfetched = true;
        // this.fetchedMoviesIsfetched = false;
      },
      (error) => {
        this.fetchedMovies = [];
        console.log('error', error);
      }
    );
  }
  uploadfile(file: any) {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file, file.name);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      const upload$ = this._movieService.uploadfile(formData).subscribe(
        (res) => {
          console.log('res', res);
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  }
  onEdit(movieId: string){
    this._router.navigate([`/editMovie/${movieId}`]);
  }
  onDelete(movieId: string){
    this._movieService.deleteMovie(movieId).subscribe((res)=>{
      if(res){
        this.getAllMovies();
      }else{
        alert('could not delete the movie')
      }
    })
  }
  goToCreateMovie(){
    this._router.navigate(['/createMovie']);
  }
}
