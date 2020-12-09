import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamsComponent } from './view-teams.component';

describe('ViewTeamsComponent', () => {
  let component: ViewTeamsComponent;
  let fixture: ComponentFixture<ViewTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
