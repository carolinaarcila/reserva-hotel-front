import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interfaces';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
    Swal.fire({
      title: '¿Está seguro de eliminar el hotel?',
      text: 'No puedes revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
    this.hotelsService.deleteHotel(id).subscribe((response) => {
      this.getAllHotels();
    });
        Swal.fire(
          '¡Eliminado!',
          'El hotel ha sido eliminado.',
          'success'
        )}
    });
  }

  public setHotelById(id: number): void {
    this.router.navigateByUrl(`hotels/form?id=${id}`);
  
  }


}
