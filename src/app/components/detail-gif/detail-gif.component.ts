import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrawlerService } from 'src/app/services/crawler.service';

@Component({
  selector: 'app-detail-gif',
  templateUrl: './detail-gif.component.html',
  styleUrls: ['./detail-gif.component.scss']
})
export class DetailGifComponent {

  private _data: any = null;
  private _subs: Subscription[] = [];

  constructor(private crawler: CrawlerService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this._subs.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        let temp = params.get('slug')!.split('-');
        this.crawler.triggerGetDetail(temp[temp.length - 1])
      }),
      this.crawler.getDetailGif().subscribe((gif: any) => {
        console.log(gif)
        this._data = gif.data;
      }),
    )
  }

  ngOnDestroy() {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }

  get data(): any {
    return this._data;
  }

}
