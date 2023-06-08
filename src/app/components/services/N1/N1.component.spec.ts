import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N1Component } from './N1.component';

describe('ServicesComponent', () => {
  let component: N1Component;
  let fixture: ComponentFixture<N1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ N1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(N1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
