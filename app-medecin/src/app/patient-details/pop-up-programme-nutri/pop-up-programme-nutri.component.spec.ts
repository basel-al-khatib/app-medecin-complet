import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProgrammeNutriComponent } from './pop-up-programme-nutri.component';

describe('PopUpFormulaireComponent', () => {
  let component: PopUpProgrammeNutriComponent;
  let fixture: ComponentFixture<PopUpProgrammeNutriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpProgrammeNutriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpProgrammeNutriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
