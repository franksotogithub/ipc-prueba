import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDirectorioEditComponent } from './articulo-directorio-edit.component';

describe('ArticuloDirectorioEditComponent', () => {
  let component: ArticuloDirectorioEditComponent;
  let fixture: ComponentFixture<ArticuloDirectorioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloDirectorioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloDirectorioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
