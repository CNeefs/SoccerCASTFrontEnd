import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationhomeComponent } from './documentationhome.component';

describe('DocumentationhomeComponent', () => {
  let component: DocumentationhomeComponent;
  let fixture: ComponentFixture<DocumentationhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
