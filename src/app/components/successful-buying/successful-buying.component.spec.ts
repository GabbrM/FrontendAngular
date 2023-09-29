import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulBuyingComponent } from './successful-buying.component';

describe('SuccessfulBuyingComponent', () => {
  let component: SuccessfulBuyingComponent;
  let fixture: ComponentFixture<SuccessfulBuyingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessfulBuyingComponent]
    });
    fixture = TestBed.createComponent(SuccessfulBuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
