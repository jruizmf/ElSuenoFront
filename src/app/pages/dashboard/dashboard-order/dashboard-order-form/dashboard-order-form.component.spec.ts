import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrderFormComponent } from './dashboard-order-form.component';

describe('DashboardOrderFormComponent', () => {
  let component: DashboardOrderFormComponent;
  let fixture: ComponentFixture<DashboardOrderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOrderFormComponent]
    });
    fixture = TestBed.createComponent(DashboardOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
