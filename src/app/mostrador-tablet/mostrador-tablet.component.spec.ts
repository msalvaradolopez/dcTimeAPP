import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorTabletComponent } from './mostrador-tablet.component';

describe('MostradorTabletComponent', () => {
  let component: MostradorTabletComponent;
  let fixture: ComponentFixture<MostradorTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostradorTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostradorTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
