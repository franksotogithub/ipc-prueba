import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadosListComponent } from './mercados-list.component';

describe('MercadosListComponent', () => {
  let component: MercadosListComponent;
  let fixture: ComponentFixture<MercadosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
