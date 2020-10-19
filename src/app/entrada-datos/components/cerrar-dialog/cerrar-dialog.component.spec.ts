import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarDialogComponent } from './cerrar-dialog.component';

describe('CerrarDialogComponent', () => {
  let component: CerrarDialogComponent;
  let fixture: ComponentFixture<CerrarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerrarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
