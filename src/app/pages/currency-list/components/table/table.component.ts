import { AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Currency } from '../../../../shared/interfaces/currency.model';
import { CurrencyConverterService } from '../../../../shared/services/currency-converter.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {

  currencyConverterSerice = inject(CurrencyConverterService);
  displayedColumns: string[] = ['code', 'description'];
  dataSource!: MatTableDataSource<Currency>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.getCurrencies();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCurrencies(): void {
    this.currencyConverterSerice.getSupportedCodes().subscribe((currencies) => {
      this.dataSource = new MatTableDataSource(currencies);
      this.ngAfterViewInit();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
