import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/shared/interfaces/hotels/hotels.interfaces';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-hotel',
  templateUrl: './form-hotel.component.html',
  styleUrls: ['./form-hotel.component.css']
})
export class FormHotelComponent implements OnInit {

  form!: FormGroup;
  hotelId!: number;
  title!: string;

  constructor(private readonly formBuilder: FormBuilder, private hotelsService: HotelsService, private router: Router, private activatedRouter: ActivatedRoute){
    this.buildForm();
    this.getParamUrl();
  }

  ngOnInit(): void {
    this.buildForm();
    this.getParamUrl();
    this.hotelId ? this.title = 'Editar Hotel' : this.title = 'Crear Hotel';

  }

  onSubmit(): void {
    this.hotelId ? this.updateHotel() : this.createHotel();
    
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      totalRooms: ['', Validators.required],
      reserveCapacity: ['', Validators.required],
    });
  }
  createHotel(): void {
    this.hotelsService.createHotel(this.form.value).subscribe((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El hotel ha sido creado',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl('/hotels');
    });
  }
  getParamUrl(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      if (Object.values(params).length === 0) return;

      const { id } = params;
      this.hotelId = parseInt(id, 10);
      this.getHotelById(this.hotelId);
    });
  }

  getHotelById(id: number): void {
    this.hotelsService.getHotelById(id).subscribe((response) => {
      this.form.patchValue(response);
    });
  }

  updateHotel(): void {
    const hotelUpdated: Hotel = { "id": this.hotelId, ...this.form.value };
    this.hotelsService.updateHotel(this.hotelId, hotelUpdated).subscribe((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El hotel ha sido actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl('/hotels');
    });
    
  }
}
