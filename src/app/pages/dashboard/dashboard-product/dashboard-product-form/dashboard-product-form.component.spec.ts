import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductFormComponent } from './dashboard-product-form.component';

describe('ProductFormComponent', () => {
  let component: DashboardProductFormComponent;
  let fixture: ComponentFixture<DashboardProductFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardProductFormComponent]
    });
    fixture = TestBed.createComponent(DashboardProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
