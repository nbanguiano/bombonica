import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementDetailsComponent } from './complement-details.component';

describe('ComplementDetailsComponent', () => {
  let component: ComplementDetailsComponent;
  let fixture: ComponentFixture<ComplementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
