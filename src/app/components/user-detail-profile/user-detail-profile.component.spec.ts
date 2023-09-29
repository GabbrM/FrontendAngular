import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailProfileComponent } from './user-detail-profile.component';

describe('UserDetailProfileComponent', () => {
  let component: UserDetailProfileComponent;
  let fixture: ComponentFixture<UserDetailProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailProfileComponent]
    });
    fixture = TestBed.createComponent(UserDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
