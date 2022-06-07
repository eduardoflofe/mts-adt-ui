import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEstudio3dExploracionComponent } from './nuevo-estudio3d-exploracion.component';

describe('NuevoEstudio3dExploracionComponent', () => {
  let component: NuevoEstudio3dExploracionComponent;
  let fixture: ComponentFixture<NuevoEstudio3dExploracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEstudio3dExploracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEstudio3dExploracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
