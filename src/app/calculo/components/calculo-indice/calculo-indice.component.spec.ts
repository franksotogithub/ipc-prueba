import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoIndiceComponent } from './calculo-indice.component';

describe('CalculoIndiceComponent', () => {
  let component: CalculoIndiceComponent;
  let fixture: ComponentFixture<CalculoIndiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoIndiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoIndiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
