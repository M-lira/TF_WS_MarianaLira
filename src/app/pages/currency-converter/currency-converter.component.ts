import { Component, inject } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { MatCardModule } from '@angular/material/card';
import { Converter } from '../../shared/interfaces/converter.model';
import { CurrencyConverterService } from '../../shared/services/currency-converter.service';
import { BackToHomeComponent } from '../../shared/components/back-to-home/back-to-home.component';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [FormComponent, MatCardModule, BackToHomeComponent],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent {
  result: string = 'Waiting for the results...';

  currencyConverterService = inject(CurrencyConverterService);

  onConvert(converter: Converter): void {
    this.currencyConverterService.getConversion(converter)
      .subscribe((answer) => {
        this.result = answer;
      })
  }
}
