import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare let AOS: any;

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {
  videoURL: string = "1ozGKlOzEVc"; 
  safeURL: SafeResourceUrl | undefined;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    AOS.init();
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoURL}`);
  }
}
