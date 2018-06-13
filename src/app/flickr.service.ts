import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  constructor(public http: Http) { }

  private apiKey: string = '77395b9f8d3b68e742134ac0e628ffe3';
  private apiRoot: string = `https://api.flickr.com/services/rest/?api_key=${this.apiKey}&format=json&nojsoncallback=1`;

  private extractApiResponseData(res) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json();
  }

  public photosGetInfo(photoId: string): Observable<any> {
    const url: string = `${this.apiRoot}&method=flickr.photos.getInfo&photo_id=${photoId}`;
    return this.http.get(url).pipe(map(this.extractApiResponseData));
  }

  public photosGetSizes(photoId: string): Observable<any> {
    const url: string = `${this.apiRoot}&method=flickr.photos.getSizes&photo_id=${photoId}`;
    return this.http.get(url).pipe(map(this.extractApiResponseData));
  }
}
