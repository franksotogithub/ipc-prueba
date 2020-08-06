import { Component, OnInit } from '@angular/core';
import {latLng, MapOptions, tileLayer} from 'leaflet';
import * as L from 'leaflet';
@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {
  map : any;
  constructor() {
    
  }
  ngOnInit() {
    this.initializeMapOptions();
  }

  private initializeMapOptions() {
    /*this.mapOptions = {
      center: latLng( -9.305,-75),
      zoom: 5,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };*/

    this.map = L.map('map',).setView([-9.194766851999916, -74.99025479649974], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.marker([-9.194766851999916, -74.99025479649974]).addTo(this.map);
  }

  /*
  mapOptions: MapOptions;

  constructor() {
  }

  ngOnInit() {
    this.initializeMapOptions();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng( -9.305,-75),
      zoom: 5,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }*/
}
