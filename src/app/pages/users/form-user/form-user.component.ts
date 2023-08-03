import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent implements OnInit {
  title = 'Crear usuario';
  form!: FormGroup;
  documentTypes = [
    { value: 'CC', viewValue: 'Cédula de ciudadanía' },
    { value: 'CE', viewValue: 'Cédula de extranjería' },
    { value: 'TI', viewValue: 'Tarjeta de identidad' },
    { value: 'PP', viewValue: 'Pasaporte' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      documentType: [''],
      documentNumber: [''],
      name: [''],
      phoneNumber: [''],
      email: [''],
      password: [''],
    });
  }

  onSubmit(): void {
    this.createUser();
  }

  createUser(): void {
    const { documentType, documentNumber, ...userData } = this.form.value;
    const id = { documentType, documentNumber };
    const newUser = { id, ...userData, rolId: null };
    this.usersService.createUser(newUser).subscribe((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El usuario ha sido creado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigateByUrl('/users');
    });
  }
}
