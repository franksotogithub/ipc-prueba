import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramacionRutasComponent } from './programacion-rutas.component';

describe('ProgramacionRutasComponent', () => {
  let component: ProgramacionRutasComponent;
  let fixture: ComponentFixture<ProgramacionRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
