import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDocumentationComponent } from './team-documentation.component';

describe('TeamDocumentationComponent', () => {
  let component: TeamDocumentationComponent;
  let fixture: ComponentFixture<TeamDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
