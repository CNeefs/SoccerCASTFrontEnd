import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsDocumentationComponent } from './competitions-documentation.component';

describe('CompetitionsDocumentationComponent', () => {
  let component: CompetitionsDocumentationComponent;
  let fixture: ComponentFixture<CompetitionsDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionsDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
