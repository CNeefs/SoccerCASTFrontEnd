import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDocumentationComponent } from './general-documentation.component';

describe('GeneralDocumentationComponent', () => {
  let component: GeneralDocumentationComponent;
  let fixture: ComponentFixture<GeneralDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
