import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getUsers()
  {
    return this.httpClient.get<User[]>('http://localhost:8080/users/');
  }

  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/users/add', newUser);   
  }

  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8080/users/' + id);
  }

  getBooks() {
    return this.httpClient.get<Product[]>('http://localhost:8080/products/');
  }

  addBook(newBook: Product) {
    return this.httpClient.post<Product>('http://localhost:8080/products/add', newBook);
  }

  deleteBook(id) {
    return this.httpClient.delete<Product>('http://localhost:8080/products/' + id);
  }
}
