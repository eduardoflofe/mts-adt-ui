import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEstudio2dFamiliarComponent } from './nuevo-estudio2d-familiar.component';

describe('NuevoEstudio2dFamiliarComponent', () => {
  let component: NuevoEstudio2dFamiliarComponent;
  let fixture: ComponentFixture<NuevoEstudio2dFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEstudio2dFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEstudio2dFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
