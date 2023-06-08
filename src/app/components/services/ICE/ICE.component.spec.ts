import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ICEComponent } from './ICE.component';

describe('ServicesComponent', () => {
  let component: ICEComponent;
  let fixture: ComponentFixture<ICEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ICEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ICEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
