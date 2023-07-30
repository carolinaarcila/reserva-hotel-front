import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormHotelComponent } from './form-hotel/form-hotel.component';


const routes: Routes = [{ path: '', component: HotelsComponent }, 
{ path: 'form', component: FormHotelComponent }];

@NgModule({
  declarations: [
    HotelsComponent,
    FormHotelComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
  exports: [],
})
export class HotelsModule { }
