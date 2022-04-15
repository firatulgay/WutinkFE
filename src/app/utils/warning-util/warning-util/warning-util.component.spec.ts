import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningUtilComponent } from './warning-util.component';

describe('WarningUtilComponent', () => {
  let component: WarningUtilComponent;
  let fixture: ComponentFixture<WarningUtilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningUtilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
