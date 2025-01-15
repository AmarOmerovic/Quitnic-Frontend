import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsScreenComponent } from './terms-and-conditions-screen.component';

describe('TermsAndConditionsScreenComponent', () => {
  let component: TermsAndConditionsScreenComponent;
  let fixture: ComponentFixture<TermsAndConditionsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndConditionsScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
