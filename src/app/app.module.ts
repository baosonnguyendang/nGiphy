import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CrawlerService } from './services/crawler.service'
import { HttpClientModule } from '@angular/common/http';
import { TrendingGifsComponent } from './components/trending-gifs/trending-gifs.component';
import { SearchGifsComponent } from './components/search-gifs/search-gifs.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CrawlerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
