import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, filter, fromEvent } from 'rxjs';
import { CrawlerService } from 'src/app/services/crawler.service';

@Component({
  selector: 'app-trending-gifs',
  templateUrl: './trending-gifs.component.html',
  styleUrls: ['./trending-gifs.component.scss']
})
export class TrendingGifsComponent {
  @ViewChild('list', {static: false}) list!: ElementRef;

  private _subs: Subscription[] = [];
  private _trendingGifs: any[] = [];

  private _isLeftMost: boolean = true;
  private _isRightMost: boolean = false;

  constructor(private crawler: CrawlerService, private router: Router) {

  }

  ngOnInit() {
    this._subs.push(
      this.crawler.getTrendingGifs().subscribe((gifs: any) => {
        this._trendingGifs = gifs.data;
      }),
    );
  }

  ngAfterViewInit() {
    this._subs.push(
      fromEvent(this.list.nativeElement, 'scrollend')
      .subscribe((e : any) => {
        this._isLeftMost = e.target['scrollLeft'] === 0; //display move to left Trending Gifs
        this._isRightMost = e.target['scrollLeft'] === e.target['scrollWidth'] - e.target['clientWidth']; //display move to right Trending Gifs
      })
    )
  }

  navigateToDetail(gif: any) {
    this.router.navigate(["gif", gif.slug]);
  }

  left() {
    this.list.nativeElement.scrollBy({left: -1 * this.list.nativeElement.offsetWidth, behavior: 'smooth'});
  }

  right() {
    this.list.nativeElement.scrollBy({left: this.list.nativeElement.offsetWidth, behavior: 'smooth'});
  }

  ngOnDestroy() {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }

  get trendingGifs() {
    return this._trendingGifs;
  }

  get isLeftMost(): boolean {
    return this._isLeftMost;
  }

  get isRightMost(): boolean {
    return this._isRightMost;
  }
}
