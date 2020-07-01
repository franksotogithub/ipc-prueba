import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { MovMercadoCab } from './../../../core/models/movMercadoCab.model';
import { Producto } from './../../../core/models/producto.model';
import { MovMercadoCabService } from './../../../core/services/mov-mercado-cab.service';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from './../../../../environments/environment';
import { IdbService } from 'src/app/core/services/idb.service';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-mercados',
  templateUrl: './mercados.component.html',
  styleUrls: ['./mercados.component.scss']
})
export class MercadosComponent implements OnInit {
  form: FormGroup;
  id: string;
  movMercadoCab:Array<any> ;
  
  
  productos : Array<any> ;
  name_table:string ='mov_mercados_cab';

  mercados:Array<any> ;
  filteredMercados: Array<any>;
  mercadoSelect: string="";
  
  investigadores: Array<any> ;
  filteredInvestigador: Array<any>;
  investigadorSelect:string="";
  
  displayedColumns = ['codigo','nombre','valor','peso','cc','ce'];

  dataSource : Array<any> = [];

  constructor(private formBuilder: FormBuilder,
    private movMercadoService: MovMercadoCabService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private idbService:IdbService
    
    ) { 

    this.buildForm();
    
    this.idbService.movMercadoCab$.subscribe((datos)=>{
      this.movMercadoCab = datos;
    });

    this.idbService.mercados$.subscribe((datos)=>{
      this.mercados = datos;
    });
    this.idbService.investigadores$.subscribe((datos)=>{
      this.investigadores = datos;
    });

    this.idbService.productos$.subscribe((datos)=>{
      this.productos = datos;
      console.log('this.productos>>',this.productos);
      this.dataSource=this.productos.map(v => ({...v, valor:0,peso:0,ce:0,cc:0 }));
      /*this.productos.map((product)=>{return})*/
    });
    
    /*this.dataSource=[{'codigo':1,'nombre':'holass'}];*/
  }

  ngOnInit() {
    
  }
  
 

  private buildForm() {
    this.form = this.formBuilder.group({
      mercado: ['', [Validators.required]],
      hora_ini: ['', [Validators.required]],
      hora_fin: ['',[Validators.required]],
      n_dia: ['1', [Validators.required]],
      n_semana : [1,[Validators.required]],
      inv: ['', [Validators.required]],
    });
  }

  saveMovMercadoCab(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      let movMercadoCab = this.form.value;
      movMercadoCab['detalles'] = [];
      this.idbService.addItems(this.name_table,movMercadoCab);
      this.router.navigate(['./entrada-datos/mercados']);
      /*this.getAllMercadosCab();*/
    }
  }

  async getAllMercadosCab(){
    this.movMercadoCab = await this.idbService.getAllData(this.name_table);
  }

 

  mercadoSearch(event:any){
    let value =event.target.value;
    const filterValue = value.toLowerCase();
    this.filteredMercados=this.mercados.filter(option => option.razon_social.toLowerCase().includes(filterValue));
   
  }

  mercadoSelected(event$){
    this.form.get('mercado').setValue(event$.option.value.id);
    this.mercadoSelect = event$.option.value.nombre;
  }

  displayFnMercado(mercado: any): string {
    
    return mercado ? mercado.razon_social : mercado;
 
  }

  
  invSearch(event:any){
    let value =event.target.value;
    const filterValue = value.toLowerCase();
    this.filteredInvestigador=this.investigadores.filter(option => option.nombre.toLowerCase().includes(filterValue));
   
  }

  invSelected(event$){
    this.form.get('inv').setValue(event$.option.value.id);
    this.investigadorSelect = event$.option.value.nombre;
  }

  displayFnInv(inv: any): string {
    console.log(inv);
    return inv ? inv.nombre : inv;
 
  }

  
}



      /*console.log('movMercadoCab>>',movMercadoCab);*/
      /*this.movMercadoService.createMovMercadoCab(movMercadoCab).subscribe((newMovMercadoCab)=>{
        console.log('movMercadoCab>>',newMovMercadoCab);
      });*/
      /*this.idbService.addItems('mercados',movMercadoCab);
      this.getAllMercadosCab();*/




/**
 * 
 * 
   form: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }





 * 
 */