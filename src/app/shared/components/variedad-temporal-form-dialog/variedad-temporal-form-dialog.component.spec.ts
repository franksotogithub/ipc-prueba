import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariedadTemporalFormDialogComponent } from './variedad-temporal-form-dialog.component';

describe('VariedadTemporalFormDialogComponent', () => {
  let component: VariedadTemporalFormDialogComponent;
  let fixture: ComponentFixture<VariedadTemporalFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariedadTemporalFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariedadTemporalFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
