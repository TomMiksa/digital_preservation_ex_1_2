import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadableDmpComponent } from './readable-dmp.component';

describe('ReadableDmpComponent', () => {
  let component: ReadableDmpComponent;
  let fixture: ComponentFixture<ReadableDmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadableDmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadableDmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
