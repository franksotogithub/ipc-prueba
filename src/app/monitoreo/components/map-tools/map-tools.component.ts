import { Component, OnInit } from '@angular/core';
import {ProgramacionRuta} from './../../../core/models/programacionRuta.model';
import {ProgramacionRutaService} from './../../../core/services/programacion-ruta.service';

@Component({
  selector: 'app-map-tools',
  templateUrl: './map-tools.component.html',
  styleUrls: ['./map-tools.component.scss']
})
export class MapToolsComponent implements OnInit {
  programacionRutas: Array<ProgramacionRuta>;

  
  constructor(private programacionRutaService : ProgramacionRutaService) { 
    this.programacionRutaService.getAllProgramacionRuta().subscribe((datos:any )=>{
      
      this.programacionRutas= datos.results;
    });

  }
  
  changeRuta(ob){
    console.log('Ruta changed...');
    /*let selectedBook = ob.value;
    console.log(selectedBook);
*/

    let id= ob.value;
    this.programacionRutaService.getProgramacionRuta(id).subscribe((ruta:ProgramacionRuta)=>{
      this.programacionRutaService.setRutaSubject(ruta);
    });
  }

  
  ngOnInit() {
    
  }

}
