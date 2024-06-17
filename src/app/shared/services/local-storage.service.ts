import { Injectable } from '@angular/core';
import { Converter } from '../interfaces/converter.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  private _listConverter: Converter[] = [] 

  constructor() { }

  addConverter(itemName: string, converter: Converter): void {

    const listConverterStorage = localStorage.getItem(itemName);

    if (!listConverterStorage){
      this._listConverter.push(converter);
      localStorage.setItem(itemName,JSON.stringify(this._listConverter));
      this._listConverter = [];
      return;
    }

    if(listConverterStorage !== null){
      this._listConverter = JSON.parse(listConverterStorage);
      this._listConverter.push(converter);
      localStorage.setItem(itemName,JSON.stringify(this._listConverter));
      this._listConverter = [];
    }
  }

  getAllConverter(): Converter[] {
    const listConverterStorage = localStorage.getItem('list-converter');
    if(listConverterStorage !== null){
      const listConverter: Converter[] = JSON.parse(listConverterStorage);
      return listConverter;
    }
    return [];
  }

  removeConverter(id: string): void {
    const listConverterStorage = localStorage.getItem('list-converter');
    let listConverter: Converter[] = []; 
    let indice = 0;

    if(listConverterStorage !== null){
      listConverter = JSON.parse(listConverterStorage);
      listConverter.forEach((c) => {
        if (c.id === id){
          listConverter.splice(indice, 1);
        }
        indice++;
      })
      localStorage.setItem('list-converter', JSON.stringify(listConverter));
    }
  }

}
