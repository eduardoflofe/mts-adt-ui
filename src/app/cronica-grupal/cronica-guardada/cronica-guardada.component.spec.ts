import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronicaGuardadaComponent } from './cronica-guardada.component';

describe('CronicaGuardadaComponent', () => {
  let component: CronicaGuardadaComponent;
  let fixture: ComponentFixture<CronicaGuardadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronicaGuardadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CronicaGuardadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
