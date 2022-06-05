import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNotaTSocialComponent } from './consulta-nota-tsocial.component';

describe('ConsultaNotaTSocialComponent', () => {
  let component: ConsultaNotaTSocialComponent;
  let fixture: ComponentFixture<ConsultaNotaTSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaNotaTSocialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNotaTSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
