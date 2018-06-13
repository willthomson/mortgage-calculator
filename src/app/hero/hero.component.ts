import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  private photos: string[] = [
    '7188026569',
  ];

  constructor(public flickrService: FlickrService) { }

  ngOnInit() {
    const randomCount: number = Math.floor(Math.random() * this.photos.length);
    const photoId: string = this.photos[randomCount];
    let photoData: any;
    let photoSizes: any;
    this.flickrService.photosGetInfo(photoId).subscribe(data => {
      photoData = data;
      this.flickrService.photosGetSizes(photoId).subscribe(data => {
        photoSizes = data;
        console.log(photoData, photoSizes);
      });
    });
  }
}
