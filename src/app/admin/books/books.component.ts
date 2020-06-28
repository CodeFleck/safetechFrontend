import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Array<Product>;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

  handleSuccessfulResponse(response) {
    this.books = response;
  }

}
