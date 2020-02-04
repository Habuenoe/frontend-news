import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {NewsService} from '../../services/news.service';
import {NewsModel} from '../../models/new.model';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  form: FormGroup;
  @Output() finish: EventEmitter<any> = new EventEmitter();
  fecha: any;
  news: NewsModel[] = [];
  archiveDateDefault = '0000/00/00';

  constructor(public newsService: NewsService) {
  }

  ngOnInit() {
    this.getDate();
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      createDate: new FormControl(this.fecha),
      content: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      archiveDate: new FormControl(this.archiveDateDefault),
      archived: new FormControl(false)
    });
  }

  addNews() {
    const news = new NewsModel(
      this.form.value.title,
      this.form.value.description,
      this.form.value.createDate,
      this.form.value.content,
      this.form.value.author,
      this.form.value.archiveDate,
      this.form.value.archived
    );

    this.newsService.createNews(news)
      .subscribe(resp => {
        if (resp) {
          this.finish.emit(resp);
          // @ts-ignore
          $('#modalNews').modal('hide');
          this.loadNews();
          this.clearForm();
        }
      });
  }

// Clear Form keeping the date we have obtained ( ngOnInit())
  clearForm() {
    this.form.setValue({
      title: '',
      description: '',
      createDate: this.fecha,
      content: '',
      author: '',
      archiveDate: this.archiveDateDefault,
      archived: false,
    });
  }

  loadNews() {
    this.newsService.loadNews()
      .subscribe(res => {
        // @ts-ignore
        this.news = res.news;
      });
  }

  getDate() {
    this.fecha = this.newsService.getDate();
  }

}
