import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEstudioSocialMedicoComponent } from './nuevo-estudio-social-medico.component';

describe('NuevoEstudioSocialMedicoComponent', () => {
  let component: NuevoEstudioSocialMedicoComponent;
  let fixture: ComponentFixture<NuevoEstudioSocialMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEstudioSocialMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEstudioSocialMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
