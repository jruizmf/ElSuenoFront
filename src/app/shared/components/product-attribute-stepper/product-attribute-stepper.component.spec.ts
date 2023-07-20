import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeStepperComponent } from './product-attribute-stepper.component';

describe('ProductAttributeStepperComponent', () => {
  let component: ProductAttributeStepperComponent;
  let fixture: ComponentFixture<ProductAttributeStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAttributeStepperComponent]
    });
    fixture = TestBed.createComponent(ProductAttributeStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
