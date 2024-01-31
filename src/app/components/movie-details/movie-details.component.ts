import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit{
//#region Variables
private routeSub: Subscription;
currentMovieId: string = '';
currentMovie: Movie = new Movie();

public producers: string[] = [];
public coProducers: string [] = [];
public associateProducers: string [] = [];
public casts: string [] = [];
public contriesOfOrigins: string [] = [];
public moviesStatus: string[] = ['Released', 'Comming soon', 'In Development'];
//#endregion Variables
  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(async (params) => {
      this.currentMovieId = params['movieid'];
      await this.getMovie(this.currentMovieId);
    });
  }
  _movieService = inject(MovieService);
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  async getMovie(movieId: string) {
    await this._movieService.getMovie(movieId).subscribe((res) => {
      this.currentMovie = res.movie;

      this.coProducers = this.currentMovie.coProducer
      this.associateProducers = this.currentMovie.associateProducer;
      this.contriesOfOrigins = this.currentMovie.contriesOfOrigin;
      this.casts = this.currentMovie.cast;
      this.producers = this.currentMovie.producer;
    });
  }

}
