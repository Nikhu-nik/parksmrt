import { Injectable } from '@angular/core';
import { Museum } from '../models/museum';


@Injectable({
  providedIn: 'root'
})
export class MuseumDataService {

  museums: [];
  museum: Museum;

  constructor() { }

  setMuseums(data) {
    this.museums = data;
  }

  getMuseums() {
    return this.museums;
  }

  
  setMuseum(data) {
    this.museum = data;
  }

  getMuseum() {
    return this.museum;
  }

}
