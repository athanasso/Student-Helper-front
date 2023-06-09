import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICE1Component } from './ICE1.component';

describe('ServicesComponent', () => {
  let component: ICE1Component;
  let fixture: ComponentFixture<ICE1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ICE1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ICE1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
