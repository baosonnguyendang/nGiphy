import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, debounceTime, filter, finalize, fromEvent, map } from 'rxjs';

const api_key = 'dNKsZXsK9mOB0ZLhCfyE0UZnELkoMqJL';

@Injectable({
  providedIn: 'root',
})
export class CrawlerService {

  private readonly _baseUrl = `https://api.giphy.com/v1/gifs`
  private readonly _apiTrending = `${this._baseUrl}/trending?`;
  private readonly _apiSearch = `${this._baseUrl}/search?`;
  private readonly _limit: number = 20;

  private _searchedGifs$: Subject<any> = new Subject();

  private _currentOffset: number = 0;
  private _searchTerm: string = '';

  id = signal('');

  constructor(private _http: HttpClient) {}

  /**
   * Search API based on keyword
   * @param searchTerm keyword to be searched
   * @param resetOffset true means reset offset
   */
  search(searchTerm: string, resetOffset: boolean): void {
    if (resetOffset) {
      this._currentOffset = 0;
    }
    this._searchTerm = searchTerm;
    const params = {
      api_key: api_key,
      q: searchTerm,
      limit: this._limit,
      offset: this._currentOffset,
      rating: 'g',
      lang: 'en',
      bundle: 'messaging_non_clips',
    };
    this._http.get(this._apiSearch, { params: params }).pipe(finalize(() => this._currentOffset += this._limit))
      .subscribe((res: any) => {
        this._searchedGifs$.next(res);
      });
  }


  /**
   * 
   * @returns {Observable} get trending gifs result
   */
  getTrendingGifs(): Observable<any> {
    const params = {
      api_key: api_key,
      limit: 25,
      offset: 0,
      rating: 'g',
      bundle: 'messaging_non_clips',
    };
    return this._http.get(this._apiTrending, { params: params });
  }

  /**
   * 
   * @returns {Observable} get searched result
   */
  getSearchedGifs(): Observable<any> {
    return this._searchedGifs$.asObservable();
  }

  /**
   * 
   * @returns {string} window width
   */
  getCurrentWidth(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      debounceTime(100),
      map(() =>  window.innerWidth)
    );
  }

  /**
   * When user reach the end height, function is called
   * @returns search function call with offset not to be resetted
   */
  getHeightPosition() {
    return fromEvent(window, 'scroll').pipe(filter(() => {
      return (window.innerHeight + window.scrollY) >= document.body.scrollHeight && this._searchTerm.length > 0
    })).subscribe(() => {
      this.search(this._searchTerm, false);
    })
  }


  /**
   * When user click on gif, function is called to trigger getting data
   * @param id : gif id
   */
  triggerGetDetail(id: string) {
    this.id.set(id);
  }


  /** 
   * Request API with id
   * @return Observable
  */
  getDetailGif(): Observable<any> {
    const params = {
      api_key: api_key,
      rating: 'g',
    };
    return this._http.get(`${this._baseUrl}/${this.id()}`, { params: params });
  }
}
