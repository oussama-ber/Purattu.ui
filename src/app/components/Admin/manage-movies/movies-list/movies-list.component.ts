import { Component, inject } from '@angular/core';
import { Movie } from '../../../../models/movie.model';
import { MovieService } from '../../../../services/movie.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
  constructor(private _router: Router, private fireStorage: AngularFireStorage) {

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
  onDelete(movieId: string, moviePath: string){
    this._movieService.deleteMovie(movieId).subscribe(async (res)=>{
      if(res){
        if(moviePath.length > 0){
          let exsitingImageTask = await this.fireStorage.refFromURL(moviePath);
          exsitingImageTask.delete().subscribe(async () =>  {
            this.getAllMovies();
          })
        }else{
          this.getAllMovies();
        }
      }else{
        alert('could not delete the movie')
      }
    })
  }
  goToCreateMovie(){
    this._router.navigate(['/createMovie']);
  }
}
