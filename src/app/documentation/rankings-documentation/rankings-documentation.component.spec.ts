import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsDocumentationComponent } from './rankings-documentation.component';

describe('RankingsDocumentationComponent', () => {
  let component: RankingsDocumentationComponent;
  let fixture: ComponentFixture<RankingsDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingsDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingsDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
