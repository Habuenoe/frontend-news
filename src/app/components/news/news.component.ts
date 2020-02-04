import {Component, OnChanges, OnInit} from '@angular/core';
import {NewsModel} from '../../models/new.model';
import {NewsService} from '../../services/news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: NewsModel[] = [];
  archived: boolean = false;
  fecha: any;
  title: string = 'News';


  constructor(public newsService: NewsService) {
  }

  ngOnInit() {
    this.loadNews();
    this.getDate();
  }

  loadNews() {
    this.newsService.loadNews()
      .subscribe(res => {
        // @ts-ignore
        this.news = res.news;
        // ORDER BY CREATE DATE Desc
        this.orderBycreateDate('createDate', 'desc', this.news);
        // ORDER BY CREATE DATE Asc
        // this.orderBycreateDate('createDate', 'asc', this.news);
      });
  }

  orderBycreateDate(key, order: string, array: any) {
    array.sort(this.newsService.orderNews(key, order));
  }

  onFinish(event) {
    this.loadNews();
  }

  getDate() {
    this.fecha = this.newsService.getDate();
  }

  archiveNews(noticia: NewsModel) {
    // We get today's date
    this.getDate();
    noticia.archived = true;
    noticia.archiveDate = this.fecha;
    this.newsService.archiveNews(noticia)
      .subscribe(() => {
      });
  }
}
