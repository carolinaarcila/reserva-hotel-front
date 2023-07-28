import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'hotels',
    loadChildren: () =>
    import('./pages/hotels/hotels.module').then((m) => m.HotelsModule),
  },
  {
    path: 'rooms',
    loadChildren: () =>
    import('./pages/rooms/rooms.module').then((m) => m.RoomsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
