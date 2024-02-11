import { Component, OnInit } from '@angular/core';
declare let AOS: any;

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
