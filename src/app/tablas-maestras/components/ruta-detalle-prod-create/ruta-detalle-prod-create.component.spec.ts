import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDetalleProdCreateComponent } from './ruta-detalle-prod-create.component';

describe('RutaDetalleProdCreateComponent', () => {
  let component: RutaDetalleProdCreateComponent;
  let fixture: ComponentFixture<RutaDetalleProdCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaDetalleProdCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaDetalleProdCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
