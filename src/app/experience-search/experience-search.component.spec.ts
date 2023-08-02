import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSearchComponent } from './experience-search.component';

describe('ExperienceSearchComponent', () => {
  let component: ExperienceSearchComponent;
  let fixture: ComponentFixture<ExperienceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
