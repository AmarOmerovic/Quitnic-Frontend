import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizationScreenComponent } from '../../personalization/component/personalization-screen.component';

describe('PersonalizationScreenComponent', () => {
  let component: PersonalizationScreenComponent;
  let fixture: ComponentFixture<PersonalizationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizationScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalizationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
