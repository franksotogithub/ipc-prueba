import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDirectorioCreateComponent } from './articulo-directorio-create.component';

describe('ArticuloDirectorioCreateComponent', () => {
  let component: ArticuloDirectorioCreateComponent;
  let fixture: ComponentFixture<ArticuloDirectorioCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloDirectorioCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloDirectorioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
