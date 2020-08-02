import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaDetalleProdEditComponent } from './ruta-detalle-prod-edit.component';

describe('RutaDetalleProdEditComponent', () => {
  let component: RutaDetalleProdEditComponent;
  let fixture: ComponentFixture<RutaDetalleProdEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaDetalleProdEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaDetalleProdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
