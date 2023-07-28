import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';


const routes: Routes = [{ path: '', component: HotelsComponent }];

@NgModule({
  declarations: [
    HotelsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
  exports: [],
})
export class HotelsModule { }
