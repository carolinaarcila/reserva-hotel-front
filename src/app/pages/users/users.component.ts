import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/users/users.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: User[];

  displayedColumns: string[] = [
    'name',
    'phoneNumber',
    'email',
    'rolId',
    'actions',
  ];

  constructor(private usersService: UsersService, private router: Router) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.usersService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  public setUserById(id: {
    documentType: string;
    documentNumber: number;
  }): void {
    const { documentType, documentNumber } = id;
    this.router.navigateByUrl(
      `/users/form?type=${documentType}&number=${documentNumber}`
    );
  }

  public deleteUser(id: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      text: 'No puedes revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe((response) => {
          this.getAllUsers();
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El usuario ha sido eliminado',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
