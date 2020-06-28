import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Array<Product>;
  action: string;
  selectedBook: Product;
  booksRecieved: Array<Product>;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(){
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
	      const id = params['id'];
        if (id) {
          this.selectedBook = this.books.find(book => {
            return book.id === +id;
          });
        }
      }
    );
  }

  handleSuccessfulResponse(response) {
    this.books = new Array<Product>();
    //get books returned by the api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {
    
      const bookwithRetrievedImageField = new Product();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picture;
      bookwithRetrievedImageField.description = book.description;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picture=book.picture;
      this.books.push(bookwithRetrievedImageField);
    }
  }

  addBook() {
    this.selectedBook = new Product();
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'add' } });
  }

  viewBook(id: number) {
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });
  }
}
