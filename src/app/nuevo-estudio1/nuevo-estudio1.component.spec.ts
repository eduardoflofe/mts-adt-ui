import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEstudio1Component } from './nuevo-estudio1.component';

describe('NuevoEstudio1Component', () => {
  let component: NuevoEstudio1Component;
  let fixture: ComponentFixture<NuevoEstudio1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEstudio1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEstudio1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
