import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPComponent } from './admin-add-p.component';

describe('AdminAddProductComponent', () => {
  let component: AdminAddPComponent;
  let fixture: ComponentFixture<AdminAddPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddPComponent]
    });
    fixture = TestBed.createComponent(AdminAddPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
