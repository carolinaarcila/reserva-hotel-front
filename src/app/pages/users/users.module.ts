import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormUserComponent } from './form-user/form-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },

  {
    path: 'form',
    component: FormUserComponent,
  },
];

@NgModule({
  declarations: [UsersComponent, FormUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class UsersModule {}
