import { Routes } from '@angular/router';
import { CurrencyConverterComponent } from './pages/currency-converter/currency-converter.component';
import { CurrencyListComponent } from './pages/currency-list/currency-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'currency-converter', component: CurrencyConverterComponent
    },
    {
        path: 'currencies', component: CurrencyListComponent
    }
];
