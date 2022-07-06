import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurtidoresupdComponent } from './surtidoresupd.component';

describe('SurtidoresupdComponent', () => {
  let component: SurtidoresupdComponent;
  let fixture: ComponentFixture<SurtidoresupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurtidoresupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurtidoresupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
