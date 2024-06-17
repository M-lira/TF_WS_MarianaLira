import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyConversionRate } from '../interfaces/currency-conversion-rate.model';
import { Converter } from '../interfaces/converter.model';
import { environment } from '../environments/environment';
import { SupportedCurrencies } from '../interfaces/ supported-currencies.model';
import { Currency } from '../interfaces/currency.model';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  private httpClient = inject(HttpClient);
  private baseApiUrl = environment.baseApiUrl;
  private apiKey =  '61188ed62b5ae4d294498cc6';
  private apiUrl = `${this.baseApiUrl}${this.apiKey}`;

  private currencies: Currency[] = [];
  private currenciesSubject = new BehaviorSubject<Currency[]>([]);
  private currencies$: Observable<Currency[]> = this.currenciesSubject.asObservable();

  private resultSubject = new BehaviorSubject<string>('');
  private result$: Observable<string> = this.resultSubject.asObservable();

  private localStorageService = inject(LocalStorageService);

  getSupportedCodes(): Observable<Currency[]> {
    if(this.currencies.length === 0){
      this.httpClient.get<SupportedCurrencies>(`${this.apiUrl}/codes`)
      .subscribe((supportedCurrencies) => {
        this.convertToCurrency(supportedCurrencies);
      })
    }

    return this.currencies$;
  }

  getConversion(converter: Converter): Observable<string> {
    this.httpClient.get<CurrencyConversionRate>(`${this.apiUrl}/latest/${converter.fromCurrency}`)
      .subscribe((currencyConversionRate) => {
        this.convert(currencyConversionRate, converter);
      })
    return this.result$;
  }

  getAllConverter(): Converter[] {
    return this.localStorageService.getAllConverter();
  }

  private convert(currencyConversionRate: CurrencyConversionRate, converter: Converter): void {
    const exchangeRate = currencyConversionRate.conversion_rates[converter.toCurrency];
    const totalExchangeRate = (converter.value * Number(exchangeRate));
    const result = `${converter.value} em ${converter.fromCurrency} equivale a ${totalExchangeRate.toFixed(4)} em ${converter.toCurrency}`

    this.resultSubject.next(result);

    this.addConverter(Number(exchangeRate),Number(totalExchangeRate.toFixed(4)), converter);
  }

  private convertToCurrency(supportedCurrencies: SupportedCurrencies): void {
    this.currencies = [];
    supportedCurrencies.supported_codes.forEach((code) => {
      this.currencies.push({
        'code': code[0],
        'description': code[1],
      })
    })

    this.currenciesSubject.next(this.currencies);
  }

  private addConverter(exchangeRate: number, totalExchangeRate: number, converter: Converter): void {
    const c: Converter = {
        id: this.generateId(),
        dateConverter: new Date().toLocaleDateString("pt-BR"),
        timeConverter: new Date().toLocaleTimeString("pt-BR"),
        value: converter.value,
        fromCurrency: converter.fromCurrency,
        toCurrency: converter.toCurrency,
        amount: totalExchangeRate,
        rate: exchangeRate
    }

    this.localStorageService.addConverter('list-converter', c);
  }

  private generateId(): string {
    return Math.random().toString().substring(2,7);
  }
}
