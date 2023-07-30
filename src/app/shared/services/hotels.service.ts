import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../interfaces/hotels/hotels.interfaces';
import { Observable } from 'rxjs';
import { ResponseDelete } from '../interfaces/hotels/response.delete';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private apiUrl: string = environment.apiUrl;


  constructor(private HttpClient: HttpClient) { }

  public createHotel(hotel: Hotel): Observable<Hotel> {
    return this.HttpClient.post<Hotel>(`${this.apiUrl}/hotel`, hotel);
  }

  public getHotelById(id: number): Observable<Hotel> {
    return this.HttpClient.get<Hotel>(`${this.apiUrl}/hotel/${id}`);

  }

  public getAllHotels(): Observable<Hotel[]> {
    return this.HttpClient.get<Hotel[]>(`${this.apiUrl}/hotel`);  
  }

  public deleteHotel(id: number): Observable<ResponseDelete> {
   return this.HttpClient.delete<ResponseDelete>(`${this.apiUrl}/hotel/${id}`);

  }

 public updateHotel(id: number, hotel: Hotel): Observable<Hotel> {
  return  this.HttpClient.put<Hotel>(`${this.apiUrl}/hotel/${id}`, hotel);
 }

}

