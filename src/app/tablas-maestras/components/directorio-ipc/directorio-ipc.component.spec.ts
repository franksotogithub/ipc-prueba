import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioIpcComponent } from './directorio-ipc.component';

describe('DirectorioIpcComponent', () => {
  let component: DirectorioIpcComponent;
  let fixture: ComponentFixture<DirectorioIpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorioIpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorioIpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
