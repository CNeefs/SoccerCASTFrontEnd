import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTournamentsComponent } from './view-tournaments.component';

describe('ViewTournamentsComponent', () => {
  let component: ViewTournamentsComponent;
  let fixture: ComponentFixture<ViewTournamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTournamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
