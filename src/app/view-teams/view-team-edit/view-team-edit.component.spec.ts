import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamEditComponent } from './view-team-edit.component';

describe('ViewTeamEditComponent', () => {
  let component: ViewTeamEditComponent;
  let fixture: ComponentFixture<ViewTeamEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTeamEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
