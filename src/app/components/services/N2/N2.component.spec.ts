import { ComponentFixture, TestBed } from '@angular/core/testing';

import { N2Component } from './N2.component';

describe('ServicesComponent', () => {
  let component: N2Component;
  let fixture: ComponentFixture<N2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ N2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(N2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
