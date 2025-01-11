import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CravingHelpScreenComponent } from './craving-help-screen.component';

describe('CravingHelpScreenComponent', () => {
  let component: CravingHelpScreenComponent;
  let fixture: ComponentFixture<CravingHelpScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CravingHelpScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CravingHelpScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
