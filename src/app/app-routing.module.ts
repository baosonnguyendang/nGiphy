import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingGifsComponent } from './components/trending-gifs/trending-gifs.component';
import { SearchGifsComponent } from './components/search-gifs/search-gifs.component';
import { DetailGifComponent } from './components/detail-gif/detail-gif.component';

const routes: Routes = [
  { path: '', component: TrendingGifsComponent },
  { path: 'search/:searchTerm', component: SearchGifsComponent },
  { path: 'gif/:slug', component: DetailGifComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
