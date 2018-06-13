import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import _ from 'lodash';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  private photos: string[] = [
    '7188026569',
  ];

  private photoData: any;
  private photoSizes: any;

  constructor(public flickrService: FlickrService) { }

  ngOnInit() {
    const randomCount: number = Math.floor(Math.random() * this.photos.length);
    const photoId: string = this.photos[randomCount];

    this.flickrService.photosGetInfo(photoId).subscribe(data => {
      this.photoData = data;
      this.showFlickrImageAttribution();
    });

    this.flickrService.photosGetSizes(photoId).subscribe(data => {
      this.photoSizes = data;
      this.showFlickrImage();
    });
  }

  showFlickrImage() {
    let original: any = _.find(this.photoSizes.sizes.size, function (obj) { return obj.label === "Original"; });
    document.querySelector('.hero__image').setAttribute('style', `background-image:url(${original.source})`);
  }

  showFlickrImageAttribution() {
    const photoPage = this.photoData.photo.urls.url[0]._content;
    const photoTitle = this.photoData.photo.title._content;
    document.querySelector('.hero__image-title').innerHTML = `<a href="${photoPage}">${photoTitle}</a>`;

    const owner = this.photoData.photo.owner.realname;
    document.querySelector('.hero__image-owner').innerHTML = `${owner}`;
  }
}
