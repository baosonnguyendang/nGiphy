import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Subscription
} from 'rxjs';
import { CrawlerService } from 'src/app/services/crawler.service';

@Component({
  selector: 'app-search-gifs',
  templateUrl: './search-gifs.component.html',
  styleUrls: ['./search-gifs.component.scss'],
})
export class SearchGifsComponent {
  searchTerm: string | undefined;
  innerWidth: number = window.innerWidth;
  innerHeight: number = window.innerHeight;

  private _subs: Subscription[] = [];
  private _searchedGifs: any[] = [];

  constructor(
    private crawler: CrawlerService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this._subs.push(
      this.crawler.getSearchedGifs().subscribe((gifs: any) => {
        this._searchedGifs.push(...gifs.data);
      }),
      this.route.paramMap.subscribe((params: ParamMap) => {
        this._searchedGifs = [];
        this.crawler.search(params.get('searchTerm')!, true);
      }),
      this.crawler.getCurrentWidth().subscribe((width: number) => {
        this.innerWidth = width;
      }),
      this.crawler.getHeightPosition()
    );
  }

  navigateToDetail(gif: any) {
    this.router.navigate(['gif', gif.slug]);
  }

  divWidth() { //supoprt responsive
    if (this.innerWidth > 800) {
      return { percent: '25%', count: 4 };
    } else if (this.innerWidth > 640) {
      return { percent: '33.33%', count: 3 };
    }
    return { percent: '50%', count: 2 };
  }

  ngOnDestroy() {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }

  get searchedGifs() {
    return this._searchedGifs;
  }

  get Math() {
    return Math;
  }
}
