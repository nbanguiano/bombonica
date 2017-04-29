import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementListComponent } from './complement-list.component';

describe('ComplementListComponent', () => {
  let component: ComplementListComponent;
  let fixture: ComponentFixture<ComplementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
