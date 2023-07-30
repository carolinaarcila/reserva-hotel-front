import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interfaces';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
 hotels: Hotel[] = [];
 displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'address', 'email', 'totalRooms', 'reserveCapacity','actions'];

  constructor(private hotelsService: HotelsService, private router: Router) { }
  ngOnInit(): void {
    this.getAllHotels();
  }

  public getAllHotels(): void {
    this.hotelsService.getAllHotels().subscribe(
      (response) => {
        this.hotels = response;
      });
  }
  
  public deleteHotel(id: number): void {
    this.hotelsService.deleteHotel(id).subscribe((response) => {
      this.getAllHotels();
    });
  }

  public setHotelById(id: number): void {
    this.router.navigateByUrl(`hotels/form?id=${id}`);
  
  }
}
