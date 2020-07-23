import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialesListComponent } from './comerciales-list.component';

describe('ComercialesListComponent', () => {
  let component: ComercialesListComponent;
  let fixture: ComponentFixture<ComercialesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComercialesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComercialesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
