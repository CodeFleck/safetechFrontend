import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopbook',
  templateUrl: './shopbook.component.html',
  styleUrls: ['./shopbook.component.css']
})
export class ShopbookComponent implements OnInit {

  books: Array<Product>;
  booksRecieved: Array<Product>;
  cartBooks: any;

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
     
     let data = localStorage.getItem('cart');
     
     if (data !== null) {
       this.cartBooks = JSON.parse(data);
     } else {
       this.cartBooks = [];
     }
  }
  handleSuccessfulResponse(response) {
    this.books = new Array<Product>();
    
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {

      const bookwithRetrievedImageField = new Product();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picture;
      bookwithRetrievedImageField.description = book.description;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picture = book.picture;
      this.books.push(bookwithRetrievedImageField);
    }
 }

 addToCart(bookId) {
  let book = this.books.find(book => {
    return book.id === +bookId;
  });
  let cartData = [];
 
  let data = localStorage.getItem('cart');
  
  if (data !== null) {
    cartData = JSON.parse(data);
  }
  cartData.push(book);
  this.updateCartData(cartData);
  localStorage.setItem('cart', JSON.stringify(cartData));
  book.isAdded = true;
}

updateCartData(cartData) {
  this.cartBooks = cartData;
}

goToCart() {
  this.router.navigate(['/cart']);
}

emptyCart() {
  this.cartBooks = [];
  localStorage.clear();
}
}
