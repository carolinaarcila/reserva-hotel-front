import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormRoomComponent } from './form-room/form-room.component';


const routes: Routes = [{ path: '', component: RoomsComponent },
 { path: 'form', component: FormRoomComponent }];

@NgModule({
  declarations: [
    RoomsComponent,
    FormRoomComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), MaterialModule,
  ],
})
export class RoomsModule { }
