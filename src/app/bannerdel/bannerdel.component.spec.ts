import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerdelComponent } from './bannerdel.component';

describe('BannerdelComponent', () => {
  let component: BannerdelComponent;
  let fixture: ComponentFixture<BannerdelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerdelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerdelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
