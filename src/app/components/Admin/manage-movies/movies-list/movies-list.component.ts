import { Component, inject } from '@angular/core';
import { Movie } from '../../../../models/movie.model';
import { MovieService } from '../../../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
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
    this._movieService.fetchAllMovies().subscribe(
      (res) => {
        this.fetchedMovies = res.movies;
        this.fetchedMoviesIsfetched = true;
      },
      (error) => {
        this.fetchedMovies = [];
        console.error('error', error);
      }
    );
  }
  uploadfile(file: any) {}
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
