import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenTimeComponent } from './almacen-time.component';

describe('AlmacenTimeComponent', () => {
  let component: AlmacenTimeComponent;
  let fixture: ComponentFixture<AlmacenTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
