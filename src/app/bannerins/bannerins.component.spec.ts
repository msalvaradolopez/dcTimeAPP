import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerinsComponent } from './bannerins.component';

describe('BannerinsComponent', () => {
  let component: BannerinsComponent;
  let fixture: ComponentFixture<BannerinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
