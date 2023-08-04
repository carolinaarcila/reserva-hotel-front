import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interfaces';
import { Rooms } from 'src/app/shared/interfaces/rooms/rooms.interface';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.css'],
})
export class FormRoomComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  hotels!: Hotel[];
  title!: string;
  typeRooms: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private roomsService: RoomsService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private hotelsService: HotelsService
  ) {
    this.typeRooms = ['Sencilla', 'Doble', 'Triple', 'Suite'];
    this.buildForm();
    this.getParamUrl();
  }

  ngOnInit(): void {
    this.getAllHotels();
    this.buildForm();
    this.getParamUrl();
    this.id
      ? (this.title = 'Editar Habitación')
      : (this.title = 'Crear Habitación');
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.id ? this.updateRoom() : this.createRoom();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      price: ['', Validators.required],
      roomType: ['', Validators.required],
      beadsNumber: ['', Validators.required],
      hotelId: ['', Validators.required],
    });
  }

  createRoom(): void {
    this.roomsService.createRoom(this.form.value).subscribe((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'La habitación ha sido creada',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigateByUrl('/rooms');
    });
  }

  getParamUrl(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      if (Object.values(params).length === 0) return;

      const { id } = params;
      this.id = parseInt(id, 10);
      this.getRoomById(this.id);
    });
  }

  getRoomById(id: number): void {
    this.roomsService.getRoomById(id).subscribe((response) => {
      this.form.patchValue(response);
    });
  }

  updateRoom(): void {
    const roomUpdated: Rooms = { id: this.id, ...this.form.value };
    this.roomsService.updateRoom(this.id, roomUpdated).subscribe((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'La habitación ha sido actualizada',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigateByUrl('/rooms');
    });
  }

  public getAllHotels(): void {
    this.hotelsService.getAllHotels().subscribe((response) => {
      this.hotels = response;
    });
  }
}
