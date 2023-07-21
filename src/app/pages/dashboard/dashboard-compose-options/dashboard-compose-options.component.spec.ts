import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComposeOptionsComponent } from './dashboard-compose-options.component';

describe('DashboardComposeOptionsComponent', () => {
  let component: DashboardComposeOptionsComponent;
  let fixture: ComponentFixture<DashboardComposeOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComposeOptionsComponent]
    });
    fixture = TestBed.createComponent(DashboardComposeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
