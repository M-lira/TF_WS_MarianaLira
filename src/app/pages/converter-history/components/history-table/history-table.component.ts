import { AfterViewInit, Component, ViewChild, inject, output} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Converter } from '../../../../shared/interfaces/converter.model';
import { CurrencyConverterService } from '../../../../shared/services/currency-converter.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss'
})
export class HistoryTableComponent implements AfterViewInit {

  localStorageService = inject(LocalStorageService);
  currencyConverterService = inject(CurrencyConverterService);
  confirmationDialogService = inject(ConfirmationDialogService);

  listConverter: Converter[] = []

  displayedColumns: string[] = [
    'id',
    'dateConverter', 
    'timeConverter', 
    'value', 
    'fromCurrency', 
    'toCurrency', 
    'amount', 
    'rate', 
    'actions'
  ];
  dataSource: MatTableDataSource<Converter>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.listConverter = this.currencyConverterService.getAllConverter();
    this.dataSource = new MatTableDataSource(this.listConverter);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(converter: Converter){
    this.confirmationDialogService
    .openDialog()
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
      this.localStorageService.removeConverter(converter.id);
      this.listConverter = this.currencyConverterService.getAllConverter();
      this.dataSource = new MatTableDataSource(this.listConverter);
      this.ngAfterViewInit();
    })  
  }

}
