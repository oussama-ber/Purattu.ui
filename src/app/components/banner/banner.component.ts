import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    trigger('scrollAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(100%)' }),
        animate('40s linear', style({ transform: 'translateX(-100%)' })),
      ])
    ])
  ]
})
export class BannerComponent {
  slides = [
    
    '../../../assets/images/ll1.png',
    '../../../assets/images/ll2.png',
    '../../../assets/images/ll3.png',
    '../../../assets/images/ll4.png',
    '../../../assets/images/ll5.png',
    '../../../assets/images/ll6.png',
    '../../../assets/images/ll7.png',
    '../../../assets/images/ll8.png',
    '../../../assets/images/ll9.png',
    '../../../assets/images/ll10.png',
    '../../../assets/images/ll11.png',
    '../../../assets/images/ll12.png',
    '../../../assets/images/ll13.png',
    '../../../assets/images/ll1.png',
    '../../../assets/images/ll2.png',
    '../../../assets/images/ll3.png',
    '../../../assets/images/ll4.png',
    '../../../assets/images/ll5.png',
    '../../../assets/images/ll6.png',
    '../../../assets/images/ll7.png',
    '../../../assets/images/ll8.png',
    '../../../assets/images/ll9.png',
    '../../../assets/images/ll10.png',
    '../../../assets/images/ll11.png',
    '../../../assets/images/ll12.png',
    '../../../assets/images/ll13.png',
    '../../../assets/images/ll1.png',
    '../../../assets/images/ll2.png',
    '../../../assets/images/ll3.png',
    '../../../assets/images/ll4.png',
    '../../../assets/images/ll5.png',
    '../../../assets/images/ll6.png',
    '../../../assets/images/ll7.png',
    '../../../assets/images/ll8.png',
    '../../../assets/images/ll9.png',
    '../../../assets/images/ll10.png',
    '../../../assets/images/ll11.png',
    '../../../assets/images/ll12.png',
    '../../../assets/images/ll13.png',
  ];

}
