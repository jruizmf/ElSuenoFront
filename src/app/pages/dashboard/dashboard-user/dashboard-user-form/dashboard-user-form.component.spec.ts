import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserFormComponent } from './dashboard-user-form.component';

describe('DashboardUserFormComponent', () => {
  let component: DashboardUserFormComponent;
  let fixture: ComponentFixture<DashboardUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUserFormComponent]
    });
    fixture = TestBed.createComponent(DashboardUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
