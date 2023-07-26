import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComposeOptionsFormComponent } from './dashboard-compose-options-form.component';

describe('DashboardComposeOptionsFormComponent', () => {
  let component: DashboardComposeOptionsFormComponent;
  let fixture: ComponentFixture<DashboardComposeOptionsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComposeOptionsFormComponent]
    });
    fixture = TestBed.createComponent(DashboardComposeOptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
