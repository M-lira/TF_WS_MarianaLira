import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { BackToHomeComponent } from '../../shared/components/back-to-home/back-to-home.component';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [TableComponent, BackToHomeComponent],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.scss'
})
export class CurrencyListComponent {

}
