import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionableDmpComponent } from './actionable-dmp.component';

describe('ActionableDmpComponent', () => {
  let component: ActionableDmpComponent;
  let fixture: ComponentFixture<ActionableDmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionableDmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionableDmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
