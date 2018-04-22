import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedDmpComponent } from './generated-dmp.component';

describe('GeneratedDmpComponent', () => {
  let component: GeneratedDmpComponent;
  let fixture: ComponentFixture<GeneratedDmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedDmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedDmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
