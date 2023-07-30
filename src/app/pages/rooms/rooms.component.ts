import { Component, OnInit } from '@angular/core';
import { Rooms } from 'src/app/shared/interfaces/rooms/rooms.interface';
import { RoomsService } from 'src/app/shared/services/rooms.service';

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

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.roomsService.getAllRooms().subscribe(
      (reponse) => {
        this.rooms = reponse;
    });
  }    

  deleteRoom(id: number): void {
    this.roomsService.deleteRoom(id).subscribe(
      (response) => {
        this.getAllRooms();
    });
  }



}
