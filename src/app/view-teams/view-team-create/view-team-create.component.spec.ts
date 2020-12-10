import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamCreateComponent } from './view-team-create.component';

describe('ViewTeamCreateComponent', () => {
  let component: ViewTeamCreateComponent;
  let fixture: ComponentFixture<ViewTeamCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTeamCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
