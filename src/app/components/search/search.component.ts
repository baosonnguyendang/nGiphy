import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchTerm: string | undefined;

  constructor(private router: Router) {

  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
