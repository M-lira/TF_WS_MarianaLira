import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Converter } from '../../../../shared/interfaces/converter.model';
import { CurrencyConverterService } from '../../../../shared/services/currency-converter.service';
import { Currency } from '../../../../shared/interfaces/currency.model';
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MdbRippleModule,
    RouterLink,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  currencyConverterSerice = inject(CurrencyConverterService);
  currencies!: Currency[];
  form!: FormGroup;
  private snackBar = inject(MatSnackBar);
  convert = output<Converter>();

  ngOnInit(): void {
    this.form = new FormGroup({
      from: new FormControl<string>('', {validators: Validators.required}),
      to: new FormControl<string>('', {validators: Validators.required}),
      amount: new FormControl<number>(1, {validators: Validators.required}),
    });

    this.getCurrencies();
  }

  getCurrencies(): void {
    this.currencyConverterSerice.getSupportedCodes().subscribe((currencies) => {
      this.currencies = currencies;
    })
  }

  onSubmit() {
    const {status, value} = this.form;

    if(status === 'VALID'){
      const convert: Converter = {
        fromCurrency: value.from,
        toCurrency: value.to,
        value: value.amount,
      } as Converter;

      this.convert.emit(convert);

    }else {
      this.showErrorMsg();
    }
  }

  onChangeOrder() {
    const fromTemp = this.form.value.from;
    const toTemp = this.form.value.to;
    const amountTemp = this.form.value.amount;
    this.form.setValue({to: fromTemp, from: toTemp, amount: amountTemp});
  }

  private showErrorMsg(): void {
    this.snackBar.open('Verifique os erros encontrados.', 'Ok',{
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
