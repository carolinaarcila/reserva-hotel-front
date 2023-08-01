import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rooms } from 'src/app/shared/interfaces/rooms/rooms.interface';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Rooms[] = [];

  displayedColumns: string[] = [
   'roomNumber', 
   'price', 
   'roomType', 
   'beadsNumber',
   'hotelId',
   'actions'];

  constructor(private roomsService: RoomsService, private router: Router ) { }

  ngOnInit(): void {
    this.getAllRooms();
  }

  public getAllRooms(): void {
    this.roomsService.getAllRooms().subscribe(
      (response) => {
        this.rooms = response;
    });
  }    

 public deleteRoom(id: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar la habitación?',
      text: 'No puedes revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
    this.roomsService.deleteRoom(id).subscribe(
      (response) => {
        this.getAllRooms();
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'La habitación ha sido eliminada',
      showConfirmButton: false,
      timer: 1500
    })
   }});
  }

 public SetRoomById(id: number): void {
  this.router.navigateByUrl(`rooms/form?id=${id}`);
 }


}
