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
  movieTag: string = "";
  //#endregion Variables
  ngOnInit(): void {
    this.getAllMovies();
  }
  // getAllMovies(movieTagInput: string) {
  getAllMovies() {
    // this._movieService.getAllMovies(movieTagInput).subscribe(
    this._movieService.getAllMovies().subscribe(
      (res) => {
        this.fetchedMovies = res.movies;
        // this.fetchedMovies = [];
        this.fetchedMoviesIsfetched = true;
        // this.fetchedMoviesIsfetched = false;
      },
      (error) => {
        console.error('error', error);
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
        },
        (error) => {
          console.error('error', error);
        }
      );
    }
  }
  clicked(activeButton: string): void {
    if (this.activeTab === activeButton) {
      // If the same button is clicked again, deactivate it
      this.activeTab = '';
    } else {
      this.activeTab = activeButton;
    }

    this.getAllMovies();
  }
}
