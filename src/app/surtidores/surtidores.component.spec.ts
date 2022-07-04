import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurtidoresComponent } from './surtidores.component';

describe('SurtidoresComponent', () => {
  let component: SurtidoresComponent;
  let fixture: ComponentFixture<SurtidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurtidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurtidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
