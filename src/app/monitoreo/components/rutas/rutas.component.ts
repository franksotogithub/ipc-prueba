import { Component, OnInit } from '@angular/core';
import {latLng, MapOptions, tileLayer} from 'leaflet';
import {ProgramacionRutaService} from './../../../core/services/programacion-ruta.service';
import * as L from 'leaflet';
import { ProgramacionRuta } from 'src/app/core/models/programacionRuta.model';
import { Informante } from 'src/app/core/models/informante.model';
@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {
  map : any;
  layerGroup:any;
  ruta: ProgramacionRuta;
  constructor(private programacionRutaService: ProgramacionRutaService) {

    this.programacionRutaService.getRutaSubject().subscribe((ruta: ProgramacionRuta)=>{
      this.layerGroup.clearLayers();
      this.ruta=ruta;
      if(ruta){
        let i =0

        this.ruta.informantes.forEach((informante: Informante)=>{
          
          if(informante.latitud && informante.longitud){
              i = i+1;
              L.marker([ informante.latitud, informante.longitud]).addTo(this.layerGroup);

              (i==1)?this.map.setView([informante.latitud, informante.longitud], 15):false;
          }
        });
      }
      
    });

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
    this.layerGroup = L.layerGroup().addTo(this.map);

    

    /*L.marker([-9.194766851999916, -74.99025479649974]).addTo(this.map);*/
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
