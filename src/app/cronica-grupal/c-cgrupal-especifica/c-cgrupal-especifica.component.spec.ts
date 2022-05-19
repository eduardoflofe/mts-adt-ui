import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCGrupalEspecificaComponent } from './c-cgrupal-especifica.component';

describe('CCGrupalEspecificaComponent', () => {
  let component: CCGrupalEspecificaComponent;
  let fixture: ComponentFixture<CCGrupalEspecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCGrupalEspecificaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CCGrupalEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
