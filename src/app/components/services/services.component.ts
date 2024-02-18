import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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



  constructor() {
 
  }

  ngOnInit(): void {

  }

  showSlide(index: number): void {
    this.currentIndex = index;
  }
  swithCountry(){
    this.country = this.country == 'canada' ? 'iraq' : 'canada';
  }
}
