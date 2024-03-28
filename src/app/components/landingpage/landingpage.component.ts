import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { GetGeneralKpi } from '../../models/RequestOutput/generalKpi';
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

  projects_initial: number = 0;
  projects_fetched: number = 0;
  featureFilms_initial: number = 0;
  featureFilms_fetched: number = 0;
  marketingAttends: number = 1;
  //#endregion Variables

  constructor(private _sanitizer: DomSanitizer) { }
  _movieService = inject(MovieService);

  async ngOnInit(): Promise<void> {
    this.fetchGeneralKpis();
    await this.getLastestMovies();
    AOS.init();
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoURL}`);
  }

  fetchGeneralKpis(){
    this._movieService.getGeneralKpi().subscribe((res: GetGeneralKpi)=>{
      this.projects_fetched =  res.projects;
      this.featureFilms_fetched = res.featureMovies;
      this.kpiCounters(this.projects_fetched, this.featureFilms_fetched);
    })
  }

  private kpiCounters(projectFetched: number, featureFilms: number){
    if(projectFetched > 0 )
    {
      let projectCounterstop: any = setInterval(()=>{
        if(this.projects_initial == projectFetched){
          clearInterval(projectCounterstop);
          return;
        }
        this.projects_initial ++;
      },50);
    }
    if(featureFilms > 0 )
    {
      let featureMoviesCounterstop: any = setInterval(()=>{
        if(this.featureFilms_initial == featureFilms){
          clearInterval(featureMoviesCounterstop);
          return;
        }
        this.featureFilms_initial ++;
      },50);
    }

    let marketingAttendsCounterstop: any = setInterval(()=>{
      this.marketingAttends ++;
      if(this.marketingAttends == 2){
        clearInterval(marketingAttendsCounterstop)
      }
    },50);
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
