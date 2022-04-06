import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorUtilComponent } from './error-util.component';

describe('ErrorUtilComponent', () => {
  let component: ErrorUtilComponent;
  let fixture: ComponentFixture<ErrorUtilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorUtilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
