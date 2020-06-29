import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BooksComponent } from '../books.component';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent implements OnInit {

  @Input()
  book: Product;

  @Output()
  bookDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteBook() {
    this.httpClientService.deleteBook(this.book.id).subscribe(
      (book) => {
        this.bookDeletedEvent.emit();
        this.router.navigate(['admin', 'books']);
      }
    );
  }

  editBook() {
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'edit', id: this.book.id } });
  }

}
