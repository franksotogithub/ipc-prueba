import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioIpcEditComponent } from './directorio-ipc-edit.component';

describe('DirectorioIpcEditComponent', () => {
  let component: DirectorioIpcEditComponent;
  let fixture: ComponentFixture<DirectorioIpcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorioIpcEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorioIpcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
