import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
declare let AOS: any;

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {
  //#region Variables
  videoURL: string = "1ozGKlOzEVc";
  safeURL: SafeResourceUrl | undefined;
  public latestMovies: Movie[] = [];
  public latestMoviesLength: number = 0;
  public latestMoviesIsLoaded: boolean = false;
  public currentIndex: number = 0
  //#endregion Variables

  constructor(private _sanitizer: DomSanitizer) { }
  _movieService = inject(MovieService);
  async ngOnInit(): Promise<void> {
    await this.getLastestMovies();
    AOS.init();
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoURL}`);
  }
  async getLastestMovies(){
    this._movieService.fetchLastestMovies().subscribe((res)=>{
      this.latestMovies = res.movies;
      this.latestMoviesLength = this.latestMovies.length - 1;
      this.latestMoviesIsLoaded = true;
    })
  }
  getNextIndex(currentIndexInput: number){
    if(currentIndexInput == this.latestMoviesLength){
      this.currentIndex = 0
    }else{
      this.currentIndex = currentIndexInput + 1;
    }
  }
  getPreviousIndex(currentIndexInput: number){
    if(currentIndexInput == 0){
      this.currentIndex = this.latestMoviesLength; // return last element
    }else{
      this.currentIndex = currentIndexInput - 1;
    }
  }
}
