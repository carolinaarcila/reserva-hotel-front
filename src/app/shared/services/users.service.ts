import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/users/users.interface';
import { ResponseDelete } from '../interfaces/hotels/response.delete';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }

  deleteUser(id: number): Observable<ResponseDelete> {
    return this.httpClient.delete<ResponseDelete>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user);
  }
}
