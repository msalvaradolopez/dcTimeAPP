import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorTimeComponent } from './mostrador-time.component';

describe('MostradorTimeComponent', () => {
  let component: MostradorTimeComponent;
  let fixture: ComponentFixture<MostradorTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostradorTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostradorTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
