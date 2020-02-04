import {Injectable} from '@angular/core';
import {NewsModel} from '../models/new.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../config/config';

import {filter, map} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(public http: HttpClient) {
  }

  createNews(news: NewsModel) {
    const url = URL_SERVICIOS + '/new';
    return this.http.post(url, news)
      .pipe(
        map((resp: any) => {
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: news.title + ' ' + 'Has been created correctly',
            showConfirmButton: false,
            timer: 1500
          });
          return resp.news;
        }));
  }

  loadNews() {
    const url = URL_SERVICIOS + '/new';
    return this.http.get(url);
  }

  deleteNews(id: string) {
    const url = URL_SERVICIOS + '/new/' + id;
    return this.http.delete(url)
      .pipe(
        map(resp => {
          // console.log(resp);
        }));
  }

  archiveNews(news: NewsModel) {
    // @ts-ignore
    const url = URL_SERVICIOS + '/new/' + news._id;
    return this.http.put(url, news)
      .pipe(
        map((resp: any) => {
          Swal.fire({
            icon: 'success',
            title: 'News, archived',
            showConfirmButton: false,
            timer: 1500
          });
        }));
  }

  getDate() {
    let fecha: string;
    const hoy = new Date();
    const dd = ((hoy.getDate()) >= 10) ? (hoy.getDate()) : '0' + (hoy.getDate());
    const mm = ((hoy.getMonth() + 1) >= 10) ? (hoy.getMonth() + 1) : '0' + (hoy.getMonth() + 1);
    const yyyy = hoy.getFullYear();
    // return fecha = dd + '/' + mm + '/' + yyyy;
    return fecha = yyyy + '/' + mm + '/' + dd;
  }

  orderNews(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return ((order === 'desc') ? (comparison * -1) : comparison);
    };
  }



}
