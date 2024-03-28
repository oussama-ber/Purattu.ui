import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare let AOS: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit{

  country: string = "canada";
  canadatap:boolean=true;
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
  showSlide(index: number): void {
    this.currentIndex = index;
  }
  swithCountry(){
    this.country = this.country == 'canada' ? 'iraq' : 'canada';
  }
}
