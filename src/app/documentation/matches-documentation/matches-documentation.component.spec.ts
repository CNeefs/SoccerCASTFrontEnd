import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesDocumentationComponent } from './matches-documentation.component';

describe('MatchesDocumentationComponent', () => {
  let component: MatchesDocumentationComponent;
  let fixture: ComponentFixture<MatchesDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
