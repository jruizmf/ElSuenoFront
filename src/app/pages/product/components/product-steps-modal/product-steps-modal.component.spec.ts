import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStepsModalComponent } from './product-steps-modal.component';

describe('ProductStepsModalComponent', () => {
  let component: ProductStepsModalComponent;
  let fixture: ComponentFixture<ProductStepsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductStepsModalComponent]
    });
    fixture = TestBed.createComponent(ProductStepsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
