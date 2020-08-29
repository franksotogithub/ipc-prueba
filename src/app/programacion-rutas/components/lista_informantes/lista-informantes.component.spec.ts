import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInformantesComponent } from './lista-informantes.component';

describe('ListaInformantesComponent', () => {
  let component: ListaInformantesComponent;
  let fixture: ComponentFixture<ListaInformantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInformantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInformantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

