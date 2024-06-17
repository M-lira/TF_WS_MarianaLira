import { Component, inject } from '@angular/core';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { Converter } from '../../shared/interfaces/converter.model';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { filter } from 'rxjs';
import { BackToHomeComponent } from '../../shared/components/back-to-home/back-to-home.component';

@Component({
  selector: 'app-converter-history',
  standalone: true,
  imports: [HistoryTableComponent, BackToHomeComponent],
  templateUrl: './converter-history.component.html',
  styleUrl: './converter-history.component.scss'
})
export class ConverterHistoryComponent {

}
