import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerupdComponent } from './bannerupd.component';

describe('BannerupdComponent', () => {
  let component: BannerupdComponent;
  let fixture: ComponentFixture<BannerupdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerupdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
