import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rooms } from '../interfaces/rooms/rooms.interface';
import { ResponseDelete } from '../interfaces/hotels/response.delete';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(private httpClient: HttpClient ) { }

  apiUrl: string = environment.apiUrl;

  public getAllRooms(): Observable<Rooms[]> {
    return this.httpClient.get<Rooms[]>(`${this.apiUrl}/room`);
  }

  public deleteRoom(id: number): Observable<ResponseDelete> {
    return this.httpClient.delete<ResponseDelete>(`${this.apiUrl}/room/${id}`);
  }
}
