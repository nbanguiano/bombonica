import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListContactComponent } from './order-list-contact.component';

describe('OrderListContactComponent', () => {
  let component: OrderListContactComponent;
  let fixture: ComponentFixture<OrderListContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
