import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRankingsComponent } from './view-rankings.component';

describe('ViewRankingsComponent', () => {
  let component: ViewRankingsComponent;
  let fixture: ComponentFixture<ViewRankingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRankingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
