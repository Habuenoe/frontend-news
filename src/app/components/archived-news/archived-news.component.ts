import {Component, OnInit} from '@angular/core';
import {NewsModel} from '../../models/new.model';
import {NewsService} from '../../services/news.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-archived-news',
  templateUrl: './archived-news.component.html',
  styleUrls: ['./archived-news.component.css']
})
export class ArchivedNewsComponent implements OnInit {
  news: NewsModel[] = [];
  title: string = 'Archived News';

  constructor(public newsService: NewsService) {
  }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.loadNews()
      .subscribe(res => {
        // @ts-ignore
        this.news = res.news;

        // ORDER BY ARCHIVE DATE DESC
        this.orderByArchiveDate('archiveDate', 'desc', this.news);
        // ORDER BY ARCHIVE DATE DESC
        // this.orderByArchiveDate('archiveDate', 'asc', this.news);
      });
  }

  deleteNews(news: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#131b45',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.newsService.deleteNews(news._id)
          .subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'News deleted successfully',
              showConfirmButton: false,
              timer: 1500
            });
            // Loading news
            this.loadNews();
          });
      }
    });
  }

  orderByArchiveDate(key, order: string, array: any) {
    array.sort(this.newsService.orderNews(key, order));
  }



}
