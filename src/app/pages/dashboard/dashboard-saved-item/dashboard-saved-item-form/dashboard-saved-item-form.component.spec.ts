import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSavedItemFormComponent } from './dashboard-saved-item-form.component';

describe('DashboardSavedItemFormComponent', () => {
  let component: DashboardSavedItemFormComponent;
  let fixture: ComponentFixture<DashboardSavedItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSavedItemFormComponent]
    });
    fixture = TestBed.createComponent(DashboardSavedItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
