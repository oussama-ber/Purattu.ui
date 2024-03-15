import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { GetGeneralKpi } from '../../models/RequestOutput/generalKpi';
declare let AOS: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit{

  country: string = "canada";
  slides = [
    '../../../assets/images/c1.jpg',
    '../../../assets/images/c2.jpg',
    '../../../assets/images/c3.jpg',
    '../../../assets/images/c4.jpg',
    '../../../assets/images/c5.jpg'
  ];
  slidesss = [
    '../../../assets/images/q1.jpg',
    '../../../assets/images/q2.jpg',
    '../../../assets/images/q3.jpg',
    '../../../assets/images/q4.jpg',
    '../../../assets/images/q5.jpg'
  ];

  currentIndex = 0;

  //
  projects_initial: number = 0;
  projects_fetched: number = 0;
  featureFilms_initial: number = 0;
  featureFilms_fetched: number = 0;
  marketingAttends: number = 1;




  constructor() {

  }
  _movieService = inject(MovieService);

  ngOnInit(): void {
    this.fetchGeneralKpis();
    // AOS.init();

    // setInterval(() => this.moveNext(), 1000);
  }

  // moveNext() {
  //   if (this.carousel) {
  //     const items = this.carousel.nativeElement.querySelectorAll('.carousel-item');
  //     const clone = items[this.currentItem % items.length].cloneNode(true) as HTMLDivElement;
  //     this.carousel.nativeElement.appendChild(clone);
  //     this.currentItem++;
  //     this.carousel.nativeElement.style.transform = `translateY(-${this.itemHeight * this.currentItem}px)`;

  //     // Remove the first element after animation completes
  //     setTimeout(() => {
  //       if (this.carousel && this.carousel.nativeElement.firstElementChild) {
  //         this.carousel.nativeElement.removeChild(this.carousel.nativeElement.firstElementChild);
  //       }
  //     }, 500);
  //   }
  // }
  fetchGeneralKpis(){
    this._movieService.getGeneralKpi().subscribe((res: GetGeneralKpi)=>{
      this.projects_fetched =  res.projects;
      this.featureFilms_fetched = res.featureMovies;
      this.kpiCounters(this.projects_fetched, this.featureFilms_fetched);
    })
  }


  showSlide(index: number): void {
    this.currentIndex = index;
  }

  swithCountry(){
    this.country = this.country == 'canada' ? 'iraq' : 'canada';
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

}
