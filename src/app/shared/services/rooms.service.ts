import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rooms } from '../interfaces/rooms/rooms.interface';
import { ResponseDelete } from '../interfaces/hotels/response.delete';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private HttpClient: HttpClient) {}

  public createRoom(room: Rooms): Observable<Rooms> {
    return this.HttpClient.post<Rooms>(`${this.apiUrl}/rooms`, room);
  }

  public getRoomById(id: number): Observable<Rooms> {
    return this.HttpClient.get<Rooms>(`${this.apiUrl}/rooms/${id}`);
  }

  public getAllRooms(): Observable<Rooms[]> {
    return this.HttpClient.get<Rooms[]>(`${this.apiUrl}/rooms`);
  }

  public deleteRoom(id: number): Observable<ResponseDelete> {
    return this.HttpClient.delete<ResponseDelete>(`${this.apiUrl}/rooms/${id}`);
  }

  public updateRoom(id: number, room: Rooms): Observable<Rooms> {
    return this.HttpClient.put<Rooms>(`${this.apiUrl}/rooms/${id}`, room);
  }
}
