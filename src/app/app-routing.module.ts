import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsComponent} from './components/news/news.component';
import {ArchivedNewsComponent} from './components/archived-news/archived-news.component';
import {Page404Component} from './components/page404/page404.component';


const routes: Routes = [
  {path: '', component: NewsComponent},
  {path: 'archived', component: ArchivedNewsComponent},
  {path: '**', component: Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
