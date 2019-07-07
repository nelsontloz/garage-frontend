import { Component } from '@angular/core';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cct-garage-frontend';
  faWarehouse = faWarehouse ;
}
