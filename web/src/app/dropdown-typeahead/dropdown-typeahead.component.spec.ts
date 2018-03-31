import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTypeaheadComponent } from './dropdown-typeahead.component';

describe('DropdownTypeaheadComponent', () => {
  let component: DropdownTypeaheadComponent;
  let fixture: ComponentFixture<DropdownTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
