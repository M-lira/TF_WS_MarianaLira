import { Component } from '@angular/core';
import { FormComponent } from '../../../pages/currency-converter/components/form/form.component';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
