import { NgModule } from "@angular/core";
import { SearchGifsComponent } from "./search-gifs/search-gifs.component";
import { TrendingGifsComponent } from "./trending-gifs/trending-gifs.component";
import { AppComponent } from "../app.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { SearchComponent } from './search/search.component';
import { DetailGifComponent } from './detail-gif/detail-gif.component';

@NgModule({
    declarations: [
        SearchGifsComponent,
        TrendingGifsComponent,
        AppComponent,
        SearchComponent,
        DetailGifComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule,
        MaterialModule,
    ],
    exports: [],
})
export class ComponentsModule {}