import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems: any[] = [
    {
      name: 'Hoteles',
      path: '/hotels'
    },

    {
      name: 'Habitaciones',
      path: '/rooms'
    }

  ];

}
