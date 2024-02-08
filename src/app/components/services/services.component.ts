import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare let AOS: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit{
  @ViewChild('carousel') carousel: ElementRef<HTMLDivElement> | undefined;
  country: string = "canada";
  itemHeight: number;
  currentItem: number;

  constructor() {
    this.itemHeight = 0;
    this.currentItem = 0;
  }

  ngOnInit(): void {
    AOS.init();
    // Calculate item height, including margin-bottom
    if (this.carousel) {
      this.itemHeight = this.carousel.nativeElement.offsetHeight + 100;
    }

    setInterval(() => this.moveNext(), 1000);
  }

  moveNext() {
    if (this.carousel) {
      const items = this.carousel.nativeElement.querySelectorAll('.carousel-item');
      const clone = items[this.currentItem % items.length].cloneNode(true) as HTMLDivElement;
      this.carousel.nativeElement.appendChild(clone);
      this.currentItem++;
      this.carousel.nativeElement.style.transform = `translateY(-${this.itemHeight * this.currentItem}px)`;

      // Remove the first element after animation completes
      setTimeout(() => {
        if (this.carousel && this.carousel.nativeElement.firstElementChild) {
          this.carousel.nativeElement.removeChild(this.carousel.nativeElement.firstElementChild);
        }
      }, 500);
    }
  }
  swithCountry(){
    this.country = this.country == 'canada' ? 'iraq' : 'canada';
  }
}
