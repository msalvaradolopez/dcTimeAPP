import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerabcComponent } from './bannerabc.component';

describe('BannerabcComponent', () => {
  let component: BannerabcComponent;
  let fixture: ComponentFixture<BannerabcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerabcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerabcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
