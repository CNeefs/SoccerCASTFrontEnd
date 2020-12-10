import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsDocumentationComponent } from './tournaments-documentation.component';

describe('TournamentsDocumentationComponent', () => {
  let component: TournamentsDocumentationComponent;
  let fixture: ComponentFixture<TournamentsDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentsDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
