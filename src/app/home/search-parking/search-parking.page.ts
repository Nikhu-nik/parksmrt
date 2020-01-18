import { Component, OnInit } from '@angular/core';
import { MuseumDataService } from 'src/app/service/museum-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.page.html',
  styleUrls: ['./search-parking.page.scss'],
})
export class SearchParkingPage implements OnInit {

  museumData = [];
  filteredMuseum = [];
  isfiltered: boolean;


  constructor(private router: Router,
    private museumSerivice: MuseumDataService, ) {

    fetch('./assets/museum.json').then(res => res.json())
      .then(data => {
        this.museumData = data.museums;
        this.museumSerivice.setMuseums(this.museumData);
      });
  }

  ngOnInit() {
  }

  searchMaps(event) {
    if (event.target.value.length > 2) {
      const filteredJson = this.museumData.filter((row) => {
        if (row.state.indexOf(event.target.value) !== -1) {
          return true;
        } else {
          return false;
        }
      });
      this.isfiltered = true;
      this.filteredMuseum = filteredJson;
    }
  }

  getMuseumDetails(museum) {
    this.museumSerivice.setMuseum(museum);
    this.router.navigate(['/main/home']);
  }

  allMuseumMap() {
    this.router.navigate(['/all-museum']);
  }

}
