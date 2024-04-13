import { Component, OnInit } from '@angular/core';

import AOS from 'aos'; 

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit{
  ngOnInit() {
    AOS.init();
  }
}
