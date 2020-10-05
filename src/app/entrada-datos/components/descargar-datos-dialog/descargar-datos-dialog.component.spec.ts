import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarDatosDialogComponent } from './descargar-datos-dialog.component';

describe('DescargarDatosDialogComponent', () => {
  let component: DescargarDatosDialogComponent;
  let fixture: ComponentFixture<DescargarDatosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargarDatosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarDatosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
