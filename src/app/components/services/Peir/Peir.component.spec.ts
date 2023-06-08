import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeirComponent } from './Peir.component';

describe('PeirComponent', () => {
  let component: PeirComponent;
  let fixture: ComponentFixture<PeirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
