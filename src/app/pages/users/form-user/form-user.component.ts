import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserID } from 'src/app/shared/interfaces/users/users.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent implements OnInit {
  form!: FormGroup;
  title!: string;
  id!: UserID;
  hide: boolean = true;
  documentTypes = [
    { value: 'CC', viewValue: 'Cédula de ciudadanía' },
    { value: 'CE', viewValue: 'Cédula de extranjería' },
    { value: 'TI', viewValue: 'Tarjeta de identidad' },
    { value: 'PP', viewValue: 'Pasaporte' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getParamUrl();
    this.id ? (this.title = 'Editar usuario') : (this.title = 'Crear usuario');
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.id ? this.updateUser() : this.createUser();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getParamUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const { type, number } = params;
      if (type && number) {
        this.id = { documentType: type, documentNumber: number };
        this.getUserById(this.id);
      }
    });
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

  getUserById(id: UserID): void {
    this.usersService
      .getUserById(id.documentType, id.documentNumber)
      .subscribe((response) => {
        this.form.patchValue({
          documentType: response.id.documentType,
          documentNumber: response.id.documentNumber,
          name: response.name,
          phoneNumber: response.phoneNumber,
          email: response.email,
          password: null,
        });
      });
  }

  updateUser(): void {
    const { documentType, documentNumber, ...userData } = this.form.value;
    const id = { documentType, documentNumber };
    const userUpdated = { id, ...userData };
    this.usersService.updateUser(id, userUpdated).subscribe((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El usuario ha sido actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigateByUrl('/users');
    });
  }
}
