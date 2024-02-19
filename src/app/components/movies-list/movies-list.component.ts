import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent implements OnInit {
  activeButton: string ='';
  activeTab:string='Released';
  constructor() {}
  images = [
    { path: 'https://source.unsplash.com/800x600/?nature' },
    { path: 'https://source.unsplash.com/800x600/?car' },
    { path: 'https://source.unsplash.com/800x600/?moto' },
    { path: 'https://source.unsplash.com/800x600/?fantasy' },
  ];
  _movieService = inject(MovieService);
  //#region Variables
  fetchedMovies: Movie[] = [];
  fetchedMoviesIsfetched: boolean = false;
  fileName: string = '';
  movieStatus: string = ""; //Released
  //#endregion Variables
  ngOnInit(): void {
    this.getAllMovies(this.movieStatus);
  }
  getAllMovies(movieStatus: string) {
    this._movieService.fetchAllMovies().subscribe(
      (res) => {
        this.fetchedMovies = res.movies;
        this.fetchedMoviesIsfetched = true;
      },
      (error) => {
        console.error('error', error);
      }
    );
  }
  uploadfile(file: any) {}
  clicked(filterBy: string): void {
    this.movieStatus = filterBy,
    this.getAllMovies(filterBy);
  }
  onHoverMovieEnter(movieStatusInput: string){
    this.movieStatus = movieStatusInput;
  }
  onHoverMovieLeave(){
    this.movieStatus = "";
  }
}
