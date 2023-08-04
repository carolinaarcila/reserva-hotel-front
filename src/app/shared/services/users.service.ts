import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserID } from '../interfaces/users/users.interface';
import { ResponseDelete } from '../interfaces/hotels/response.delete';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user);
  }

  getUserById(documentType: string, documentNumber: number): Observable<User> {
    return this.httpClient.get<User>(
      `${this.apiUrl}/users/${documentType}/${documentNumber}`
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }

  deleteUser(id: UserID): Observable<ResponseDelete> {
    return this.httpClient.delete<ResponseDelete>(
      `${this.apiUrl}/users/${id.documentType}/${id.documentNumber}`
    );
  }

  updateUser(id: UserID, user: User): Observable<User> {
    return this.httpClient.put<User>(
      `${this.apiUrl}/users/${id.documentType}/${id.documentNumber}`,
      user
    );
  }
}
