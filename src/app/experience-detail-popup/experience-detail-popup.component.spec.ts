import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceDetailPopupComponent } from './experience-detail-popup.component';

describe('ExperienceDetailPopupComponent', () => {
  let component: ExperienceDetailPopupComponent;
  let fixture: ComponentFixture<ExperienceDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceDetailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
