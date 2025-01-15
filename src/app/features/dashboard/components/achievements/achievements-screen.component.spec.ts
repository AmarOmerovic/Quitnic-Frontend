import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsScreenComponent } from './achievements-screen.component';

describe('AchievementsScreenComponent', () => {
  let component: AchievementsScreenComponent;
  let fixture: ComponentFixture<AchievementsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementsScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
